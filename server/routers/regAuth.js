import express from "express";
import bcrypt from "bcryptjs"
import { check, validationResult } from "express-validator";
import jwt from 'jsonwebtoken'

import {User} from '../models/User.js'
import {Role} from '../models/Role.js'
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, 'Secret Key', {expiresIn: '12h'})
}

const router = express.Router()

// Регистрация пользователя===============================
router.post('/reg',
// Валидация (middlewair)
[
    check('email', 'Поле email не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и короче 10 символов').isLength({min: 4, max: 15})
] ,
    async (req, res) => {
    try {
        const errors = validationResult(req)//валидация
        if(!errors.isEmpty()) {
            return res.json({message: 'Ошибка при регистрации', errors})
        }

        const {email, password} = req.body
        // Проверяю, есть ли уже такой email в бд
        const candidate = await User.findOne({email})
        if(candidate) {
           return res.json({message: 'Такой email уже есть'})
        }

        const hashPassword = bcrypt.hashSync(password, 7);

        // Достаю роль
        const userRole = await Role.findOne({value: "USER"})

        const user = new User({email, password: hashPassword, roles: [userRole.value]})
        await user.save()
        return res.json({message: 'Регистрация прошла успешно!'})

    } catch (err) {
        console.log('Ошибка:' + err)
    }
})

//Авторизация пользователя===========================
router.post('/auth', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})


        if(!user) {
            res.json({message: `Email ${email} не найден`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.json({message: 'Неверный пароль'})
        }
        const userRole = user.roles[0]
        const token = generateAccessToken(user._id, user.roles)
        return res.json({token, message: 'Вы успешно авторизовались', code: true, userRole})

    } catch (err) {
        console.log(err);
    }

})




// Получение админа========================
export const apiAdminGetadmin = () => {
    router.get('/getadmin', roleMiddleware(['ADMIN']), async (req, res) => {
        try {
           return res.json({code: 'ok', message: 'Вы успешшно вошли как admin'})
        } catch (err) {
            console.log('Ошибка:' + err)
        }
    })
}


// Определение на то, авторизован или нет
router.get('/auth', authMiddleware, async (req, res) => {
    try {
        return res.json({code: 'auth', message: 'Есть авторизация'})
    } catch (err) {
        console.log('Ошибка:' + err)
    }
} )

export default router
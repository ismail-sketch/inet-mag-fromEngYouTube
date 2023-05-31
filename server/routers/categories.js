import express from "express";
const router = express.Router()
import { Category } from "../models/Category.js";
import mongoose from "mongoose";
import multer from "multer";
const upload = multer({dest: 'images/'})
import {unlink} from 'node:fs'

// Функция удаления файла из папки
const deleteImgSlide = (name) => {
  unlink(`images/${name}`, (err) => {
    if (err) throw err;
    console.log('path/file.txt was deleted');
  });
}

// Получение всех категорий
  router.get('/', async (req, res) => {
      const categorytList =  await Category.find()

      if(!categorytList) {
          res.status(500).json({message: 'Что-то пошло не так...'})
      }
      res.status(200).json(categorytList)
  })

  // Получение одной категории
  router.get('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Неверный ID')
    }
    try {
      const category = await Category.findById(req.params.id)
      if(!category) {
        return res.status(500).json({message: "Категория с заданным id не найдена..."})
      }
      return res.status(200).send(category)
    } catch (err) {
      console.log(err);
    }

  })

// Создание категории
  router.post('/',  upload.single('slide'), async (req, res) => {
    try {
      const category = new Category({
      name: req.body.name,
      color: req.body.color,
      icon: req.file
    });

    if (!category) {
        return res.status(404).send('Не удалось создать категорию...')
    }
    await category.save();
    res.json(category);
    } catch (err) {
      console.log('Ошибка' + err);
    }

  });

  // Обновление категории==========================
  router.put('/:id', upload.single('slide'), async (req, res) => {
    try{
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          icon: req.file,
          color: req.body.color,
          index: req.body.index
        },
        {new: true}
      )
       if(!category) {
        return res.status(400).json({message: "Не удалось обновить категорию..."})
      }
      return res.status(200).send(category)

    }catch (err) {
      console.log(`Ошибка: ${err}`)
    }
  })

  // Удаление категории
  router.delete('/:id/:name', async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id)
        deleteImgSlide(req.params.name)
        if(category) {
            return res.status(200).json({success: true, message: 'Категория удалена', id: req.params.id})
        } else {
            return res.status(404).json({success: false, message: 'Категория не найдена...'})
        }
    } catch (e) {
        return res.status(400).json({success: false, error: e})
    }

  })


export default router

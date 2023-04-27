import express from "express";
const router = express.Router()
import { Category } from "../models/Category.js";

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
  router.post('/', async (req, res) => {
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    if (!category) {
        return res.status(404).send('Не удалось создать категорию...')
    }

    await category.save();
    res.json(category);
  });

  // Обновление категории==========================
  router.put('/:id', async (req, res) => {
    try{
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color
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
  router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id)
        if(category) {
            return res.status(200).json({success: true, message: 'Категория удалена'})
        } else {
            return res.status(404).json({success: false, message: 'Категория не найдена...'})
        }
    } catch (e) {
        return res.status(400).json({success: false, error: e})
    }

  })


export default router

import express from "express";
const router = express.Router()
import { Category } from "../models/Category.js";


  router.get('/', async (req, res) => {
      const categorytList =  await Category.find()

      if(!categorytList) {
          res.status(500).json({message: 'Что-то пошло не так...'})
      }
      res.json(categorytList)
  })

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

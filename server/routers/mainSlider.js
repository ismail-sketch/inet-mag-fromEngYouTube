import express from "express";
const router = express.Router()
import { MainSlider } from "../models/MainSlider.js";
import multer from "multer";
import { unlink } from 'node:fs';

import fs from 'fs'
// import { storageConfig } from "../middleware/file.js";
const upload = multer({dest: 'images/'})


// Функция удаления файла из папки
const deleteImgSlide = (name) => {
  unlink(`images/${name}`, (err) => {
    if (err) throw err;
    console.log('path/file.txt was deleted');
  });
}


// Добавление слайда

router.post('/', upload.single('slide'), async (req, res, next) => {
  try {
    let mainSlider = new MainSlider({
      title: req.body.title,
      images: req.file,
      desc: req.body.desc,
      radio: req.body.radio
    });
    if(!mainSlider) {
      return res.status(500).send('Не удается создать слайд')
    }

    mainSlider = await mainSlider.save()
    res.send(mainSlider)

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }

  });

// Получение всех слайдов
router.get('/', async (req, res) => {
  try {
    // const productList =  await Product.find().select('name image -_id')
    const mainSlider =  await MainSlider.find()

    if(!mainSlider) {
        return res.status(500).json({message: 'Что-то пошло не так...'})
    }
    return res.json(mainSlider)
  } catch (err) {
    console.log(err);
  }

})
// Обновление слайда==========================
router.put('/:id', async (req, res) => {
  try{
    const category = await MainSlider.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        images: req.file,
        desc: req.body.desc,
        index: req.body.index,
        radio: req.body.radio
      },
      {new: true}
    )
     if(!category) {
      return res.status(400).json({message: "Не удалось обновить слайд..."})
    }
    return res.status(200).send(category)

  }catch (err) {
    console.log(`Ошибка: ${err}`)
  }
})

 // Удаление слайда
 router.delete('/:id/:name', async (req, res) => {
  try {
      const slide = await MainSlider.findByIdAndRemove(req.params.id)
      deleteImgSlide(req.params.name)
      if(slide) {
          return res.status(200).json({success: true, message: 'Категория удалена', id: req.params.id})
      } else {
          return res.status(404).json({success: false, message: 'Категория не найдена...'})
      }
  } catch (e) {
      return res.status(400).json({success: false, error: e})
  }

})

// ====================================================
// Получение только картинок
router.get('/images', (req, res) => {
  fs.readdir('images', (err, files) => {
   const imgs = files.map(item => {
      return item
    })
    res.send(imgs)
  })
})

// Удаление картинки
router.post('/images', async (req, res) => {
  try {
    console.log(req.body.name);
    deleteImgSlide(req.body.name)
    return res.json({message: 'Файл удален', name: req.body.name})
  } catch (err) {
    console.log(err);
  }
})




export default router


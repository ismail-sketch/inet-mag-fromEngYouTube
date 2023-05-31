import express from "express";
const router = express.Router()
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import mongoose from "mongoose";
import multer from "multer";
const upload = multer({ dest: 'images/' })


// Добавление продукта
router.post('/', upload.array('images'), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category)//Категория здесь нужна для того, чтобы проверить, существует ли такая категория
    if(!category) return res.status(400).send('Такой категории не существует')


    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      images: req.files,
      brand: req.body.brand,
      price: req.body.price,
      category: category,
      countInStock: '24',
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFuetured: req.body.isFuetured,
      dateCreated: req.body.dateCreated,
    });


    console.log(product);

    product = await product.save()
    if(!product) {
      return res.status(500).send('Не удается создать продукт')
    }
    return res.json(product)

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }

  });

  // Обновление продукта==========================
  router.put('/:id', upload.array('images'), async (req, res) => {

    try{
      const category = await Category.findById(req.body.category)//Категория здесь нужна для того, чтобы проверить, существует ли такая категория
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          richDescription: req.body.richDescription,
          // images: req.files,
          brand: req.body.brand,
          price: req.body.price,
          category: category,
          countInStock: '24',
          rating: req.body.rating,
          numReviews: req.body.numReviews,
          isFuetured: req.body.isFuetured,
          dateCreated: req.body.dateCreated,
          index: req.body.index
        },
        {new: true}
      )
       if(!product) {
        return res.status(400).json({message: "Не удалось обновить товар..."})
      }
      return res.status(200).send(product)

    }catch (err) {
      console.log(`Ошибка: ${err}`)
    }
  })

// Получение всех продуктов
router.get('/', async (req, res) => {
  try {
    // const productList =  await Product.find().select('name image -_id')
    // const productList =  await Product.find().populate('category')
    const productList = await Product.find()
    if(!productList) {
        return res.status(500).json({message: 'Что-то пошло не так...'})
    }
    return res.json(productList)
  } catch (err) {
    console.log(err);
  }

})

// Удаление продукта
router.delete('/:id/:name', async (req, res) => {
  try {
      const product = await Product.findByIdAndRemove(req.params.id)
      // deleteImgSlide(req.params.name)
      if(product) {
          return res.status(200).json({success: true, message: 'Товар удален', id: req.params.id})
      } else {
          return res.status(404).json({success: false, message: 'Товар не найден...'})
      }
  } catch (e) {
      return res.status(400).json({success: false, error: e})
  }

})

// Получение одного продукта
router.get('/:id', async (req, res) => {
  if(!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Неверный ID')
  }
  try {
    const product =  await Product.findById(req.params.id).populate('category')
    if(!product) {
        return res.status(500).json({message: 'Что-то пошло не так...'})
    }
    return res.json(product)
  } catch (err) {
    console.log(err);
  }

})

// Получение информации о продуктах (например, цене, кол-ве и т.п.)
router.get('/get/count', async (req, res) => {
  try {
    const productCount =  await Product.countDocuments()

    if(!productCount) {
        return res.status(500).json({message: 'Что-то пошло не так...'})
    }
    return res.json({productCount: productCount})

  } catch (err) {
    console.log(err);
  }

})

// Получение рекомендуемых продуктов (:count здесь нужен для получение определенного кол-ва продуктов)
router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  try {
    const products =  await Product.find({isFuetured: true}).limit(count).populate('category')

    if(!products) {
        return res.status(500).json({message: 'Что-то пошло не так...'})
    }
    return res.send(products)

  } catch (err) {
    console.log(err);
  }

})

// Фильтрация по категориям
router.get('/get/cat', async (req, res) => {
  let filter = {}
  if(req.query.categories) {
    filter = {category: req.query.categories.split(',')}
  }
  try {
    const products =  await Product.find(filter).populate('category')

    if(!products) {
        return res.status(500).json({message: 'Что-то пошло не так...'})
    }
    return res.send(products)

  } catch (err) {
    console.log(err);
  }

})

export default router


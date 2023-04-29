import express from "express";
const router = express.Router()
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import mongoose from "mongoose";

// Добавление продукта
router.post('/', async (req, res) => {
  try {
    const category = await Category.findById(req.body.category)//Категория здесь нужна для того, чтобы проверить, существует ли такая категория
    if(!category) return res.status(400).send('Такой категории не существует')

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFuetured: req.body.isFuetured,
      dateCreated: req.body.dateCreated,
    });
    product = await product.save()
    if(!product) {
      return res.status(500).send('Не удается создать продукт')
    }
    return res.json(product)

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }

  });

// Получение всех продуктов
router.get('/', async (req, res) => {
  try {
    // const productList =  await Product.find().select('name image -_id')
    const productList =  await Product.find().populate('category')

    if(!productList) {
        return res.status(500).json({message: 'Что-то пошло не так...'})
    }
    return res.json(productList)
  } catch (err) {
    console.log(err);
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


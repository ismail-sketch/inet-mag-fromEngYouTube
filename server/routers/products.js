import express from "express";
const router = express.Router()
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

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

  router.get('/', async (req, res) => {
    try {
      // const productList =  await Product.find().select('name image -_id')
      const productList =  await Product.find()

      if(!productList) {
          return res.status(500).json({message: 'Что-то пошло не так...'})
      }
      return res.json(productList)
    } catch (err) {
      console.log(err);
    }

  })

  router.get('/:id', async (req, res) => {
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

export default router


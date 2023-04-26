import express from "express";
const router = express.Router()
import { Product } from "../models/Product.js";

router.post('/', async (req, res) => {
    const product = new Product({
      name: req.body.name,
      img: req.body.img,
      countInStock: req.body.countInStock
    });
    await product.save()
    res.json(product)
  });

  router.get('/', async (req, res) => {
      const productList =  await Product.find()

      if(!productList) {
          res.status(500).json({message: 'Что-то пошло не так...'})
      }
      res.json(productList)
  })

export default router


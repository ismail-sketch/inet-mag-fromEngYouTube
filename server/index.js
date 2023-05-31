import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url';
import multer from 'multer'
import { storageConfig } from './middleware/file.js'


import productsRouter from './routers/products.js'
import categoriesRouter from './routers/categories.js'
import sliderRouter from './routers/mainSlider.js'
import regAuth from './routers/regAuth.js'
import { apiAdminGetadmin } from './routers/regAuth.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


const app = express()

const PORT = process.env.PORT || 5001
const api = process.env.API_URL


app.use(cors())
app.options('*', cors())


// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Функции для загрузки статики
app.use(express.static(__dirname))
// app.use(multer({storage:storageConfig}).single("slide"));


// Routers
app.use(`/api/products`, productsRouter)
app.use(`/api/categories`, categoriesRouter)
app.use('/api/admin/sliders', sliderRouter)
app.use('/api', regAuth)
app.use('/api', apiAdminGetadmin)



mongoose.connect(process.env.CONNECT_DB)
.then(() => {
    console.log('Соединение с базой данных установлено...');
})
.catch((e) => {console.log(e)})


const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        })
    } catch(e) {
        console.log(e);
    }
}
start()
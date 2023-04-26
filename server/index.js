import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import productsRouter from './routers/products.js'
import categoriesRouter from './routers/categories.js'
import cors from 'cors'



const app = express()

const PORT = process.env.PORT
const api = process.env.API_URL

app.use(cors())
app.options('*', cors())

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)


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
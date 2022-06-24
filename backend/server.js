import path from 'path';
import express from "express";
import morgan from 'morgan';
import dotenv from "dotenv";
const app = express();
import cors from "cors";
import connectDB from "./config/db.js"
import productRoutes from './routes/productRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();
const PORT = process.env.PORT;
const mode = process.env.NODE_ENV

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json())
connectDB();

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAY_CLIENT_ID)
})


const __dirname = path.resolve()
app.use('/frontend', express.static(path.join(__dirname, '/frontend/public/images')))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("ApI is running....")
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`server running in ${mode} mode on port ${PORT}`))
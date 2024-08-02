import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

import 'dotenv/config.js';    
//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors({
  origin: ['https://gusto-frontend.vercel.app', 'https://gusto-admin.vercel.app'] // Replace with your frontend and admin domains
}));

//db connection
connectDB();

//api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});




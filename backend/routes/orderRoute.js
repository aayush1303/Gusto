import express from 'express';
import { placeOrder,verifyOrder,useOrders,listOrders,updateOrderStatus} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,useOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateOrderStatus);


export default orderRouter;
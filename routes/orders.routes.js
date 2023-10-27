import express from 'express';
import { addOrder, getOrders } from '../controllers/orders.controller.js';

const orderRouter = express.Router();

orderRouter.post('/', addOrder);

orderRouter.get('/', getOrders);

export default orderRouter;
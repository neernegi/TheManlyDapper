import express from 'express';
import { getCart, addCartItem, updateCartItem } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.get('/', getCart);

cartRouter.post('/items', addCartItem);

cartRouter.patch('/items', updateCartItem);

export default cartRouter;
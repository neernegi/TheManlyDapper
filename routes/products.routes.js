import express from 'express';

import { getAllProducts, getProductDetails } from '../controllers/products.controller.js';

const productRouter = express.Router();

productRouter.get('/products', getAllProducts );

productRouter.get('/products/:id', getProductDetails);

export default productRouter;
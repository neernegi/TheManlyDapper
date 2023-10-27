import express from 'express';

import { getProducts, getNewProduct, createNewProduct, getUpdateProduct, updateProduct, deleteProduct, getOrders, updateOrder } from '../controllers/admin.controller.js';
import imageUploadMiddleware from '../middlewares/image-upload.js';

const adminRouter = express.Router();

adminRouter.get('/products', getProducts); // /admin/products

adminRouter.get('/products/new', getNewProduct);

adminRouter.post('/products', imageUploadMiddleware, createNewProduct);
adminRouter.get('/products/:id', getUpdateProduct);

adminRouter.post('/products/:id', imageUploadMiddleware, updateProduct);

adminRouter.delete('/products/:id', deleteProduct);

adminRouter.get('/orders', getOrders);

adminRouter.patch('/orders/:id', updateOrder);

export default adminRouter;
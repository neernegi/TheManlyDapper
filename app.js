import path from 'path';
import express from 'express';
import csrf from 'csurf';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import expressSession from 'express-session';
import { createSessionConfig } from './config/session.js';
import { connectToDatabase } from './data/database.js';


import { addCsrfToken } from './middlewares/csrf-token.js';
import { errorHandler } from './middlewares/error-handler.js';
import { checkAuthStatus } from './middlewares/check-auth.js';
import protectRoutes from './middlewares/protect-routes.js';
import initializeCart from './middlewares/cart.js';
import updateCartPrices from './middlewares/update-cart-prices.js';
import { notFoundHandler } from './middlewares/not-found.js';

import authRouter from './routes/auth.routes.js';
import productRouter from './routes/products.routes.js';
import baseRouter from './routes/base.routes.js';
import adminRouter from './routes/admin.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/orders.routes.js';
import payRouter from './routes/pay.routes.js';

dotenv.config();
const app = express();


const __dirname = path.resolve();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(initializeCart);
app.use(updateCartPrices);

app.use(addCsrfToken);
app.use(checkAuthStatus);

app.use(baseRouter);
app.use(authRouter);
app.use(productRouter);
app.use('/cart', cartRouter);
app.use('/orders', protectRoutes, orderRouter);
app.use('/admin', protectRoutes, adminRouter);
app.use(payRouter);

app.use(notFoundHandler);

app.use(errorHandler);



connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });


export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:3000/callback'
paytmParams['EMAIL'] = 'kunaltyagi@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'
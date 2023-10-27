import express from 'express'

import { addPaymentGateway,paymentResponse } from '../controllers/pay.controller.js';

const payRouter = express.Router();

payRouter.post('/payment', addPaymentGateway);

payRouter.post('/callback', paymentResponse);

export default payRouter;
import express from 'express';
import { getSignup, signup, getLogin, login, logout } from '../controllers/auth.controller.js';



const authRouter = express.Router();

authRouter.get('/signup',getSignup);

authRouter.post('/signup', signup);

authRouter.get('/login',getLogin);

authRouter.post('/login', login);

authRouter.post('/logout', logout)

export default authRouter;
import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';

const route = express.Router();

route.post('/register', registerUser);

route.post('/login', loginUser);

route.get('/logout', logoutUser)

export const userRoute = route;

import express from 'express';
import { forgotPassword, getUser, getUserForPortfolio, login, logout, register, resetPassword, updatePassword, updateProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .get('/logout', isAuthenticated, logout)
    .get('/me', isAuthenticated, getUser)
    .put('/update/me', isAuthenticated, updateProfile)
    .put('/update/password', isAuthenticated, updatePassword)
    .get('/me/portfolio', getUserForPortfolio)
    .post('/password/forgot', forgotPassword)
    .put('/password/reset/:token', resetPassword)

export default router
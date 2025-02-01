import express from 'express';
import { getAllMessages, sendMessage, deleteMessage } from '../controllers/messageController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router
    .post('/send', sendMessage)
    .get('/getall', getAllMessages)
    .delete('/delete/:id', isAuthenticated, deleteMessage)

export default router
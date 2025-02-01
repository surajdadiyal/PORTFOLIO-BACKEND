import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { deleteTimeLine, getAllTimeLine, postTimeLine } from '../controllers/timelineController.js';

const router = express.Router();

router
    .post('/add', isAuthenticated, postTimeLine)
    .delete('/delete/:id', isAuthenticated, deleteTimeLine)
    .get('/getall', getAllTimeLine)


export default router   
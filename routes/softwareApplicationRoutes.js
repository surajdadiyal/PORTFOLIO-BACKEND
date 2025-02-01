import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import { addNewApplication, deleteApplication, getAllApplications } from '../controllers/softwareApplicationController.js';

const router = express.Router();

router
    .post('/add', isAuthenticated, addNewApplication)
    .delete('/delete/:id', isAuthenticated, deleteApplication)
    .get('/getall', getAllApplications)

export default router
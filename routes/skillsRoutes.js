import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addNewSkills, deleteSkills, getAllSkills, updateSkills } from '../controllers/skillsController.js';

const router = express.Router()

router
    .post('/add', isAuthenticated, addNewSkills)
    .delete('/delete/:id', isAuthenticated, deleteSkills)
    .put('/update/:id', isAuthenticated, updateSkills)
    .get('/getall', getAllSkills)

export default router
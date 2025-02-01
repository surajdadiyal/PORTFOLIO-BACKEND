import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addNewProject, deleteProject, getAllProjects, getSingleProject, updateProject } from '../controllers/projectController.js';

const router = express.Router();

router
    .post('/add', isAuthenticated, addNewProject)
    .delete('/delete/:id', isAuthenticated, deleteProject)
    .put('/update/:id', isAuthenticated, updateProject)
    .get('/getall', getAllProjects)
    .get('/get/:id', getSingleProject)


export default router
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import dbConnection from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import timeLineRoutes from './routes/timelineRoutes.js';
import softwareApplicationRoutes from './routes/softwareApplicationRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

dotenv.config({
    path: "./config/config.env"
});

app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
}));

app.use(morgan("dev"))

app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/timeline', timeLineRoutes);
app.use('/api/v1/softwareapplication', softwareApplicationRoutes);
app.use('/api/v1/skill', skillsRoutes);
app.use('/api/v1/project', projectRoutes);

dbConnection();

app.use(errorMiddleware);


export default app;
import express from 'express';
import cors from 'cors';
import { taskRouter } from './routes/Task.route.js';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use('/tasks', taskRouter);
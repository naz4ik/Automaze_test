'use strict';
import express from 'express';
import { taskController } from '../controllers/Task.controller.js';

export const taskRouter = new express.Router();

taskRouter.get('/', taskController.getAllTasks);
taskRouter.post('/createTask', taskController.createTask);
taskRouter.put('/toggleAll', taskController.toggleAll);
taskRouter.delete('/completed', taskController.deleteCompleted);
taskRouter.put('/:taskId', taskController.updateTask);
taskRouter.put('/:taskId/toggle', taskController.toggleDone);
taskRouter.delete('/:taskId', taskController.deleteTask);
import { Task } from '../models/Task.model.js';
import { Op } from 'sequelize';

const getAllTasks = async (req, res) => {
  const { search, status, sortOrder } = req.query;

  const where = {};

  if (search) {
    where.title = { [Op.iLike]: `%${search}%` };
  }

  if (status === 'done') {
    where.isDone = true;
  } else if (status === 'undone') {
    where.isDone = false;
  }

  const order = [];
  if (sortOrder === 'asc' || sortOrder === 'desc') {
    order.push(['priority', sortOrder]);
  }

  const tasks = await Task.findAll({ where, order });
  res.status(200).send(tasks);
};

const createTask = async (req, res) => {
  const { title, priority, dueDate } = req.body;

  if (!title) {
    return res.sendStatus(401);
  }

  const newTask = await Task.create({ title, priority, dueDate });
  res.status(201).send(newTask);
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    return res.sendStatus(401);
  }

  await Task.destroy({ where: { id: taskId } });
  res.sendStatus(204);
};

const toggleDone = async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    return res.sendStatus(401);
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    return res.sendStatus(404);
  }

  task.isDone = !task.isDone;
  await task.save();
  res.status(200).send(task);
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, priority, dueDate } = req.body;

  if (!taskId) {
    return res.sendStatus(401);
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    return res.sendStatus(404);
  }

  if (title !== undefined) task.title = title;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;

  await task.save();
  res.status(200).send(task);
};

const toggleAll = async (req, res) => {
  const allTasks = await Task.findAll();

  const allDone = allTasks.every((task) => task.isDone);
  const newStatus = !allDone;

  await Task.update({ isDone: newStatus }, { where: {} });

  res.sendStatus(204);
};

const deleteCompleted = async (req, res) => {
  await Task.destroy({ where: { isDone: true } });
  res.sendStatus(204);
};


export const taskController = {
  getAllTasks,
  createTask,
  deleteTask,
  toggleDone,
  updateTask,
  toggleAll,
  deleteCompleted,
};
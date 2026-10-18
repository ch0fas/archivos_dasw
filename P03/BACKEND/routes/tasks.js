const express = require('express');
const tasksController = require('../controllers/tasks_api_controller');

const routerTasks = express.Router();

routerTasks.use('/', tasksController.authTasksMiddleware);
routerTasks.use('/:id', tasksController.authTasksMiddleware);

routerTasks.post('/', tasksController.registerTask);

routerTasks.get('/', tasksController.tasksPage);

routerTasks.get('/:id', tasksController.getTaskFromId);

module.exports = routerTasks;
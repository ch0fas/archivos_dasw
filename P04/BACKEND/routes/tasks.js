const express = require('express');
const tasksController = require('../controllers/tasks_api_controller');

const routerTasks = express.Router();

// routerTasks.use('/', tasksController.authTasksMiddleware);
routerTasks.use('/:id', tasksController.authTasksMiddleware2); // Hice otro porque como ahora el ID del usuario no se da en el body de la request, la autentificación es distinta

routerTasks.post('/', tasksController.authTasksMiddleware, tasksController.registerTask);

routerTasks.get('/', tasksController.authTasksMiddleware2, tasksController.tasksPage);

routerTasks.get('/:id', tasksController.getTaskFromId);

routerTasks.patch("/:id", tasksController.patchTask);

routerTasks.delete("/:id", tasksController.removeTask);

module.exports = routerTasks;
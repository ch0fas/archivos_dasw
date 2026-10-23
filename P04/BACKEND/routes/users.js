const express = require('express');
const usersController = require('../controllers/users_api_controller');

const routerUsers = express.Router();

routerUsers.use('/:id', usersController.authUsersMiddleware);

routerUsers.post('/', usersController.registerUser);

routerUsers.get("/", usersController.usersPage);

routerUsers.get("/:id", usersController.getUserFromID);

routerUsers.patch("/:id", usersController.patchUser);

routerUsers.delete("/:id", usersController.removeUser);

module.exports = routerUsers;
const express = require('express');
const tagsController = require('../controllers/tags_api_controller');

const routerTags = express.Router();

routerTags.use('/', tagsController.authTagsMiddleware);
routerTags.use('/:id', tagsController.authTagsMiddleware);

routerTags.post('/', tagsController.registerTag);

routerTags.get('/', tagsController.tagsPage);

routerTags.get("/:id", tagsController.getTagFromId);

routerTags.patch("/:id", tagsController.patchTag);




module.exports = routerTags;
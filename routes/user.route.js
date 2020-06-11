var express = require('express');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var middleware = require('../middleware/cookie.middleware');

var router = express.Router();

router.get("/", middleware.cookie, controller.index);

// Create a user
router.get("/create", controller.getCreate);

router.post("/create", validate.postCreate, controller.postCreate);

// View info of a user
router.get("/:id", controller.view);

// Delete a user
router.get("/:id/delete", controller.delete);

// Update a user
router.get("/:id/update", controller.getUpdate);

router.post("/:id/update", controller.postUpdate);

module.exports = router;
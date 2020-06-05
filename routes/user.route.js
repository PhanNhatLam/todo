var express = require('express');

var controller = require('../controllers/user.controller');

var router = express.Router();

router.get("/", controller.index);

// View info of a user
router.get("/:id", controller.view);

// Delete a user
router.get("/:id/delete", controller.delete);

// Update a user
router.get("/:id/update", controller.getUpdate);

router.post("/:id/update", controller.postUpdate);

// Create a user
router.post("/create", controller.postCreate);

module.exports = router;
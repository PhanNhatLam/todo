var express = require('express');

var controller = require('../controllers/book.controller');

var router = express.Router();

router.get("/", controller.index);

// Create a book
router.get("/create", controller.getCreate);

router.post("/create", controller.postCreate);

// View info of a book
router.get("/:id", controller.view);

// Delete a book
router.get("/:id/delete", controller.delete);

// Update a book
router.get("/:id/update", controller.getUpdate);

router.post("/:id/update", controller.postUpdate);

module.exports = router;
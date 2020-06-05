var express = require('express');

var controller = require('../controllers/book.controller');

var router = express.Router();

router.get("/", controller.index);

// View info of a book
router.get("/:id", controller.view);

// Delete a book
router.get("/:id/delete", controller.delete);

// Update a book
router.get("/:id/update", controller.getUpdate);

router.post("/:id/update", controller.postUpdate);

// Create a book
router.post("/create", controller.postCreate);

module.exports = router;
var express = require('express');

var controller = require('../controllers/transaction.controller');

var router = express.Router();

router.get("/", controller.index);

// Create a transaction
router.get("/create", controller.getCreate);

router.post("/create", controller.postCreate);

// Delete a transaction
router.get("/:id/delete", controller.delete);

// View info of a transaction
router.get("/:id", controller.view);

// Status of transaction
router.get("/:id/complete", controller.isComplete);

module.exports = router;
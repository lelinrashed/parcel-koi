const router = require("express").Router();
const { createUser, getAllUsers } = require("./user.controller");

// Create user
router.post("/create", createUser);

// Get all user
router.get("", getAllUsers);

module.exports = router;

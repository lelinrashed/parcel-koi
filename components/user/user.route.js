const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("./user.controller");

// Create user
router.post("/create", createUser);

// Get all user
router.get("", getAllUsers);

// Update a user
router.put("", updateUser);

// Delete a user
router.delete("", deleteUser);

module.exports = router;

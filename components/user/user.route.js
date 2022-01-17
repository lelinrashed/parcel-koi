const router = require("express").Router();
const { createUser } = require("./user.controller");

router.post("/create", createUser);

module.exports = router;

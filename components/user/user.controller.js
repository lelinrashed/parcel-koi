const { logger } = require("express-winston");
const User = require("./user.model");

/**
 * create user
 * @param {*} req
 * @param {*} res
 */
exports.createUser = async (req, res) => {
  const { username } = req.body;
  const user = new User({ username, createdAt: new Date() });
  try {
    const data = await user.save();
    res.status(201).send("User create. Id: " + data.id);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get all users
 * @param {*} req
 * @param {*} res
 */
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  const data = [];
  users.map((user) => {
    data.push({
      id: user._id,
      username: user.username,
      createdAt: new Date(user.createdAt).toDateString(),
    });
  });
  res.json({ success: true, users: data });
};

/**
 * Update user
 * @param {*} req
 * @param {*} res
 */
exports.updateUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  user.username = req.body.username;
  user.save();
  return res.status(200).send({ success: true, message: "User updated" });
};

/**
 * Return delete user
 * @param {*} req
 * @param {*} res
 */
exports.deleteUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({success: false, message: "User not found" })
  }
  await User.deleteOne({ _id: userId });
  return res.status(200).json({
    success: true,
    message: "User deleted",
  });
};

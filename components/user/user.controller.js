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

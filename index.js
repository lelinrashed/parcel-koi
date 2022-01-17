require("dotenv").config();
const express = require("express");
const connectWithDB = require("./config/mongodb.config");
const userHandler = require("./components/user/user.route");

const port = process.env.PORT || 8000;

// Initiliaze app
const app = express();
app.use(express.json());
connectWithDB();

// Initilize route
app.use("/api/users", userHandler);

// App listing
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

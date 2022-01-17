const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/parcelkoi";
const options = {};

const connectWithDB = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.error(err);
    } else console.log("Database connection established");
  });
};

module.exports = connectWithDB;

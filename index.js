require("dotenv").config();
const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");
const winstonFile = require("winston-daily-rotate-file");
const winstonMongo = require("winston-mongodb");
const { ElasticsearchTransformer } = require("winston-elasticsearch");

const connectWithDB = require("./config/mongodb.config");
const userHandler = require("./components/user/user.route");

const port = process.env.PORT || 8000;

// Initiliaze app
const app = express();
app.use(express.json());

// Connect with mongoddb
connectWithDB();

// Initialize process request
const processRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers["x-correlation-id"] = correlationId;
  }
  res.set("x-correlation-id", correlationId);
  next();
};
app.use(processRequest);

const getMessage = (req, res) => {
  const obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };
  return JSON.stringify(obj);
};

const fileInfoTransport = new winston.transports.DailyRotateFile({
  filename: "log-info-%DATE%.log",
  datePattern: "yyyy-mm-dd-HH",
});

const infoLogger = expressWinston.logger({
  transports: [new winston.transports.Console(), fileInfoTransport],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: false,
  msg: getMessage,
});

app.use(infoLogger);

// Initilize route
app.use("/api/users", userHandler);

// App listing
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

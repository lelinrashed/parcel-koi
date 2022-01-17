import env from "dotenv";
import express from "express";

env.config();
const port = process.env.PORT || 8000;

const app = express();

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

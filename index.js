const express = require("express");
require("dotenv").config();
const ErrorHandler = require("./middlewares/errorHandler");
const ConnectDB = require("./db/connect");
const ProductsRouter = require("./routes/products");

const app = express();

// starting a server

const startTheServer = async () => {
  try {
    await ConnectDB(process.env.MONGODB_URI);
    app.listen(process.env.HTTP_PORT);
  } catch (err) {
    console.log(err);
  }
};

startTheServer();

// middlweares
app.use(ErrorHandler);
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.end("<h1>Hello world 🚀</h1>");
});

app.use("/api/v1/products", ProductsRouter);

const express = require("express");
const app = express();

const path = require("path");

const cors = require("cors");

//db connection
const connection = require("./database/connection");
connection();

//middleware require
const errorMiddleware = require("./middleware/error");

//handling uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

//routes import
const user = require("./routes/userRoutes");
const data = require("./routes/dataRoutes");

//middlewares
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/user", user);
app.use("/api/data", data);

//error middleware
app.use(errorMiddleware);

//cors middleware


app.get("/", (req, res) => {
  res.status(200).json({ message: "North backend" });
});

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

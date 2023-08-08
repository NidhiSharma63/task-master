require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const server = express();
const cors = require("cors");
const router = require("./routes/router");
const errorHandle = require("./middleware/errorHanlde");

// use cors
server.use(cors());
// for accessing the cookie that we have saved user site which is token(in form of cookie)
server.use(cookieParser());
// for parsing the req.body for postman
server.use(express.json());
// for brwoser
server.use(express.urlencoded({ extended: false }));

// middleware for routes
server.use("/api/v1", router);

// require connectDB from db/connect
const connectDB = require("./db/connect");

// handle error
server.use(errorHandle);

// creating a start function that will connect to database and run the server
const start = async () => {
  try {
    await connectDB(process.env.MONGOOSE_URI);
    server.listen(
      process.env.PORT ?? 3000,
      console.log("running at port", process.env.PORT ?? 3000)
    );
  } catch (error) {
    console.log("::error::", error);
  }
};
start();

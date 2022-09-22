const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
// const TwilioSender = require("./utils/TwilioAuth");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Server is Shutting Down!!! Due to UNCAUGHT EXCEPTION");
  process.exit(1);
});

app.use(express.json());
app.use(morgan("dev"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
console.log("hhe");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "build")));

app.use("/image", express.static("public/image"));
app.use("/course_img", express.static("public/course_img"));
app.use("/avatar", express.static("public/avatar"));

app.get("/one", async (req, res, next) => {
  res.render(`${__dirname}/views/form.ejs`, {
    name: "Nikhil",
  });
});

// mongoose connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connect"));

// cookies parser
const cookiesParser = require("cookie-parser");
app.use(cookiesParser(process.env.SECRET_KEY));

// import all router
const userRouter = require("./router/userRouter"); //User router
const blogRouter = require("./router/blogRouter"); //Blog router
const careerRouter = require("./router/careerRouter"); //career router
const courseRoute = require("./router/courseRoute"); // Course Route
const mailRoute = require("./router/mailRoute"); // Mailing Route
const collegeRoute = require("./router/collegeRouter"); // College Route
const formRoute = require("./router/formRoute"); // Offer and Contact Form Route
const empRoute = require("./router/empRoute"); // Offer and Contact Form Route
const countryAPI = require("./router/countryRoute") //country state city api

app.use("/", userRouter);
app.use("/blog", blogRouter);
app.use("/career", careerRouter);
app.use("/course", courseRoute);
app.use("/mail", mailRoute);
app.use("/", collegeRoute);
app.use("/form", formRoute);
app.use("/emp", empRoute);
app.use("/api",countryAPI)

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Middleware Error
const middlewareError = require("./middleware/middlewareError");

app.use(middlewareError);

// server listing port
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running at port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.on("unhandledRejection", (err) => {
    console.log("Server is Shutting Down!!! Due to UNHANDLED REJECTION");
    server.close(() => process.exit(1));
  });
});

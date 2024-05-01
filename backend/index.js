require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());

// use router
Object.values(routes).forEach((route) => {
  app.use(route);
});

app.get("/", (req, res) => {
  res.send("Server Ready");
});

app.get("*", (req, res) => {
  res.send({ message: "Route Not Found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

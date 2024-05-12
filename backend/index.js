require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const routes = require("./routes/index");
const generateDocs = require("./helper/generate.docs");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:3000"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, './api-docs')))
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

// generate docs swagger
generateDocs(app);

// use router
Object.values(routes).forEach((route) => {
  app.use(route);
});

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome To Infinite Insights API",
    endpointDocs: "/v1/api-docs",
  });
});

app.get("*", (req, res) => {
  res.send({
    message: `Not found route : http://localhost:${PORT}${req.params[0]}`,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

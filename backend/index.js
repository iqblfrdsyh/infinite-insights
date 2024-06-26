require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const morgan = require('morgan')
const routes = require("./routes/index");
const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./docs/api-docs.json");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:3000"],
  })
);
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

// generate docs swagger
app.use("/v1/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

// use router
Object.values(routes).forEach((route) => {
  app.use(route);
});

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome To Infinite Insights API",
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

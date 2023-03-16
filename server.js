const path = require("path");
const express = require("express");
const ideaRouter = require("./routes/ideas");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  })
);

app.get("/", (req, res) => res.send({ message: "Hello World!" }));

app.use("/api/ideas", ideaRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

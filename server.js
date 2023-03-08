const express = require("express");
const ideaRouter = require("./routes/ideas");
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send({ message: "Hello World!" }));

app.use("/api/ideas", ideaRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require("express");
const app = express();
const port = 3000;

const ideas = [
  { id: 1, title: "First Idea" },
  { id: 2, title: "Second Idea" },
  { id: 3, title: "Third Idea" },
  { id: 4, title: "Fourth Idea" },
];

app.get("/", (req, res) => res.send({ message: "Hello World!" }));

app.get("/api/ideas", (req, res) => {
  res.json({ success: true, data: [{ title: "First Idea" }] });
});

app.get("/api/ideas/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === parseInt(req.params.id));

  if (!idea) {
    return res.status(404).json({ success: false, error: "No idea found" });
  }

  res.json({ success: true, data: idea });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

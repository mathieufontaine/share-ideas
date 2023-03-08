const express = require("express");
const router = express.Router();
const ideas = require("../data/ideas");

router.get("/", (req, res) => {
  res.json({ success: true, data: ideas });
});

router.get("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === parseInt(req.params.id));

  if (!idea) {
    return res.status(404).json({ success: false, error: "No idea found" });
  }

  res.json({ success: true, data: idea });
});

// add an idea
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a title" });
  }

  const newIdea = {
    id: ideas.length + 1,
    title,
  };

  ideas.push(newIdea);
  res.status(201).json({ success: true, data: newIdea });
});

// update an idea
router.put("/:id", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a title" });
  }

  const idea = ideas.find((idea) => idea.id === parseInt(req.params.id));

  if (!idea) {
    return res.status(404).json({ success: false, error: "No idea found" });
  }

  idea.title = title;

  res.json({ success: true, data: idea });
});

// delete an idea
router.delete("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === parseInt(req.params.id));

  if (!idea) {
    return res.status(404).json({ success: false, error: "No idea found" });
  }

  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  res.json({ success: true, data: {} });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// get an idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ success: false, error: "No idea found" });
    }
    res.json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// add an idea
router.post("/", async (req, res) => {
  const { title, description, tags, status, user } = req.body;

  if (!title || !description || !tags || !status || !user) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide all the information" });
  }

  const newIdea = new Idea({
    title,
    description,
    tags,
    status,
    user,
    date: Date.now(),
  });

  try {
    const savedIdea = await newIdea.save();
    res.status(201).json({ success: true, data: savedIdea });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

// update an idea
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      error: "You must provide a new title or description",
    });
  }

  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      { new: true }
    );
    res.json({ success: true, data: updatedIdea });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// delete an idea
router.delete("/:id", async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;

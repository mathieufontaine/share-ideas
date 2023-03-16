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
    upVotes: 0,
    downVotes: 0,
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
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({
      success: false,
      error: "You must provide a new title or description",
    });
  }
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea || idea.user !== req.body.user) {
      return res
        .status(403)
        .json({ success: false, error: "User not authorized to update" });
    } else {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          status,
        },
        { new: true }
      );
      res.json({ success: true, data: updatedIdea });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// update an idea's votes
router.put("/:id/votes", async (req, res) => {
  const { vote } = req.body;
  if (vote === undefined) {
    return res.status(400).json({
      success: false,
      error: "You must provide a new vote or downVote",
    });
  }

  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ success: false, error: "Idea not found" });
    }
    if (idea.user === req.body.user) {
      return res
        .status(403)
        .json({ success: false, error: "You cannot vote on your own idea" });
    } else {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          upVotes: vote ? idea.upVotes + 1 : idea.upVotes,
          downVotes: !vote ? idea.downVotes + 1 : idea.downVotes,
        },
        { new: true }
      );
      res.json({ success: true, data: updatedIdea });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// delete an idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea || idea.user !== req.body.user) {
      return res
        .status(403)
        .json({ success: false, error: "User not authorized to delete" });
    } else {
      await Idea.findByIdAndDelete(req.params.id);
      res.json({ success: true, data: {} });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;

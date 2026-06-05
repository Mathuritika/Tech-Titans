const express = require("express");
const router = express.Router();

const Evaluation = require("../models/Evaluation");

router.post("/save", async (req, res) => {
  try {

    const evaluation =
      new Evaluation(req.body);

    await evaluation.save();

    res.status(200).json({
      message: "Saved Successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

router.get("/", async (req, res) => {
  try {

    const evaluations =
      await Evaluation.find();

    res.json(evaluations);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

module.exports = router;
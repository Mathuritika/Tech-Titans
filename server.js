const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");


require("dotenv").config();

const evaluationRoutes = require("./routes/evaluationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const extractText = require("./ocr");
const evaluateAnswer = require("./aiEvaluator");

const app = express();

// Multer for Auto Evaluate
const upload = multer({
  dest: "uploads/",
});

// Middleware
app.use(cors());
app.use(express.json());


// ======================
// AUTO EVALUATE ROUTE
// ======================

app.post(
  "/auto-evaluate",
  upload.single("file"),
  async (req, res) => {
    try {

      console.log("REQUEST RECEIVED");
      console.log(req.file);

      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded"
        });
      }

      const text = await extractText(req.file.path);

      console.log("OCR TEXT:");
      console.log(text);

      const marks = await evaluateAnswer(text);

      console.log("MARKS:");
      console.log(marks);

      res.json({ marks });

    } catch (err) {
      console.error("AUTO EVALUATE ERROR:");
      console.error(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

// ======================
// ROUTES
// ======================

app.use(
  "/api/evaluations",
  evaluationRoutes
);

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/upload",
  uploadRoutes
);

// ======================
// MONGODB
// ======================

console.log(
  "MONGO_URI =",
  process.env.MONGO_URI
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(
      "MongoDB Error:",
      err
    );
  });

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {
  res.send(
    "Rubric Backend Running"
  );
});

// ======================
// START SERVER
// ======================

app.listen(
  process.env.PORT || 5000,
  () => {
    console.log(
      "Server running on port 5000"
    );
  }
);
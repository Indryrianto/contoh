const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.2hqmk.mongodb.net/vistaVoyage?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json()); // Parsing JSON
app.use(express.static(path.join(__dirname, "../frontend"))); // Sajikan file frontend

// Route Default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Import Routes
const tourRoutes = require("./routes/tourRoutes");
app.use("/api/tours", tourRoutes); // CRUD untuk Tour

// Import Guide Routes
const guideRoutes = require('./routes/guideRoutes');

// Tambahkan Middleware untuk Guide
app.use('/api/guides', guideRoutes); // CRUD untuk Guide

// Jalankan Server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

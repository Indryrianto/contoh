const express = require("express");
const router = express.Router();
const Tour = require("../models/tourModel");

// Tambah Data
router.post("/", async (req, res) => {
  try {
    const tour = new Tour(req.body);
    const savedTour = await tour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ambil Semua Data
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Perbarui Data
router.put("/:id", async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Hapus Data
router.delete("/:id", async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;

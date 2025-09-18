const express = require("express");
const Favourite = require("../models/Favourite");
const router = express.Router();

// Add favourite
router.post("/", async (req, res) => {
  try {
    const fav = new Favourite(req.body);
    await fav.save();
    res.json(fav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get favourites by userId
router.get("/:userId", async (req, res) => {
  try {
    const favs = await Favourite.find({ userId: req.params.userId });
    res.json(favs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete favourite
router.delete("/:id", async (req, res) => {
  try {
    await Favourite.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

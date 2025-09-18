require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const favouritesRoute = require("./routes/favourites");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// Routes
app.get("/", (req, res) => res.send("Cookbook API Running ✅"));
app.use("/favourites", favouritesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

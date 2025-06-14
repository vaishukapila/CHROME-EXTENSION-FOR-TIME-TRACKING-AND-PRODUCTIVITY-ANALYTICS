const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const UserData = require("./models/UserData");
const PORT = process.env.PORT || 5000;

app.post("/api/track", async (req, res) => {
  const { url, timeSpent, category } = req.body;
  try {
    const entry = new UserData({ url, timeSpent, category });
    await entry.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

app.get("/api/data", async (req, res) => {
  const data = await UserData.find();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

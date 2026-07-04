const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/user");
dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.post("/users", async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
      });
  
      await user.save();
  
      res.status(201).json({
        message: "User saved successfully",
        user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });
app.get("/", (req, res) => {
  res.send("VertexMind Backend API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
const express = require("express");
const userModel = require("../models/user.models");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    username,
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "username already in use",
    });
  }

  const user = await userModel.create({ username, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("UserToken", token);
  res.status(201).json({
    message: "user register successfully",
    user
  });
});

module.exports = router;
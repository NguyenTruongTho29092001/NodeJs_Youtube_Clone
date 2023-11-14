import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt, { genSalt, genSaltSync, hash } from "bcrypt";
import jwt from "jsonwebtoken";
//register
export const Register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    const userCreate = await newUser.save();
    if (!userCreate) {
      res.status(500).send("User hasn't been register");
    } else {
      res.status(200).send("User has been register");
    }
  } catch (error) {
    next(error);
  }
};
//Login
export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      name: req.body.name,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, {});
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

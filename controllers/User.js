import mongoose from "mongoose";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const UpdateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const update = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(update);
    } catch (error) {
      next(error);
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can update only your account" });
  }
};
export const GetUser = async (req, res, next) => {
  try {
    const get = await User.findById(req.params.id);
    res.status(200).json(get);
  } catch (error) {
    next(error);
  }
};
export const DeleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "You has been delete" });
    } catch (error) {
      next(error);
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can delete only your account" });
  }
};
export const Subcribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subcribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subcribers: 1 },
    });
    res.status(200).json("Subscription successfull");
  } catch (error) {
    next(error);
  }
};
export const Unsubcribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subcribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subcribers: -1 },
    });
    res.status(200).json("UnSubscription successfull");
  } catch (error) {
    next(error);
  }
};
export const Like = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    });
    res.status(200).json({ message: "Video has been liked" });
  } catch (error) {
    next(error);
  }
};
export const Dislike = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });
    res.status(200).json({ message: "video has been dislike" });
  } catch (error) {
    next(error);
  }
};

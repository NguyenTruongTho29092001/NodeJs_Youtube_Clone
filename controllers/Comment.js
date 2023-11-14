import Video from "../models/Video.js";
import Comment from "../models/Comment.js";
//add comment
export const addComments = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const newComment = new Comment({ ...req.body, UserId: userId });
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
//delete comment
export const deleteComments = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.VideoId);

    if (!comment) {
      return res.status(404).json("Comment not found");
    }

    if (req.user.id === comment.UserId || req.user.id === video.UserId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted");
    } else {
      return res.status(403).send("You can delete only your comment");
    }
  } catch (error) {
    next(error);
  }
};
//update comment
export const updateComments = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//get comment
export const getComments = async (req, res, next) => {
  try {
    const comment = await Comment.find({ VideoId: req.params.VideoId });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

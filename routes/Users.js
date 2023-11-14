import express from "express";
import {
  UpdateUser,
  GetUser,
  DeleteUser,
  Subcribe,
  Unsubcribe,
  Like,
  Dislike,
} from "../controllers/User.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();
// update user
router.put("/update/:id", verifyToken, UpdateUser);

// get user
router.get("/find/:id", GetUser);

// delete user
router.delete("/delete/:id", verifyToken, DeleteUser);

// subcribe a user
router.put("/sub/:id", verifyToken, Subcribe);

// unsubcribe user
router.put("/unsub/:id", verifyToken, Unsubcribe);

// like a video
router.put("/like/:videoId", verifyToken, Like);

// dislike a video
router.put("/dislike/:videoId", verifyToken, Dislike);

export default router;

import express from "express";
import {
  addVideo,
  getVideo,
  updateVideo,
  deleteVideo,
  addView,
  randomVideo,
  subVideo,
  searchVideo,
  getByTags,
} from "../controllers/Video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//create video
router.post("/", verifyToken, addVideo);
//update video
router.put("/view/:id", verifyToken, updateVideo);
//get video
router.get("/find/:id", verifyToken, getVideo);
//delete video
router.delete("/delete/:id", verifyToken, deleteVideo);
//view
router.get("/trend/:id", addView);
//random video
router.get("/random", randomVideo);
//sub channel
router.get("/sub", verifyToken, subVideo);
//tags
router.put("/tags/", getByTags);
//search
router.get("/search", searchVideo);

export default router;

import express from "express";
import {
  addComments,
  updateComments,
  deleteComments,
  getComments,
} from "../controllers/Comment.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();
router.post("/", verifyToken, addComments);
router.put("/update/:id", verifyToken, updateComments);
router.delete("/delete/:id", verifyToken, deleteComments);
router.get("/get/:VideoId", verifyToken, getComments);
export default router;

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/Users.js";
import commnentRouter from "./routes/Comment.js";
import videoRouter from "./routes/Video.js";
import AuthRouter from "./routes/Auth.js";
import UserRouter from "./routes/Users.js";
import VideoRouter from "./routes/Video.js";
import cookieParser from "cookie-parser";
import CommentRouter from "./routes/Comment.js";

dotenv.config();
const port = process.env.port;
const app = express();
const db = process.env.CONNECTDB;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect DB Success");
  })
  .catch((error) => {
    console.log("error", error);
  });
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", commnentRouter);
app.use("/api", videoRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/video", VideoRouter);
app.use("/api/comment", CommentRouter);

app.listen(port, () => {
  console.log(`Server is running with port: ${port}`);
});

import express from "express";
import { Register, Login } from "../controllers/Auth.js";

const router = express.Router();
//CREATE A USER REGISTER
router.post("/register", Register);
//SIGN IN
router.post("/login", Login);
//GOOGLE AUTHENTICATION
router.post("/googleAuth");
export default router;

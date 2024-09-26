import express from "express";
import {
  addUserController,
  loginUserController,
} from "./controllers/user.controller.js";

const router = express.Router();

// User Routes
router.post("/user/login", loginUserController);
router.post("/user/add-user", addUserController);

export default router;

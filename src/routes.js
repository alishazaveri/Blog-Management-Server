import express from "express";
import {
  addUserController,
  loginUserController,
  logoutUserController,
  verifyUserController,
} from "./controllers/user.controller.js";
import {
  addBlogController,
  getAllBlogsByUserIdController,
  getAllBlogsController,
  getBlogByIdController,
  removeBlogByIdController,
  updateBlogByIdController,
} from "./controllers/blog.controller.js";
import { isUser } from "./middlewares/auth.js";

const router = express.Router();

// User Routes
router.post("/user/login", loginUserController);
router.post("/user/add-user", addUserController);
router.post("/user/verify-user", verifyUserController);
router.post("/user/logout", logoutUserController);

// Blog Routes
router.post("/blog/add-blog", isUser, addBlogController);
router.get("/blog/user-blogs", isUser, getAllBlogsByUserIdController);
router.get("/blog/:id", getBlogByIdController);
router.get("/blog", getAllBlogsController);
router.delete("/blog/:id", isUser, removeBlogByIdController);
router.patch("/blog/:id", isUser, updateBlogByIdController);

export default router;

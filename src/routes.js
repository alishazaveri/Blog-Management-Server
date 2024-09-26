import express from "express";
import {
  addUserController,
  loginUserController,
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

// Blog Routes
router.post("/blog/add-blog", isUser, addBlogController);
router.get("/blog/user-blogs", isUser, getAllBlogsByUserIdController);
router.get("/blog/:id", getBlogByIdController);
router.get("/blog", getAllBlogsController);
router.delete("/blog/:id", isUser, removeBlogByIdController);
router.patch("/blog/:id", isUser, updateBlogByIdController);

export default router;

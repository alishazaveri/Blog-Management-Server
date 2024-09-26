import Joi from "joi";
import { blogsDb } from "../db/index.js";

export async function getAllBlogs() {
  try {
    const blogs = await blogsDb.getAllBlogs();

    return { data: blogs };
  } catch (error) {
    console.log("Get All Blogs Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }
}

import Joi from "joi";
import { blogsDb } from "../db/index.js";

export async function getAllBlogs({ page, pageSize }) {
  try {
    const { blogs, totalCount } = await blogsDb.getAllBlogs({ page, pageSize });

    return { data: blogs, totalCount };
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

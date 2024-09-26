import Joi from "joi";
import { blogsDb } from "../db/index.js";
import { statusContants } from "../constants/status.constant.js";

export async function getAllBlogsByUserId({ userId }) {
  try {
    validateInput({ userId });

    const blogs = await blogsDb.getAllBlogsByUserId({ userId });

    return { data: blogs };
  } catch (error) {
    console.log("Get All Blogs By User Id Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ userId }) {
    const schema = Joi.object({
      userId: Joi.string().required(),
    });

    const { error } = schema.validate({ userId });
    if (error) {
      return {
        error: {
          statusCode: statusContants.HTTP_RESPONSE_FORBIDDEN,
          message: error.message,
        },
      };
    }
  }
}

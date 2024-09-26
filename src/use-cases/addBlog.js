import Joi from "joi";
import { blogsDb } from "../db/index.js";
import { statusContants } from "../constants/status.constant.js";

export async function addBlog({ blogImageUrl, title, description, userId }) {
  try {
    validateInput({ blogImageUrl, title, description, userId });

    const blog = await blogsDb.addBlog({
      blogImageUrl,
      title,
      description,
      userId,
    });

    return { data: blog };
  } catch (error) {
    console.log("Add Blog Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ blogImageUrl, title, description, userId }) {
    const schema = Joi.object({
      blogImageUrl: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      userId: Joi.string().required(),
    });

    const { error } = schema.validate({
      blogImageUrl,
      title,
      description,
      userId,
    });
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

import Joi from "joi";
import { blogsDb } from "../db/index.js";
import { statusContants } from "../constants/status.constant.js";

export async function removeBlogById({ id, userId }) {
  try {
    validateInput({ id, userId });

    const blog = await blogsDb.removeBlogById({ id, userId });

    if (!blog) {
      return {
        error: {
          statusCode: statusContants.HTTP_RESPONSE_FORBIDDEN,
          message: "You are not authorized",
        },
      };
    }

    return { data: blog };
  } catch (error) {
    console.log("Remove Blog By Id Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ id, userId }) {
    const schema = Joi.object({
      id: Joi.string().required(),
      userId: Joi.string().required(),
    });

    const { error } = schema.validate({ id, userId });
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

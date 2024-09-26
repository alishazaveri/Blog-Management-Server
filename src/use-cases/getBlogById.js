import Joi from "joi";
import { blogsDb } from "../db/index.js";
import { statusContants } from "../constants/status.constant.js";

export async function getBlogById({ id }) {
  try {
    validateInput({ id });

    const blog = await blogsDb.getBlogById({ id });

    return { data: blog };
  } catch (error) {
    console.log("Get Blog By Id Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate({ id });
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

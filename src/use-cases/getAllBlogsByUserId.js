import Joi from "joi";
import { blogsDb } from "../db/index.js";
import { statusContants } from "../constants/status.constant.js";

export async function getAllBlogsByUserId({ userId, page, pageSize }) {
  try {
    validateInput({ userId, page, pageSize });

    const { blogs, totalCount } = await blogsDb.getAllBlogsByUserId({
      userId,
      page,
      pageSize,
    });

    return { data: blogs, totalCount };
  } catch (error) {
    console.log("Get All Blogs By User Id Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ userId, page, pageSize }) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      page: Joi.string(),
      pageSize: Joi.string(),
    });

    const { error } = schema.validate({ userId, page, pageSize });
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

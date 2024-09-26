import Joi from "joi";
import { blogsDb } from "../db/index.js";
import { statusContants } from "../constants/status.constant.js";

export async function updateBlogById({
  id,
  blogImageUrl,
  title,
  description,
  userId,
}) {
  try {
    validateInput({ id, blogImageUrl, title, description, userId });

    let updatedInfo = { blogImageUrl, title, description, userId };

    Object.keys(updatedInfo).forEach((key) => {
      if (
        !updatedInfo[key] ||
        updatedInfo[key] === undefined ||
        updatedInfo[key] === null
      ) {
        delete updatedInfo[key];
      }
    });

    const blog = await blogsDb.updateBlogById({ id, updatedInfo, userId });

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
    console.log("Update Blog By Id Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ id, blogImageUrl, title, description, userId }) {
    const schema = Joi.object({
      id: Joi.string().required(),
      blogImageUrl: Joi.string(),
      title: Joi.string(),
      description: Joi.string(),
      userId: Joi.string().required(),
    });

    const { error } = schema.validate({
      id,
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

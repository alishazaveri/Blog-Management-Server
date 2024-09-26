import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { statusContants } from "../constants/status.constant.js";
import { usersDb } from "../db/index.js";

export async function verifyUser({ token }) {
  try {
    validateInput({ token });

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (user && user._id) {
      return { data: user };
    }

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_FORBIDDEN,
        message: error.message,
      },
    };
  } catch (error) {
    console.log("Verify User Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ token }) {
    const schema = Joi.object({
      token: Joi.string().required(),
    });

    const { error } = schema.validate({ token });
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

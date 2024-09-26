import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { statusContants } from "../constants/status.constant.js";
import { usersDb } from "../db/index.js";

export async function loginUser({ emailId, password }) {
  try {
    validateInput({ emailId, password });

    const user = await usersDb.getUserByEmailId({ emailId });

    if (user && user._id) {
      const isCorrectPassword = bcrypt.compare(
        user.password,
        process.env.HASH_SALT
      );

      if (isCorrectPassword) {
        delete user.password;

        const token = jwt.sign(
          { _id: user._id, username: user.username, emailId: user.emailId },
          process.env.JWT_SECRET_KEY
        );

        return { data: token };
      } else {
        return {
          error: {
            statusCode: statusContants.HTTP_RESPONSE_FORBIDDEN,
            message: "Invalid username or password",
          },
        };
      }
    } else {
      return {
        error: {
          statusCode: statusContants.HTTP_RESPONSE_FORBIDDEN,
          message: "Invalid username or password",
        },
      };
    }
  } catch (error) {
    console.log("Login User Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ emailId, password }) {
    const schema = Joi.object({
      emailId: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ emailId, password });
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

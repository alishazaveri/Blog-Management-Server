import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { statusContants } from "../constants/status.constant.js";
import { usersDb } from "../db/index.js";

export async function addUser({ username, imageUrl, emailId, password }) {
  try {
    validateInput({ username, imageUrl, emailId, password });

    const user = await usersDb.getUserByEmailId({ emailId });

    if (!user) {
      const salt = await bcrypt.genSalt(+process.env.HASH_SALT);
      const hashedPassword = await bcrypt.hash(password, +salt);

      if (hashedPassword) {
        const user = await usersDb.addUser({
          username,
          imageUrl,
          emailId,
          password: hashedPassword,
        });
        delete user.password;

        const token = jwt.sign(
          { _id: user._id, username: user.username, emailId: user.emailId },
          process.env.JWT_SECRET_KEY
        );

        return { data: token };
      }
    } else {
      return {
        error: {
          statusCode: statusContants.HTTP_RESPONSE_FORBIDDEN,
          message: "User already exist with this emailId",
        },
      };
    }
  } catch (error) {
    console.log("Add User Error ", error);

    return {
      error: {
        statusCode: statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    };
  }

  function validateInput({ username, imageUrl, emailId, password }) {
    const schema = Joi.object({
      username: Joi.string().required(),
      imageUrl: Joi.string().required(),
      emailId: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({
      username,
      imageUrl,
      emailId,
      password,
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

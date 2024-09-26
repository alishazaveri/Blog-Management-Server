import Joi from "joi";
import { statusContants } from "../constants/status.constant.js";
import { loginUser } from "../use-cases/loginUser.js";
import { addUser } from "../use-cases/addUser.js";
import { verifyUser } from "../use-cases/verifyUser.js";

export async function verifyUserController(req, res) {
  try {
    const { token } = req.body;

    validateInput({ token });

    const { data, error } = await verifyUser({ token });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(statusContants.HTTP_RESPONSE_OK).json({ data });
  } catch (error) {
    console.log("Verify User Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }

  function validateInput({ token }) {
    const schema = Joi.object({
      token: Joi.string().required(),
    });

    const { error } = schema.validate({ token });
    if (error) {
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}

export async function loginUserController(req, res) {
  try {
    const { emailId, password } = req.body;

    validateInput({ emailId, password });

    const { data, error } = await loginUser({ emailId, password });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res
      .cookie("accessToken", data)
      .status(statusContants.HTTP_RESPONSE_OK)
      .json({ data });
  } catch (error) {
    console.log("Login User Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }

  function validateInput({ emailId, password }) {
    const schema = Joi.object({
      emailId: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ emailId, password });
    if (error) {
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}

export async function logoutUserController(req, res) {
  try {
    return res
      .clearCookie("accessToken")
      .status(statusContants.HTTP_RESPONSE_OK)
      .json({ data: "User logged out" });
  } catch (error) {
    console.log("Logout User Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

export async function addUserController(req, res) {
  try {
    const { username, imageUrl, emailId, password } = req.body;

    validateInput({ username, imageUrl, emailId, password });

    const { data, error } = await addUser({
      username,
      imageUrl,
      emailId,
      password,
    });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res
      .cookie("accessToken", data)
      .status(statusContants.HTTP_RESPONSE_OK)
      .json({ data });
  } catch (error) {
    console.log("Add User Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
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
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}

import { statusContants } from "../constants/status.constant.js";
import jwt from "jsonwebtoken";

export async function isUser(req, res, next) {
  try {
    const { accessToken } = req.cookies;

    if (accessToken) {
      const user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

      if (user && user._id) {
        req.user = user;
        return next();
      }
    }

    return res
      .status(statusContants.HTTP_RESPONSE_UNAUTHORIZED)
      .json({ error: "You are not authorized" });
  } catch (e) {
    return res
      .status(statusContants.HTTP_RESPONSE_UNAUTHORIZED)
      .json({ error: "You are not authorized" });
  }
}

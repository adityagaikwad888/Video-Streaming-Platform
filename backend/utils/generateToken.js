import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

const generator = (id, res) => {
  const token = jwt.sign({ id }, ENV_VARS.JWT_SECRET, {
    expiresIn: "3h",
  });

  res.cookie("jwt-vid", token, {
    maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    httpOnly: true, // This pervients the cookie from being accessed by javascript
    sameSite: "strict", // This pervients CSRF attacks by not allowing the cookie to be sent by a third party
    secure: ENV_VARS.NODE_ENV !== "devemopment", // This pervients the cookie from being sent over http
  });

  return token;
};

export default generator;

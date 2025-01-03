import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

const protectRoute = async (req, res, next) => {
  // next is a function that moves to the next middleware
  try {
    const token = req.cookies["jwt-vid"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No Token Found",
      });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized - User Not Found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

export { protectRoute };

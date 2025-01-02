import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "User with this username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      image: image,
    });

    generateToken(newUser._id, res);
    await newUser.save();
    return res.status(200).json({
      success: true,
      user: {
        ...newUser._doc, // This lines for hiding password in response
        password: undefined,
      },
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "An error occurred while signing up",
    });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      user: {
        ...user._doc, // This lines for hiding password in response
        password: undefined,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-vid"); // Clearing the cookie
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "An error occurred while logging out",
    });
  }
};

export { signup, login, logout };

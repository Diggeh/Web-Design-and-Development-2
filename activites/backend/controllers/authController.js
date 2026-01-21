import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(300).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, role: user.role, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      res.status(200).json({ token, message: "Login successful" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  // Invalidate token logic can be implemented here if using a token blacklist
  res.status(200).json({ message: "Logout successful" });
};

import UserModel from "../models/user.model.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config()
const age = 1 * 24 * 60 * 60;

const CreateJwtToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET, {
    expiresIn: age,
  });
};

export const adminLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
  

      const user = await UserModel.findOne({ username, role: "admin" });
        
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Admin doesn't exist",
        });
      }
      
      console.log(user)

      
      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      
      const token = CreateJwtToken(user._id, user.role); 
      console.log(token)

      
      return res.status(200).json({
        success: true,
        token:token,
        user:user,
        message: "Admin authentication successful",
      });
    } catch (error) {
      
      return res.status(500).json({
        success: false,
        message: "An error occurred during admin authentication",
        error: error.message,
      });
    }

};
  
  export const UserLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User doesn't exist",
        });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      const token = CreateJwtToken(user._id, user.role);
      
      return res.status(200).json({
        success: true,
        user:user,
        token: token,
        message: "Authentication successful",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred during authentication",
        error: error.message,
      });
    }
  };

export const UserRegister = async (req,res) => {
  const { name , email, phoneNo, username, password } = req.body;
  try {
    const User = await UserModel.create({
      name,
      email,
      phoneNo,
      username,
      password,
      role: "User",
    });
    
    res.status(201).json({
      success: true,
      message: "User has been Created Sucessfully ",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Some erorr Occured while Registering the New user",
      error: error.message,
    });
  }
}
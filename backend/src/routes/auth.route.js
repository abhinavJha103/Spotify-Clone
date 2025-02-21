import express from "express"
import {adminLogin,UserLogin,UserRegister} from "../controller/auth.controller.js"

const authRouter = express.Router();

authRouter.post("/admin/login", adminLogin);
authRouter.post("/login", UserLogin );
authRouter.post("/register", UserRegister);


export default authRouter;

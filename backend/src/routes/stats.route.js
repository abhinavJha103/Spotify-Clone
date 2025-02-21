import express from "express"
import { getStats } from "../controller/stats.controller.js";
const statsRouter = express.Router();

statsRouter.get("/", getStats)

export default statsRouter;
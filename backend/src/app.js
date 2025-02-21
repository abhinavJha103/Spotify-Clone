import express from "express"
import dotenv from "dotenv"
import songRouter from "./routes/song.route.js"
import albumRouter from "./routes/album.route.js"
import authRouter from "./routes/auth.route.js"
import statsRouter from "./routes/stats.route.js"
import ConnectDb from "./utils/connectDb.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors"


dotenv.config()
const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(cors())

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/albums", albumRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/songs",songRouter);
app.use("/api/v1/stats",statsRouter); 


app.listen(port,() => {
    console.log("Server Listening on Port :  ", port)
    ConnectDb();
})

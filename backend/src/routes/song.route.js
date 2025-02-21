import express from "express"
import { addSong, deleteSong, updateSong, getAllSongs , getFeaturedSongs , getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
const songRouter = express.Router();

songRouter.post("/",addSong);
songRouter.get("/",getAllSongs)
songRouter.delete("/:id",deleteSong);
songRouter.put("/:id",updateSong)

songRouter.get("/featured",getFeaturedSongs);
songRouter.get("/made-for-you",getMadeForYouSongs);
songRouter.get("/trending",getTrendingSongs);


export default songRouter;
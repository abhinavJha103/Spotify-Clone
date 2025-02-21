import express from "express"
import { getAllAlbums, addAlbum, deleteAlbum, updateAlbum , getAlbum} from "../controller/album.controller.js";
const albumRouter = express.Router();

albumRouter.get("/",getAllAlbums)
albumRouter.get("/:id", getAlbum)
albumRouter.post("/",addAlbum);
albumRouter.delete("/:id",deleteAlbum);
albumRouter.put("/:id", updateAlbum)

export default albumRouter;
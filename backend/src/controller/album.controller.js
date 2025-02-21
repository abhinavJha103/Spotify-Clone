import Album from '../models/album.model.js';
import { v2 as cloudinary } from 'cloudinary';
import Song from "../models/song.model.js"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('songs').sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums', error: error.message });
  }
};

export const addAlbum = async (req, res) => {
  try {
    const { title, artist, coverImageUrl, releaseDate } = req.body;
    
    const album = new Album({
      title,
      artist,
      coverImageUrl,
      releaseDate: new Date(releaseDate),
      songs: []  
    });

    await album.save();
    res.status(201).json({ message: 'Album added successfully', album });
  } catch (error) {
    res.status(500).json({ message: 'Error adding album', error: error.message });
  }
};


export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find album first to check if it exists
    const album = await Album.findById(id);
    
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    // Delete all songs associated with this album
    await Song.updateMany(
      { albumId: id },
      { $unset: { albumId: "" } }
    );

    // Delete the album
    await Album.deleteOne({ _id: id });
    
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting album', error: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const album = await Album.findByIdAndUpdate(id, updates, { new: true })
      .populate('songs');  // Populate songs after update
    
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.json({ message: 'Album updated successfully', album });
  } catch (error) {
    res.status(500).json({ message: 'Error updating album', error: error.message });
  }
};
export const getAlbum = async (req,res) => {
  
  try {
    const {id} = req.params;
    const album  = await Album.findById(id).populate("songs");
    if(!album) {
      return res.status(400).json("Album not found")
    }
    res.status(200).json(album);
  } catch (error) {
    console.log("Some error occured while fetching a specific album id")
  }
}

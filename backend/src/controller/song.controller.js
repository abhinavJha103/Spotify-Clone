import Song from '../models/song.model.js';
import { v2 as cloudinary } from 'cloudinary';
import Album from '../models/album.model.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find() .populate('albumId').sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
};

export const addSong = async (req, res) => {
  try {
    const { title, artist, audioUrl, coverImageUrl, duration, albumId } = req.body;

    // Create new song
    const song = new Song({
      title,
      artist,
      audioUrl,
      coverImageUrl,
      releaseDate: new Date(),
      duration,
      albumId
    });

    // Save the song
    await song.save();

   
    if (albumId) {
      await Album.findByIdAndUpdate(
        albumId,
        { $push: { songs: song._id } },
        { new: true }
      );
    }

    res.status(201).json({ message: 'Song added successfully', song });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error: error.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First find the song to get its albumId
    const song = await Song.findById(id);
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // If song belongs to an album, remove it from album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(
        song.albumId,
        { $pull: { songs: id } }
      );
    }
    
    // Delete the song
    await Song.deleteOne({ _id: id });
    
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song', error: error.message });
  }
};

export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const song = await Song.findByIdAndUpdate(id, updates, { new: true });
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json({ message: 'Song updated successfully', song });
  } catch (error) {
    res.status(500).json({ message: 'Error updating song', error: error.message });
  }
};
  
export const getFeaturedSongs = async (req,res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample:{size:6}
      },
      {
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					coverImageUrl: 1,
					audioUrl: 1,
				},
			}
    ]);
    res.status(200).json(songs)

  } catch (error) {
    console.log("error")
  }
}

export const getMadeForYouSongs = async (req,res) => {
  try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					coverImageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		console.log(error )
	}
}

export const getTrendingSongs = async (req,res) => {
  try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					coverImageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		console.log(error);

	}
}
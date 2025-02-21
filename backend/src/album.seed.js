import mongoose from "mongoose";
import  Song  from "./models/song.model.js";
import  Album  from "./models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.URI);

		
		await Album.deleteMany({});
		await Song.deleteMany({});

		
		const createdSongs = await Song.insertMany([
			{
				title: "Saibo",
				artist: " Shreya Ghoshal ,Sachin Jigar ,Tochi Raina",
				coverImageUrl: "downloads/image.png",
				audioUrl: "downloads/song.mp3",
				duration: 197, 
			},
            {
				title: "Shor",
				artist: "Mohan",
				coverImageUrl: "downloads/image2.png",
				audioUrl: "downloads/song2.mp3",
				duration: 248, 
			},

			
		]);

		
		const albums = [
			{
				title: "Shor in the City",
				artist: "Various Artists",
				coverImageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 2).map((song) => song._id),
			},
			
		];

		
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} 
};

seedDatabase();
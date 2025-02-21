import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  coverImageUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: false,
  },
});

const SongModel =  mongoose.model('Song', songSchema);
export default SongModel;


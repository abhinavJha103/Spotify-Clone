import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
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
  coverImageUrl: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AlbumModel =  mongoose.model('Album', albumSchema);
export default AlbumModel;


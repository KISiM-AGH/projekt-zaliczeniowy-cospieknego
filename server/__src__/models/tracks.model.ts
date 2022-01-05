import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    popularity: Number,
    explicit: {
        type: Boolean,
        required: false,
        default: false,
    },
    duration: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: false,
        default: 'track',
    },
    uri: String,
    // album: ObjectId,
    //artists: [artistSchema],
    track_number: Number,
});

export default mongoose.model('Tracks', trackSchema);

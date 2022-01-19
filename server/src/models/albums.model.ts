import { Schema } from 'mongoose';

const TYPES = ['album', 'single', 'compilation'];

const albumSchema = new Schema({
    album_type: {
        type: String,
        enum: TYPES,
        required: true,
    },
    total_tracks: Number,
    name: String,
    release_date: String,
    release_date_precision: String,
    popularity: Number,
    type: {
        type: String,
        default: 'user',
    },
    images: [
        {
            url: String,
            height: Number,
            width: Number,
        },
    ],
    artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
});

albumSchema.virtual('uri').get(function () {
    return `spotify:${this.type}:${this._id}`;
});

albumSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

albumSchema.set('toObject', { virtuals: true });
albumSchema.set('toJSON', { virtuals: true });

export default albumSchema;

import { Schema } from 'mongoose';

const trackSchema: Schema = new Schema({
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
        default: 'track',
    },
    track_number: Number,
    album: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
    artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
});

trackSchema.virtual('uri').get(function () {
    return `spotify:${this.type}:${this._id}`;
});

trackSchema.method('toObject', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

trackSchema.set('toObject', { virtuals: true });
trackSchema.set('toJSON', { virtuals: true });

export default trackSchema;

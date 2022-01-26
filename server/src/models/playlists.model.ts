import { Schema } from 'mongoose';

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'playlist',
    },
    public: {
        type: Boolean,
        default: true,
    },
    collaborative: {
        type: Boolean,
        default: false,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    followers: {
        href: String,
        total: Number,
    },
    images: [
        {
            url: String,
            height: Number,
            width: Number,
        },
    ],
});

playlistSchema.virtual('uri').get(function () {
    return `spotify:${this.type}:${this._id}`;
});

playlistSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

playlistSchema.set('toObject', { virtuals: true });
playlistSchema.set('toJSON', { virtuals: true });

export default playlistSchema;

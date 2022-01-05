import { Schema } from 'mongoose';

const artistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'artist',
    },
    popularity: Number,
    followers: {
        total: Number,
        default: 0,
    },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    images: [
        {
            url: String,
            height: Number,
            width: Number,
        },
    ],
});

artistSchema.virtual('uri').get(function () {
    return `spotify:${this.type}:${this._id}`;
});

artistSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

artistSchema.set('toJSON', { virtuals: true });
artistSchema.set('toObject', { virtuals: true });

export default artistSchema;

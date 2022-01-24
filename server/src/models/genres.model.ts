import { Schema } from 'mongoose';

const genreSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'genre',
    },
    href: String,
    color: String,
    images: [
        {
            url: String,
        },
    ],
});

genreSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

genreSchema.set('toJSON', { virtuals: true });

export default genreSchema;

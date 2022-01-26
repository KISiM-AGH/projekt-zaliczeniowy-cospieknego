import { Schema } from 'mongoose';
import Episode from './episodes.model';

const showSchema = new Schema({
    name: String,
    publisher: String,
    description: String,
    html_description: String,
    languages: [String],
    available_markets: [String],
    copyright: [
        {
            text: String,
            type: String,
        },
    ],
    explicit: {
        type: Boolean,
        default: false,
    },
    images: [
        {
            url: String,
            height: Number,
            width: Number,
        },
    ],
    type: {
        type: String,
        default: 'show',
    },
    episodes: [Episode],
});

showSchema.virtual('uri').get(function () {
    return `spotify:${this.type}:${this._id}`;
});

showSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

showSchema.set('toObject', { virtuals: true });
showSchema.set('toJSON', { virtuals: true });

export default showSchema;

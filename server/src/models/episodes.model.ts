import { Schema } from 'mongoose';

const episodeSchema = new Schema({
    audio_preview_url: String,
    description: String,
    html_description: String,
    duration_ms: Number,
    name: String,
    release_date: String,
    release_date_precision: String,
    language: String,
    languages: [String],
    available_markets: [String],
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
        default: 'episode',
    },
});

episodeSchema.virtual('uri').get(function () {
    return `spotify:${this.type}:${this._id}`;
});

episodeSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

episodeSchema.set('toObject', { virtuals: true });
episodeSchema.set('toJSON', { virtuals: true });

export default episodeSchema;

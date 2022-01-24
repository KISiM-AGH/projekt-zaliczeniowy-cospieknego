import { Schema } from 'mongoose';

const PLANS = ['premium', 'free'];
const GENDERS = ['male', 'female', 'non-binary'];

const userSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
        },
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Password is required'],
        },
        gender: {
            type: String,
            enum: GENDERS,
            required: true,
        },
        birth_date: {
            type: String,
            required: true,
        },
        send_newsletter: {
            type: Boolean,
            default: false,
        },
        product: {
            type: String,
            enum: PLANS,
            default: 'free',
        },
        signup_date: {
            type: Date,
            default: Date.now(),
        },
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
        saved: {
            shows: [{ type: Schema.Types.ObjectId, ref: 'Show' }],
            tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
            albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
            artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
            playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
        },
    },
    { versionKey: false }
);

userSchema.virtual('uri').get(function () {
    return `spotify:${this.type}:${this._id}`;
});

userSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: false });

export default userSchema;

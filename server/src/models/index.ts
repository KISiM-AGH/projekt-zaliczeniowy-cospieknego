import mongoose from 'mongoose';
import trackSchema from './tracks.model';
import albumSchema from './albums.model';
import artistSchema from './artists.model';
import userSchema from './users.model';

export const Track = mongoose.model('Track', trackSchema);
export const Album = mongoose.model('Album', albumSchema);
export const Artist = mongoose.model('Artist', artistSchema);
export const User = mongoose.model('User', userSchema);

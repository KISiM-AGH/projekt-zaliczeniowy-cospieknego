import mongoose from 'mongoose';
import userSchema from './users.model';
import trackSchema from './tracks.model';
import albumSchema from './albums.model';
import artistSchema from './artists.model';
import playlistSchema from './playlists.model';

export const Playlist = mongoose.model('Playlist', playlistSchema);
export const Artist = mongoose.model('Artist', artistSchema);
export const Album = mongoose.model('Album', albumSchema);
export const Track = mongoose.model('Track', trackSchema);
export const User = mongoose.model('User', userSchema);

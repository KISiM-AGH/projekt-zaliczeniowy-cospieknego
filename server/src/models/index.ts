import mongoose from 'mongoose';
import showSchema from './shows.model';
import userSchema from './users.model';
import trackSchema from './tracks.model';
import albumSchema from './albums.model';
import artistSchema from './artists.model';
import episodeSchema from './episodes.model';
import playlistSchema from './playlists.model';

export const Playlist = mongoose.model('Playlist', playlistSchema);
export const Episode = mongoose.model('Episode', episodeSchema);
export const Artist = mongoose.model('Artist', artistSchema);
export const Album = mongoose.model('Album', albumSchema);
export const Track = mongoose.model('Track', trackSchema);
export const User = mongoose.model('User', userSchema);
export const Show = mongoose.model('Show', showSchema);

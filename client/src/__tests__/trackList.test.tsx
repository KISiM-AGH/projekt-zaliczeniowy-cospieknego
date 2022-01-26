import { render } from '@testing-library/react';
import { TrackList } from '../components';

describe('<TrackList/>', () => {
    it('renders a data grid with list of tracks', () => {
        const tracks = [
            {
                title: 'Master of Puppets',
                artist: 'Metallica',
                artist_slug: 'metallica',
                album: 'Master of Puppets',
                album_slug: 'master-of-puppets',
                duration: 516,
                is_explicit: false,
                audio_url:
                    './audio/tracks/master-of-puppets/master-of-puppets.wav',
            },
            {
                title: 'Numb',
                artist: 'Linkin Park',
                artist_slug: 'linkin-park',
                album: 'Meteora',
                album_slug: 'meteora',
                duration: 190,
                is_explicit: false,
                audio_url: './audio/tracks/meteora/numb.wav',
            },
        ];
        render(<TrackList tracks={tracks} />);
    });
});

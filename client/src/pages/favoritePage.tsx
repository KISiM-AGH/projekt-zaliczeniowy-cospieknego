import { ReactElement } from 'react';
import { Tracklist } from '../components';
import useContent from '../hooks/useContent';

export default function FavoritePage(): ReactElement {
    const favoriteTracks = useContent('tracks'); // favorite/favourite

    return <Tracklist tracks={favoriteTracks} />;
}

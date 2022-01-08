import { ReactElement } from 'react';
import { Tracklist } from '../components';
import useContent from '../hooks/useContent';
import ITrack from '../interfaces/track.interface';

export default function FavoritePage(): ReactElement {
    const favoriteTracks = useContent('tracks') as ITrack[];

    return <Tracklist tracks={favoriteTracks} />;
}

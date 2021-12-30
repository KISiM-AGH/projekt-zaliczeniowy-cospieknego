import { ReactElement } from 'react';
import useContent from '../hooks/useContent';
import selectionFilter from '../utils/selectionFilter';
import CollectionContainer from '../containers/collection';

export default function Collection(): ReactElement {
    const albums = useContent('albums');
    const playlists = useContent('tracks');
    const podcasts = useContent('tracks');
    const artists = useContent('tracks');
    const slides = selectionFilter({
        albums,
        playlists,
        podcasts,
        artists,
    });

    return <CollectionContainer slides={slides} />;
}

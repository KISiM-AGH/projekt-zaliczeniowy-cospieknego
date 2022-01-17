import { ReactElement } from 'react';
import { ResultsContainer } from '../containers';
import selectionFilter from '../utils/selectionFilter';
import useContent from '../hooks/useContent';

export default function CollectionPage(): ReactElement {
    const albums = useContent('albums');
    const playlists = useContent('playlists');
    const podcasts = useContent('tracks');
    const artists = useContent('artists');
    const slides = selectionFilter({
        albums,
        playlists,
        podcasts,
        artists,
    });

    return <ResultsContainer slides={slides} />;
}

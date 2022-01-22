import { ReactElement } from 'react';
import { ResultsContainer } from '../containers';
import selectionFilter from '../utils/selectionFilter';
import useContent from '../hooks/useContent';

export default function CollectionPage(): ReactElement {
    const albums = useContent('me/albums');
    const playlists = useContent('me/playlists');
    const podcasts = useContent('me/shows');
    const artists = useContent('me/following');
    const slides = selectionFilter({
        albums,
        playlists,
        podcasts,
        artists,
    });

    return <ResultsContainer slides={slides} />;
}

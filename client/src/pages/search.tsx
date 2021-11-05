import { ReactElement } from 'react';
import useContent from '../hooks/useContent';
import selectionFilter from '../utils/selectionFilter';

export default function Search(props: {}): ReactElement {
    const albums = useContent('tracks');
    const playlists = useContent('tracks');
    const podcasts = useContent('tracks');
    const artists = useContent('tracks');
    const slides = selectionFilter({
        albums,
        playlists,
        podcasts,
        artists,
    });

    return <div>SEARCH PAGE</div>;
}

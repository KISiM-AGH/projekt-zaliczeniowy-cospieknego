import { ReactElement } from 'react';
import { ResultsContainer } from '../containers';
import selectionFilter from '../utils/selectionFilter';
import useContent from '../hooks/useContent';

export default function ShowAllPage({
    category,
}: {
    category: 'albums' | 'playlists' | 'podcasts' | 'artists' | 'tracks';
}): ReactElement {
    const albums = useContent(category);
    const slides = selectionFilter({
        albums,
    });

    return <ResultsContainer slides={slides} type={category} />;
}

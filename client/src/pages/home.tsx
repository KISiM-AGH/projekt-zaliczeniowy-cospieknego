import { ReactElement } from 'react';
import HomeContainer from '../containers/home';
import useContent from '../hooks/useContent';
import featureFilter from '../utils/featureFilter';

export default function Home(props: {}): ReactElement {
    const songs = useContent('tracks');
    const albums = useContent('tracks');
    const artists = useContent('tracks');
    const slides = featureFilter({
        songs,
        albums,
        artists,
    });

    return <HomeContainer slides={slides} />;
}

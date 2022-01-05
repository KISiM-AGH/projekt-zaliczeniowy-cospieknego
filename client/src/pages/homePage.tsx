import { ReactElement } from 'react';
import HomeContainer from '../containers/homeLayout';
import useContent from '../hooks/useContent';
import featureFilter from '../utils/featureFilter';

export default function HomePage(): ReactElement {
    const tracks = useContent('tracks');
    const albums = useContent('tracks');
    const artists = useContent('tracks');
    const slides = featureFilter({
        tracks,
        albums,
        artists,
    });

    console.log(slides);

    if (!slides) {
        return <div>Loading...</div>;
    }

    return <HomeContainer slides={slides} />;
}

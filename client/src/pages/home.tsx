import { useState, useEffect, ReactElement } from 'react';
import HomeContainer from '../containers/home';
import useContent from '../hooks/useContent';
import featureFilter from '../utils/featureFilter';

export default function Home(props: {}): ReactElement {
    const songs = useContent('songs');
    const albums = useContent('songs');
    const artists = useContent('songs');
    const slides = featureFilter({
        songs,
        albums,
        artists,
    });

    return <HomeContainer slides={slides} />;
}

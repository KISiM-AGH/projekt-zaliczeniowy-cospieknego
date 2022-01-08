import { useState, useEffect, ReactElement, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';
import { FeatureCard } from '../components';
import useContent from '../hooks/useContent';
import selectionFilter from '../utils/selectionFilter';
import IAlbum from '../interfaces/album.interface';
import IArtist from '../interfaces/artist.interface';
import IPlaylist from '../interfaces/playlist.interface';
import IPodcast from '../interfaces/podcast.interface';

interface IProps {
    slides: {
        [key: string]: {
            title: string;
            data: any;
        }[];
    };
}

export default function CollectionPage(): ReactElement {
    const albums = useContent('albums');
    const playlists = useContent('tracks');
    const podcasts = useContent('tracks');
    const artists = useContent('artists');
    const slides = selectionFilter({
        albums,
        playlists,
        podcasts,
        artists,
    });

    return <CollectionContainer slides={slides} />;
}

function CollectionContainer({ slides }: IProps): ReactElement {
    const [category, setCategory] = useState('albums');
    const location = useLocation();

    useEffect(() => {
        setCategory(location.pathname.split('/')[2]);
    }, [location.pathname]);

    return slides && slides[category] ? (
        <>
            {slides[category].map((slide: { title: string; data: [] }) => (
                <Fragment key={slide.title}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'self-end',
                            width: '100%',
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant='h5'
                            component='h2'
                            color='textPrimary'
                            sx={{ flexGrow: 1 }}
                        >
                            {slide.title}
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {category === 'albums' &&
                            slide.data.map((data: IAlbum, i) => (
                                <FeatureCard
                                    key={i}
                                    href={`/${data.type}/${data.id}`}
                                    title={data.name}
                                    artists={data.artists}
                                    image={data.images[0]}
                                />
                            ))}
                        {category === 'playlists' &&
                            slide.data.map((data: IPlaylist, i) => (
                                <FeatureCard
                                    key={i}
                                    href={'TBA'}
                                    title={'TBA'}
                                    subtitle={'TBA'}
                                    image={{
                                        url: 'TBA',
                                        width: 160,
                                        height: 160,
                                    }}
                                />
                            ))}
                        {category === 'podcasts' &&
                            slide.data.map((data: IPodcast, i) => (
                                <FeatureCard
                                    key={i}
                                    href={'TBA'}
                                    title={'TBA'}
                                    subtitle={'TBA'}
                                    image={{
                                        url: 'TBA',
                                        width: 160,
                                        height: 160,
                                    }}
                                />
                            ))}
                        {category === 'artists' &&
                            slide.data.map((data: IArtist, i) => (
                                <FeatureCard
                                    key={i}
                                    href={`/${data.type}/${data.id}`}
                                    title={data.name}
                                    subtitle='Wykonawca'
                                    artist={true}
                                    image={data.images[1]}
                                />
                            ))}
                    </Grid>
                </Fragment>
            ))}
        </>
    ) : (
        <div>No results found</div>
    );
}

import { useState, useEffect, ReactElement, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';
import { TrackCard } from '../components';
import useContent from '../hooks/useContent';
import selectionFilter from '../utils/selectionFilter';

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
    const artists = useContent('tracks');
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
                        {slide.data.map(({ album, artist, album_slug }) => (
                            <Grid
                                item
                                xs={8}
                                sm={4}
                                md={2}
                                lg={2}
                                xl={1}
                                key={album}
                            >
                                <TrackCard
                                    title={album}
                                    subtitle={artist}
                                    slug={album_slug}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Fragment>
            ))}
        </>
    ) : (
        <div>No results found</div>
    );
}

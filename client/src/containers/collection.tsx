import { useState, useEffect, ReactElement, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';
import { SongCard } from '../components';

interface IProps {
    slides: {
        [key: string]: { title: string; data: [] }[];
    };
}

export default function CollectionContainer({ slides }: IProps): ReactElement {
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
                        {slide.data.map(({ name, artist, slug }) => (
                            <Grid
                                item
                                xs={12}
                                sm={5}
                                md={4}
                                lg={3}
                                xl={2}
                                key={name}
                            >
                                <SongCard
                                    title={name}
                                    subtitle={artist}
                                    slug={slug}
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

import { useState, useEffect, ReactElement, Fragment } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SongCard from '../components/songCard';

interface IProps {
    [key: string]: { title: string; data: [] | undefined }[];
}

export default function HomeContainer({ slides }: IProps): ReactElement {
    const [slideRows, setSlideRows] = useState<any>([]);

    useEffect(() => {
        setSlideRows(slides);
    }, [slides]);

    return (
        <>
            {slideRows.map((slide: { title: string; data: [] }) => (
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
                        {slide.data.length > 6 && (
                            <Typography variant='button' color='textSecondary'>
                                POKAŻ WSZYSTKO
                            </Typography>
                        )}
                    </Box>
                    <Grid container spacing={3}>
                        {slide.data.map(({ title, artist, slug }) => (
                            <Grid
                                item
                                xs={8}
                                sm={4}
                                md={2}
                                lg={2}
                                xl={1}
                                key={title}
                            >
                                <SongCard
                                    title={title}
                                    subtitle={artist}
                                    slug={slug}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Fragment>
            ))}
        </>
    );
}

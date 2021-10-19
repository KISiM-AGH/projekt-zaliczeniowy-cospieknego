import { useState, useEffect, ReactElement, Fragment } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SongCard from '../components/songCard';

interface IProps {
    slides: any; // CHANGE
}

export default function HomeContainer({ slides }: IProps): ReactElement {
    const [slideRows, setSlideRows] = useState<any>([]);

    useEffect(() => {
        setSlideRows(slides);
    }, [slides]);

    return (
        <>
            {slideRows.map((slide: any) => (
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
                        {slide.data.map((item: any) => (
                            <SongCard key={item.title} song={item} />
                        ))}
                    </Grid>
                </Fragment>
            ))}

            {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'self-end',
                    width: '100%',
                    mt: 6,
                    mb: 2,
                }}
            >
                <Typography
                    variant='h5'
                    component='h2'
                    color='textPrimary'
                    sx={{ flexGrow: 1 }}
                >
                    Najpopularniejsze 2020 roku
                </Typography>
                <Typography variant='button' color='textSecondary'>
                    POKAŻ WSZYSTKO
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {content['songs'].map((song) => (
                    <SongCard key={song['title']} song={song} />
                ))}
            </Grid> */}
        </>
    );
}

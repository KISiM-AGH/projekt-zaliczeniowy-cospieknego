import { ReactElement } from 'react';
import { Grid, Box, Skeleton, Typography } from '@mui/material';
import { GenreCard, Loader } from '../components';
import useContent from '../hooks/useContent';
import IGenre from '../interfaces/genre.interface';

export default function SearchPage(): ReactElement {
    const genres = useContent('genres');

    return genres ? (
        <>
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
                    Przeglądaj wszystko
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {genres.map((genre: IGenre) =>
                    genre.name ? (
                        <GenreCard
                            key={genre.id}
                            slug={genre.id}
                            title={genre.name}
                            image={genre.images[0].url}
                            color={genre.color}
                        />
                    ) : (
                        <Skeleton
                            variant='rectangular'
                            width={180}
                            height={180}
                        />
                    )
                )}
            </Grid>
        </>
    ) : (
        <Loader />
    );
}

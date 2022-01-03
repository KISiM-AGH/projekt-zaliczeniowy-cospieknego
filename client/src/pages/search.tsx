import { ReactElement } from 'react';
import { Grid, Box, Skeleton, Typography } from '@mui/material';
import { GenreCard } from '../components';
import useContent from '../hooks/useContent';

export default function Search(): ReactElement {
    const genres = useContent('genres');

    if (!genres) {
        // @TO_CHANGE
        return <div>Loading ...</div>;
    }

    return (
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
                {genres.map(
                    ({
                        name,
                        slug,
                        theme_color,
                    }: {
                        name: string;
                        slug: string;
                        theme_color: string;
                    }) =>
                        name ? (
                            <GenreCard
                                key={name}
                                title={name}
                                slug={slug}
                                themeColor={theme_color}
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
    );
}

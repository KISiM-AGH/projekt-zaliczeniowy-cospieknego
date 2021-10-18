import { useState, useEffect, ReactElement } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SongCard from '../components/songCard';

export default function Home(props: {}): ReactElement {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response: Response = await fetch(
                'http://localhost:8080/api/v1/songs'
            );

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }

            const songs = await response.json();
            setSongs(songs);
        }
        fetchData();
    }, []);

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
                    Ostatnio odtwarzane
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {songs.map((song: any) => (
                    <SongCard key={song.title} song={song} />
                ))}
            </Grid>
            <Box
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
                {songs.map((song) => (
                    <SongCard key={song['title']} song={song} />
                ))}
            </Grid>
        </>
    );
}

import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Link, Stack, Typography } from '@mui/material';
import { Tracklist } from '../components';
import useContent from '../hooks/useContent';
import { TrackIcon } from '../icons';
import ITrack from '../interfaces/track.interface';

export default function FavoritePage(): ReactElement {
    const favoriteTracks = useContent('me/tracks') as ITrack[];

    return favoriteTracks[0]?.name ? (
        <>
            <Helmet>
                <title>Spotify – Polubione utwory</title>
            </Helmet>
            <Tracklist tracks={favoriteTracks} userFavoritesPage={true} />
        </>
    ) : (
        <Stack
            alignItems='center'
            justifyContent='center'
            spacing={3}
            sx={{ width: '100%', height: '100%' }}
        >
            <TrackIcon
                width={64}
                height={64}
                color='primary'
                sx={{
                    width: 64,
                    height: 64,
                }}
            />
            <div>
                <Typography align='center' variant='h4'>
                    Polubione utwory będą widoczne w tym miejscu
                </Typography>
                <Typography align='center' variant='subtitle1'>
                    Zapisuj utwory, dotykając ikony serca.
                </Typography>
            </div>
            <Button variant='contained' component={Link} href='/search'>
                <Typography variant='button'>Znajdź utwory</Typography>
            </Button>
        </Stack>
    );
}

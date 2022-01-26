import { useState, useEffect, ReactElement, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography, Stack, Button, Link } from '@mui/material';
import { FeatureCard } from '../components';
import IAlbum from '../interfaces/album.interface';
import IArtist from '../interfaces/artist.interface';
import IPlaylist from '../interfaces/playlist.interface';
import IPodcast from '../interfaces/podcast.interface';
import { AlbumIcon, ArtistIcon, PlaylistIcon, PodcastIcon } from '../icons';

interface ISlide {
    title: string;
    data: any; // IAlbum[] | IPodcast[] | IArtist[] | IPlaylist[];
}

interface ISlides {
    slides: {
        [key: string]: ISlide[];
    };
    type?: 'albums' | 'artists' | 'playlists' | 'podcasts' | 'tracks';
}

export default function ResultsContainer({
    slides,
    type,
}: ISlides): ReactElement {
    const [category, setCategory] = useState('albums');
    const location = useLocation();

    useEffect(() => {
        const _type = type ? type : location.pathname.split('/')[2];
        setCategory(_type);
    }, [location.pathname, type]);

    const handleClick = () => {
        // create a playlist
    };

    const getContent = (slide: ISlide) => {
        switch (category) {
            case 'playlists':
                return slide.data.length > 0 ? (
                    slide.data.map((data: IPlaylist, index: number) => (
                        <FeatureCard
                            key={index}
                            href={`/playlist/${data.id}`}
                            title={data.name}
                            subtitle={data.description}
                            image={{
                                url: data.images[0].url,
                                width: 160,
                                height: 160,
                            }}
                        />
                    ))
                ) : (
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                        spacing={3}
                        sx={{ width: '100%', height: '100%' }}
                    >
                        <PlaylistIcon
                            width={80}
                            height={81}
                            color='primary'
                            sx={{
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div>
                            <Typography align='center' variant='h4'>
                                Utwórz swoją pierwszą playlistę
                            </Typography>
                            <Typography align='center' variant='subtitle1'>
                                To proste, pomożemy Ci.
                            </Typography>
                        </div>
                        <Button variant='contained' onClick={handleClick}>
                            <Typography variant='button'>
                                Utwórz playlistę
                            </Typography>
                        </Button>
                    </Stack>
                );
            case 'podcasts':
                return slide.data.length > 0 ? (
                    slide.data.map((data: IPodcast, index: number) => (
                        <FeatureCard
                            key={index}
                            href={'TBA'}
                            title={'TBA'}
                            subtitle={'TBA'}
                            image={{
                                url: 'TBA',
                                width: 160,
                                height: 160,
                            }}
                        />
                    ))
                ) : (
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                        spacing={3}
                        sx={{ width: '100%', height: '100%' }}
                    >
                        <PodcastIcon
                            width={1024}
                            height={1024}
                            color='primary'
                            sx={{
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div>
                            <Typography align='center' variant='h4'>
                                Zacznij obserwować pierwszy podcast
                            </Typography>
                            <Typography align='center' variant='subtitle1'>
                                Obserwuj podcasty, które lubisz, dotykając
                                przycisk Obserwuj.
                            </Typography>
                        </div>
                        <Button
                            variant='contained'
                            component={Link}
                            href='/genres/podcasts'
                        >
                            <Typography variant='button'>
                                Znajdź podcasty
                            </Typography>
                        </Button>
                    </Stack>
                );
            case 'artists':
                return slide.data.length > 0 ? (
                    slide.data.map((data: IArtist, index: number) => (
                        <FeatureCard
                            key={index}
                            href={`/${data.type}/${data.id}`}
                            title={data.name}
                            subtitle='Wykonawca'
                            artist={true}
                            image={data.images[0]}
                        />
                    ))
                ) : (
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                        spacing={3}
                        sx={{ width: '100%', height: '100%' }}
                    >
                        <ArtistIcon
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
                                Zacznij obserwować pierwszego wykonawcę
                            </Typography>
                            <Typography align='center' variant='subtitle1'>
                                Obserwuj wykonawców, których lubisz, dotykając
                                przycisku Obserwuj.
                            </Typography>
                        </div>
                        <Button
                            variant='contained'
                            component={Link}
                            href='/search'
                        >
                            <Typography variant='button'>
                                Znajdź wykonawców
                            </Typography>
                        </Button>
                    </Stack>
                );
            default:
            case 'albums':
                return slide.data.length > 0 ? (
                    slide.data.map((data: IAlbum, index: number) => (
                        <FeatureCard
                            key={index}
                            href={`/${data.type}/${data.id}`}
                            title={data.name}
                            artists={data.artists}
                            image={data.images[0]}
                        />
                    ))
                ) : (
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                        spacing={3}
                        sx={{ width: '100%', height: '100%' }}
                    >
                        <AlbumIcon
                            width={52}
                            height={52}
                            color='primary'
                            sx={{
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div>
                            <Typography align='center' variant='h4'>
                                Zacznij obserwować pierwszy album
                            </Typography>
                            <Typography align='center' variant='subtitle1'>
                                Zapisz albumy, dotykając ikony serca.
                            </Typography>
                        </div>
                        <Button
                            variant='contained'
                            component={Link}
                            href='/search'
                        >
                            <Typography variant='button'>
                                Znajdź albumy
                            </Typography>
                        </Button>
                    </Stack>
                );
        }
    };

    return slides ? (
        <>
            {slides[category].map((slide: ISlide) => (
                <Fragment key={slide.title}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'self-end',
                            width: '100%',
                            mb: 2,
                        }}
                    >
                        {slide.data.length > 0 && (
                            <Typography
                                variant='h5'
                                component='h2'
                                color='textPrimary'
                                sx={{ flexGrow: 1 }}
                            >
                                {slide.title}
                            </Typography>
                        )}
                    </Box>
                    <Grid container spacing={3} height='100%'>
                        {getContent(slide)}
                    </Grid>
                </Fragment>
            ))}
        </>
    ) : (
        <div>No results found</div>
    );
}

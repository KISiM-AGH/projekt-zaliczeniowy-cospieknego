import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Button,
    CardMedia,
    Stack,
    styled,
    Typography,
    Link,
    Skeleton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { TracksTable } from '../components';
import useContent from '../hooks/useContent';
import * as RESOURCES from '../constants/resources';

interface IContent {
    name?: string;
    genre?: string;
    description?: string;
    author?: string;
    theme_color?: string;
    tracks: [
        {
            title: string;
            artist: string;
            artist_slug: string;
            album: string;
            album_slug: string;
            duration: number;
            is_explicit: number;
            audio_url: string;
        }
    ];
}

const Background = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'src',
})<{ color?: string; src?: string }>(({ theme, color, src }) => ({
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '30vh',
    minHeight: '270px',
    maxHeight: '320px',
    filter: 'blur(20px)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${src})`,

    '&::after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        opacity: '0.3',
        background: `linear-gradient(0deg, ${theme.palette.background.paper} 0%, ${color} 50%)`,
    },
}));

const Hero = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(3),
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
}));

export default function TracksPage(): ReactElement {
    const location = useLocation();
    const slug = location.pathname.split('/')[2];
    const content = useContent(`genres/${slug}`) as unknown as IContent;
    const { genre, theme_color, tracks } = content;

    const getTracksCount = () => {
        if (tracks) {
            const size = tracks.length;

            if (size === 1) {
                return '1 utwór';
            } else if (size === 2) {
                return '2 utwory';
            } else {
                return `${size} utworów`;
            }
        }
    };

    const getTotalDuration = () => {
        let total: number = 0;
        tracks && tracks.forEach((track) => (total += track.duration));
        const value = (total / 3600).toFixed(2);
        const temp = value.split('.');
        let hours = parseFloat(temp[0]);
        let _minutes = parseFloat(temp[1]);
        let minutes = 0;

        if (_minutes >= 60) {
            const _div = _minutes / 60;
            hours += Math.round(_div);
            minutes = Math.round(_div);
        } else {
            minutes = _minutes;
        }

        return `${hours} godz. ${minutes} min`;
    };

    if (!tracks) {
        return <Skeleton />;
    }

    return (
        <>
            <Background
                color={theme_color}
                src={`${RESOURCES.GENRES}/${slug}.jpg`}
            />
            <Hero>
                <Stack direction='row'>
                    <Stack sx={{ borderRadius: 1, overflow: 'hidden' }}>
                        <CardMedia
                            component='img'
                            image={`${RESOURCES.GENRES}/${slug}.jpg`}
                            alt={`${genre} cover`}
                            sx={{
                                width: 151,
                                boxShadow: '0 4px 60px rgb(0 0 0 / 50%)',
                            }}
                        />
                        <Button
                            variant='contained'
                            startIcon={<PlayArrowIcon />}
                            sx={{
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            }}
                        >
                            Odtwarzaj
                        </Button>
                    </Stack>
                    <Stack justifyContent='flex-end' pl={2}>
                        <Typography
                            variant='h1'
                            noWrap={true}
                            sx={{ fontWeight: 900 }}
                        >
                            {genre}
                        </Typography>
                        {!content ? (
                            <>
                                <Skeleton />
                                <Skeleton />
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant='subtitle1'
                                    color='text.secondary'
                                    component='div'
                                >
                                    {content?.description}
                                </Typography>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing={0.5}
                                >
                                    <Link
                                        fontWeight='bold'
                                        underline='hover'
                                        color='secondary'
                                        href='/'
                                    >
                                        {content?.author
                                            ? content.author
                                            : 'Spotify'}
                                    </Link>{' '}
                                    <Typography
                                        variant='subtitle1'
                                        color='text.secondary'
                                        component='div'
                                    >
                                        {`• ${getTracksCount()}, ${getTotalDuration()}`}
                                    </Typography>
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Stack>
            </Hero>
            <TracksTable tracks={tracks} />
        </>
    );
}

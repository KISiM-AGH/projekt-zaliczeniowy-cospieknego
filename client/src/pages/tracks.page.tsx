import { Fragment, ReactElement } from 'react';
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
import { Tracklist } from '../components';
import useContent from '../hooks/useContent';
import ITrack from '../interfaces/track.interface';
import IAlbum from '../interfaces/album.interface';
import IPlaylist from '../interfaces/playlist.interface';

interface IContent {
    tracks: ITrack[];
    name?: string;
    genre?: string;
    description?: string;
    author?: string;
    theme_color?: string;
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
    const slugs = location.pathname.split('/');
    const type = slugs[1];
    const id = slugs[2];
    const content = useContent(`${type}s/${id}`) as unknown as any; // IAlbum | IPlaylist

    //const { genre, theme_color, tracks } = content;

    const getTracksCount = () => {
        if (content.tracks) {
            const size = content.tracks.length;

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
        let d: number = 0;
        content?.tracks.forEach((track: ITrack) => (d += track.duration));
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor((d % 3600) % 60);

        return h === 0 ? `${m} min ${s} sek` : `${h} godz. ${m} min`;
    };

    if (content.length === 0)
        return <Skeleton sx={{ width: '100%', height: '100%' }} />;

    return (
        <>
            <Background color={'red'} src={content?.images[0]?.url || ''} />
            <Hero>
                <Stack direction='row'>
                    <Stack sx={{ borderRadius: 1, overflow: 'hidden' }}>
                        <CardMedia
                            component='img'
                            image={content?.images[0]?.url || ''}
                            alt={`${content.name} cover`}
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
                            variant='subtitle1'
                            color='text.secondary'
                            sx={{ textTransform: 'uppercase' }}
                        >
                            {content.type}
                        </Typography>
                        <Typography
                            variant='h1'
                            noWrap={true}
                            sx={{ fontWeight: 900 }}
                        >
                            {content?.name}
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
                                    {content.artists.map(
                                        (a: any, i: number) => (
                                            <Fragment key={i}>
                                                <Link
                                                    href={`/${content.artists[0].type}/${a.id}}`}
                                                    color='text.secondary'
                                                    underline='hover'
                                                >
                                                    {a.name}
                                                </Link>
                                                {content.artists.length > 1 &&
                                                    i <
                                                        content.artists.length -
                                                            1 && (
                                                        <span>, </span>
                                                    )}
                                            </Fragment>
                                        )
                                    )}
                                    <Typography
                                        variant='subtitle1'
                                        color='text.secondary'
                                        component='div'
                                    >
                                        {` • ${getTracksCount()}, ${getTotalDuration()}`}
                                    </Typography>
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Stack>
            </Hero>
            {!content.tracks ? (
                <Skeleton />
            ) : (
                <Tracklist tracks={content.tracks} />
            )}
        </>
    );
}

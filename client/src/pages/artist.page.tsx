import { useState, ReactElement } from 'react';
import {
    Button,
    CardMedia,
    Stack,
    styled,
    Typography,
    Link,
    Skeleton,
    Popover,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Tracklist } from '../components';
import useContent from '../hooks/useContent';
import ITrack from '../interfaces/track.interface';
import IArtist from '../interfaces/artist.interface';

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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${src})`,

    '&::after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        opacity: '0.8',
        background: `linear-gradient(0deg, ${theme.palette.background.paper} 0%, transparent 100%)`,
    },
}));

const Hero = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(3),
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
}));

export default function ArtistPage({ fetch }: { fetch: string }): ReactElement {
    const content = useContent(fetch) as unknown as any;
    const tracks = useContent(`${fetch}/top-tracks?limit=10`);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = () => {};

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {content.length !== 0 && (
                <Background src={content?.images[1]?.url || ''} />
            )}
            <Hero>
                <Stack spacing={4}>
                    <Stack justifyContent='flex-end'>
                        {content.length === 0 ? (
                            <>
                                <Skeleton width={308} height={112} />
                                <Skeleton width={50} height={28} />
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant='h1'
                                    noWrap={true}
                                    sx={{ fontWeight: 900 }}
                                >
                                    {content.name}
                                </Typography>
                                <Typography
                                    variant='subtitle1'
                                    color='text.secondary'
                                >
                                    {content.followers.total} obserwujących
                                </Typography>
                            </>
                        )}
                    </Stack>
                    <Stack direction='row' spacing={4}>
                        <Button
                            variant='contained'
                            startIcon={<PlayArrowIcon />}
                        >
                            Odtwarzaj
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            size='small'
                        >
                            Obserwuj
                        </Button>
                        <IconButton
                            aria-label='see more'
                            color='secondary'
                            component='span'
                            size='small'
                            onClick={handleOpen}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Hero>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                open={open}
                onClose={handleClose}
                sx={{
                    mt: 1,
                }}
                MenuListProps={{
                    sx: {
                        maxWidth: '350px',
                        minWidth: '140px',
                    },
                }}
            >
                <MenuItem
                    onClick={handleClick}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}
                >
                    <Typography variant='subtitle2'>Obserwuj</Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleClick}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}
                >
                    <Typography variant='subtitle2'>Udostępnij</Typography>
                </MenuItem>
            </Menu>
            {!content.tracks ? (
                <>
                    <Skeleton width='100%' height={67} sx={{ mt: 6 }} />
                    <Skeleton width='100%' height={67} />
                    <Skeleton width='100%' height={67} />
                    <Skeleton width='100%' height={67} />
                </>
            ) : (
                <Tracklist tracks={content.tracks} />
            )}
        </>
    );
}

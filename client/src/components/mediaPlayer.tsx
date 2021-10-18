/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton,
    Tooltip,
    AppBar,
    CardContent,
    CardMedia,
    Typography,
    Toolbar,
    LinearProgress,
    Slider,
} from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';

export default function MediaPlayer(props: {}): ReactElement {
    const [progress, setProgress] = useState<number>(0);
    const [volume, setVolume] = useState<number>(100);
    const [prevVolume, setPrevVolume] = useState<number>(100);
    const [muted, setMuted] = useState<boolean>(false);
    const [speakerIcon, setSpeakerIcon] = useState<any>(false);
    const theme = useTheme();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + 1
            );
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useMemo(() => {
        if (volume === 0) {
            setSpeakerIcon(<VolumeOffOutlinedIcon fontSize='small' />);
        } else if (volume > 0 && volume < 50) {
            setSpeakerIcon(<VolumeDownOutlinedIcon fontSize='small' />);
        } else {
            setSpeakerIcon(<VolumeUpOutlinedIcon fontSize='small' />);
        }
    }, [volume]);

    useMemo(() => {
        setPrevVolume(volume > 0 ? volume : prevVolume);
        setVolume(muted ? 0 : prevVolume);
    }, [muted]);

    const handleClick = (): void => {
        setMuted((muted) => !muted);
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
    };

    return (
        <AppBar
            elevation={0}
            sx={{
                m: 2,
                zIndex: theme.zIndex.drawer + 1,
                top: 'unset',
                bottom: 0,
                width: `calc(100% - ${theme.spacing(4)})`,
                display: 'flex',
            }}
        >
            <LinearProgress variant='determinate' value={progress} />
            <Toolbar sx={{ height: 90, justifyContent: 'space-between' }}>
                <Box
                    sx={{
                        width: '30%',
                        maxWidth: '220px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <CardMedia
                        component='img'
                        sx={{ width: 60, height: 60 }}
                        image='/images/albums/ride-the-lightning.jpg'
                        alt='Ride the Lightning album cover'
                    />
                    <CardContent>
                        <Typography
                            noWrap
                            component='div'
                            variant='h5'
                            title='Trapped Under Ice'
                        >
                            Trapped Under Ice
                        </Typography>
                        <Typography
                            noWrap
                            variant='subtitle1'
                            color='text.secondary'
                            component='div'
                            title='Metallica'
                        >
                            Metallica
                        </Typography>
                    </CardContent>
                </Box>
                <Box
                    sx={{
                        width: '30%',
                        maxWidth: '220px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box>
                        <Tooltip
                            enterDelay={1000}
                            leaveDelay={200}
                            placement='top'
                            title='Włącz odtwarzanie losowe'
                        >
                            <IconButton aria-label='shuffle'>
                                <ShuffleIcon
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '16px',
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            enterDelay={1000}
                            leaveDelay={200}
                            placement='top'
                            title={
                                theme.direction === 'rtl'
                                    ? 'Następny'
                                    : 'Poprzedni'
                            }
                        >
                            <IconButton aria-label='previous'>
                                {theme.direction === 'rtl' ? (
                                    <SkipNextIcon />
                                ) : (
                                    <SkipPreviousIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            enterDelay={1000}
                            leaveDelay={200}
                            placement='top'
                            title='Odtwórz'
                        >
                            <IconButton
                                aria-label='play/pause'
                                sx={{
                                    mx: 2,
                                    color: theme.palette.background.paper,
                                    bgcolor: theme.palette.primary.main,
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                <PlayArrowIcon sx={{ height: 26, width: 26 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            enterDelay={1000}
                            leaveDelay={200}
                            placement='top'
                            title={
                                theme.direction === 'rtl'
                                    ? 'Poprzedni'
                                    : 'Następny'
                            }
                        >
                            <IconButton aria-label='next'>
                                {theme.direction === 'rtl' ? (
                                    <SkipPreviousIcon />
                                ) : (
                                    <SkipNextIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            enterDelay={1000}
                            leaveDelay={200}
                            placement='top'
                            title='Włącz powtarzanie'
                        >
                            <IconButton aria-label='repeat'>
                                <RepeatIcon
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '16px',
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Typography
                            variant='caption'
                            paragraph={true}
                            mb={0}
                            mt={1}
                            align='center'
                        >
                            0:30 / 2:25
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '30%',
                        maxWidth: '220px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IconButton aria-label='volume button'>
                        <PlaylistPlayOutlinedIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                        aria-label='volume button'
                        onClick={handleClick}
                    >
                        {speakerIcon}
                    </IconButton>
                    <Slider
                        aria-label='volume'
                        size='small'
                        valueLabelDisplay='auto'
                        value={volume}
                        onChange={handleChange}
                        sx={{ ml: 3 }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}

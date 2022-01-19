import { useState, ReactElement, Fragment } from 'react';
import {
    Button,
    Stack,
    styled,
    Typography,
    Link,
    Skeleton,
    IconButton,
    Menu,
    MenuItem,
    Grid,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FeatureCard, Tracklist } from '../components';
import useContent from '../hooks/useContent';
import IAlbum from '../interfaces/album.interface';
import translate from '../utils/translate';

const Background = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'src',
})<{ color?: string; src?: string; blur?: boolean }>(
    ({ theme, blur, color, src }) => ({
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
        filter: blur ? 'blur(16px)' : '',

        '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '100%',
            opacity: '0.8',
            background: `linear-gradient(0deg, ${theme.palette.background.paper} 0%, transparent 100%)`,
        },
    })
);

const Hero = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
}));

export default function ArtistPage({ fetch }: { fetch: string }): ReactElement {
    const content = useContent(fetch) as unknown as any;
    const topTracks = useContent(`${fetch}/top-tracks?limit=10`);
    const popular = useContent(`${fetch}/albums?limit=8&sort_by=-popularity`);
    const albums = useContent(`${fetch}/albums?limit=8&sort_by=-release_date`);
    const singles = useContent(`${fetch}/singles?limit=8&sort_by=-popularity`);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);
    const rows = [
        { title: 'Popularne wydania', content: popular },
        { title: 'Albumy', content: albums },
        { title: 'Single i minialbumy', content: singles },
    ];

    const getDateSubstring = (
        date: string,
        precision: 'year' | 'month' | 'day'
    ): string => {
        const values = date.split('-');
        if (precision === 'year') return values[0];
        if (precision === 'month') return values[1];
        if (precision === 'day') return values[2];
        return date;
    };

    const handleClick = () => {
        // follow / share
    };

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {content.length !== 0 && (
                <Background
                    src={content?.images[1]?.url || content?.images[0]?.url}
                    blur={content?.images[1]?.url ? false : true}
                />
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
                                    {content.followers.total
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ' '
                                        )}{' '}
                                    obserwujących
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
            <Typography
                variant='h5'
                component='h2'
                color='textPrimary'
                fontWeight='bold'
                gutterBottom
                sx={{
                    flexGrow: 1,
                }}
            >
                Popularne
            </Typography>
            {!topTracks ? (
                <>
                    <Skeleton width='100%' height={67} sx={{ mt: 6 }} />
                    <Skeleton width='100%' height={67} />
                    <Skeleton width='100%' height={67} />
                    <Skeleton width='100%' height={67} />
                </>
            ) : (
                <Tracklist
                    tracks={topTracks}
                    rowCount={5}
                    columnSpan={6}
                    hideHeader={true}
                    density='standard'
                />
            )}
            {rows.map((row, index) => (
                <Fragment key={index}>
                    {row.content.length > 0 && (
                        <Stack
                            direction='row'
                            alignItems='self-end'
                            width='100%'
                            mb={2}
                            sx={{
                                '&:not(:first-of-type)': {
                                    mt: 4,
                                },
                            }}
                        >
                            <Typography
                                variant='h5'
                                component='h2'
                                color='textPrimary'
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                {row.title}
                            </Typography>
                            {row.content.length >= 8 && (
                                <Link
                                    href={`#`}
                                    underline='hover'
                                    color='textSecondary'
                                >
                                    <Typography variant='button'>
                                        POKAŻ WSZYSTKO
                                    </Typography>
                                </Link>
                            )}
                        </Stack>
                    )}
                    <Grid container spacing={3}>
                        {row.content.map(
                            ({
                                id,
                                name,
                                type,
                                images,
                                release_date,
                                release_date_precision,
                            }: IAlbum) => (
                                <FeatureCard
                                    key={name}
                                    href={`/album/${id}`}
                                    title={name}
                                    subtitle={`${getDateSubstring(
                                        release_date,
                                        release_date_precision
                                    )} • ${translate(type)}`}
                                    image={images[0]}
                                />
                            )
                        )}
                    </Grid>
                </Fragment>
            ))}
        </>
    );
}

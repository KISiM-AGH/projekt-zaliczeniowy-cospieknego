import {
    useEffect,
    useState,
    Fragment,
    MouseEvent,
    SyntheticEvent,
} from 'react';
import {
    alpha,
    Link,
    Stack,
    Typography,
    Button,
    styled,
    Grid,
    GridSize,
    Skeleton,
    IconButton,
    Snackbar,
    Tooltip,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ExplicitIcon from '@mui/icons-material/Explicit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import ITrack from '../interfaces/track.interface';
import useContent from '../hooks/useContent';
import useApi from '../hooks/useApi';
import IArtist from '../interfaces/artist.interface';
import { useHistory } from 'react-router-dom';

interface IProps {
    tracks: ITrack[];
    rowCount?: number;
    columnSpan?: GridSize;
    hideHeader?: boolean;
    hideAlbum?: boolean;
    hideArtist?: boolean;
    userFavoritesPage?: boolean;
    density?: 'standard' | 'compact' | 'comfortable';
}

interface IRow {
    trackId: string;
    id: number;
    title: {
        name: string;
        authors: string[];
        href: string;
        albumSrc: string;
        isExplicit: boolean;
    };
    album: {
        name: string;
        href: string;
    };
    menu: {
        duration: number;
        trackId: string;
        isFavorite: boolean;
    };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: theme.palette.text.secondary,
    '.MuiDataGrid-columnSeparator': {
        opacity: '0 !important',
    },
    '.MuiDataGrid-cell': {
        border: 'none',
        outline: 'none !important',
    },
    '*:focus': {
        outline: 'none !important',
    },
    '.MuiDataGrid-columnHeaderTitleContainer': {
        padding: 0,
    },
    '.MuiDataGrid-row.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, 0.24),
    },
    '.MuiDataGrid-row.Mui-selected, .MuiDataGrid-row:hover': {
        '[data-field="id"]': {
            '.MuiTypography-root': {
                opacity: 0,
            },
            '.MuiSvgIcon-root ': {
                opacity: 1,
            },
        },
        '[data-field="menu"]': {
            '[data-testid="FavoriteBorderIcon"], [data-testid="MoreHorizIcon"],':
                {
                    opacity: 1,
                    zIndex: 5,
                },
        },
    },
}));

export default function Tracklist({
    tracks,
    density,
    rowCount,
    columnSpan,
    hideHeader,
    hideAlbum,
    hideArtist,
    userFavoritesPage,
}: IProps) {
    const [pageSize, setPageSize] = useState<number>(rowCount || 100);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [key, setKey] = useState<string>('');
    const [rows, setRows] = useState<any[]>([]);
    const history = useHistory();
    const userFavorites: any[] = useContent('me/tracks');
    const api = useApi();

    const columns: GridColDef[] = [
        { field: 'trackId', hide: true },
        {
            field: 'id',
            headerName: '#',
            headerAlign: 'center',
            align: 'center',
            width: 20,
            sortable: false,
            editable: false,
            renderCell: (params: any) => (
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    position='relative'
                >
                    <Typography component='h3' sx={{ position: 'absolute' }}>
                        {params.value}
                    </Typography>
                    <Tooltip
                        enterDelay={1000}
                        enterNextDelay={1000}
                        placement='top'
                        title={
                            <Typography fontSize={16}>
                                {`Odtwórz ${
                                    params.getValue(params.id, 'title')?.name
                                } artysty ${params
                                    .getValue(params.id, 'title')
                                    ?.authors.map((a: IArtist) => a.name)
                                    .join(', ')}`}
                            </Typography>
                        }
                    >
                        <PlayArrowIcon
                            fontSize='small'
                            sx={{ opacity: 0, position: 'absolute' }}
                            onClick={playMusic}
                        />
                    </Tooltip>
                </Stack>
            ),
        },
        {
            field: 'title',
            headerName: 'TYTUŁ',
            flex: 2,
            sortable: false,
            editable: false,
            renderCell: (params) => (
                <Stack direction='row' alignItems='center' spacing={2}>
                    <img
                        width={40}
                        height={40}
                        loading='lazy'
                        src={params.value.albumSrc}
                        alt='Album cover'
                    />
                    <div>
                        <Typography color='textPrimary' lineHeight={1.2}>
                            {params.value.name}
                        </Typography>
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing={0.5}
                        >
                            {params.value.isExplicit ? (
                                <ExplicitIcon
                                    fontSize='small'
                                    sx={{ color: 'text.secondary' }}
                                />
                            ) : null}
                            {!hideArtist && (
                                <Typography>
                                    {params.value.authors.map(
                                        (a: any, i: number) => (
                                            <Fragment key={i}>
                                                <Link
                                                    color='text.secondary'
                                                    underline='hover'
                                                    onClick={(
                                                        e: MouseEvent
                                                    ) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        history.push(
                                                            params.value.href
                                                        );
                                                    }}
                                                    sx={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {a.name}
                                                </Link>
                                                {params.value.authors.length >
                                                    1 &&
                                                    i <
                                                        params.value.authors
                                                            .length -
                                                            1 && (
                                                        <span>, </span>
                                                    )}
                                            </Fragment>
                                        )
                                    )}
                                </Typography>
                            )}
                        </Stack>
                    </div>
                </Stack>
            ),
        },
        {
            field: 'album',
            headerName: 'ALBUM',
            flex: 1,
            sortable: false,
            editable: false,
            hide: hideAlbum ? true : false,
            renderCell: (params) => (
                <div>
                    <Link
                        color='textSecondary'
                        underline='hover'
                        onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            history.push(params.value.href);
                        }}
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        {params.value.name}
                    </Link>
                </div>
            ),
        },
        // {
        //     field: 'dateAdded',
        //     headerName: 'DATA DODANIA',
        //     flex: 1,
        //     sortable: false,
        //     editable: false,
        // },
        {
            field: 'menu',
            headerAlign: 'right',
            width: 120,
            sortable: false,
            editable: false,
            renderHeader: () => (
                <AccessTimeIcon fontSize='small' sx={{ mr: 4.5 }} />
            ),
            renderCell: (params) => (
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                        position='relative'
                        sx={{ width: 20, height: 20 }}
                    >
                        {params.value.isFavorite ? (
                            <FavoriteIcon
                                fontSize='small'
                                color='primary'
                                sx={{
                                    opacity: 1,
                                    position: 'absolute',
                                }}
                                onClick={(e: MouseEvent) => {
                                    removeFromFavorites(
                                        params.value.trackId,
                                        e
                                    );
                                    params.value.isFavorite = false;
                                }}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                fontSize='small'
                                sx={{
                                    opacity: 0,
                                    position: 'absolute',
                                    '&:hover': { color: 'primary.main' },
                                }}
                                onClick={(e: MouseEvent) => {
                                    addToFavorites(params.value.trackId, e);
                                    params.value.isFavorite = true;
                                }}
                            />
                        )}
                    </Stack>
                    <div>{params.value.duration}</div>
                    <MoreHorizIcon
                        fontSize='small'
                        sx={{ opacity: 0 }}
                        onClick={handleOpen}
                    />
                </Stack>
            ),
        },
    ];

    useEffect(() => {
        const addRow = (index: number, track: ITrack, isFavorite: boolean) => ({
            trackId: track.id,
            id: index,
            title: {
                name: track.name,
                authors: track.artists,
                href: `/${track.artists[0].type}/${track.artists[0].id}`,
                albumSrc: track.album.images[0].url,
                isExplicit: track.explicit,
            },
            album: {
                name: track.album.name,
                href: `/${track.album.type}/${track.album.id}`,
            },
            //dateAdded: track?.added ? '11 maja 2021' : null,
            menu: {
                duration: convertToTimeFormat(track.duration),
                trackId: track.id,
                isFavorite,
            },
        });

        const _rows =
            tracks &&
            tracks.map((track, index) => {
                const isFavorite =
                    userFavorites.filter((t) => t.id === track.id).length > 0
                        ? true
                        : false;
                return addRow(index + 1, track, isFavorite);
            });
        setRows(_rows);
    }, [tracks, userFavorites]);

    const convertToTimeFormat = (d: number): string => {
        const m = Math.floor((d % 3600) / 60);
        const _s = Math.floor((d % 3600) % 60);
        const s = _s < 10 ? '0' + _s : _s;
        return `${m}:${s}`;
    };

    const playMusic = (e: MouseEvent) => {
        e.stopPropagation();
        console.log('playing music ...');
    };

    const handleExpand = () => {
        setOpen((open) => !open);
        setPageSize((pageSize) => (!open ? 2 * pageSize : pageSize / 2));
    };

    const handleOpen = () => {
        // open popover menu
    };

    const handleCloseSnackbar = (
        event: SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const addToFavorites = async (trackId: string, e: MouseEvent) => {
        e.stopPropagation();
        setKey(trackId);
        setOpenSnackbar(true);

        const response = await api.put('me/tracks', { id: trackId });

        if (response) {
            setMessage('Dodano do Polubionych utworów');
        }
    };

    const removeFromFavorites = async (trackId: string, e: MouseEvent) => {
        e.stopPropagation();
        setKey(trackId);
        setOpenSnackbar(true);

        const response = await api.delete('me/tracks', { id: trackId });

        if (response) {
            setMessage('Usunięto z Polubionych utworów');
        }

        if (userFavoritesPage) {
            let _rows: IRow[] = rows.filter(
                (row: IRow) => row.trackId !== trackId
            );
            _rows.map((row: IRow, i: number) => (row.id = i + 1));
            setRows((rows: IRow[]) => _rows);
        }
    };

    return tracks?.length > 0 ? (
        <>
            <Snackbar
                key={key}
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                message={message}
                action={
                    <IconButton
                        size='small'
                        aria-label='close'
                        color='inherit'
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon fontSize='small' />
                    </IconButton>
                }
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                ContentProps={{
                    sx: {
                        bgcolor: 'background.paper',
                        color: 'text.secondary',
                    },
                }}
                sx={{
                    transform: 'translate(-50%, -250%) !important',
                }}
            />
            <Grid container>
                {rows?.length > 0 ? (
                    <Grid item xs={8} xl={columnSpan || 8}>
                        <StyledDataGrid
                            rows={rows}
                            columns={columns}
                            rowBuffer={5}
                            pageSize={pageSize}
                            headerHeight={hideHeader ? 0 : 56}
                            density={density || 'comfortable'}
                            autoHeight
                            hideFooter
                            disableColumnMenu
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                        />
                        {hideHeader && (
                            <Button
                                variant='text'
                                size='large'
                                color='secondary'
                                onClick={handleExpand}
                            >
                                {rowCount
                                    ? open
                                        ? 'Pokaż mniej'
                                        : 'Pokaż więcej'
                                    : null}
                            </Button>
                        )}
                    </Grid>
                ) : (
                    <Stack spacing={2} alignItems='center' mt='15vh'>
                        <Typography variant='h4'>
                            Ta playlista jest obecnie pusta
                        </Typography>
                        <Typography>
                            Znajdź muzykę, którą kochasz wśród naszych
                            najnowszych wydań
                        </Typography>
                        <Button
                            variant='contained'
                            component={Link}
                            href='/genre/new-releases'
                        >
                            Przejdź do nowych wydań
                        </Button>
                    </Stack>
                )}
            </Grid>
        </>
    ) : (
        <SkeletonList count={8} />
    );
}

function SkeletonList({ count }: { count?: number }) {
    return (
        <Grid container>
            {Array.from(new Array(count || 8)).map((item, index) => (
                <Stack
                    key={index}
                    direction='row'
                    width='100%'
                    alignItems='center'
                    justifyContent='flex-start'
                    spacing={3}
                >
                    <Skeleton width={20} height={70} sx={{ flex: 1 }} />
                    <Skeleton width={70} height={70} sx={{ flex: 2 }} />
                    <Stack sx={{ flex: 30 }}>
                        <Skeleton width={300} height={25} />
                        <Skeleton width={150} height={25} />
                    </Stack>
                    <Skeleton width={80} height={25} sx={{ flex: 4 }} />
                    <div style={{ flex: 16 }}></div>
                    <Skeleton width={25} height={25} sx={{ flex: 2 }} />
                </Stack>
            ))}
        </Grid>
    );
}

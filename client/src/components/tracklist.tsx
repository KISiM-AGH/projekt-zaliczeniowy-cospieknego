import { Fragment, useEffect, useState } from 'react';
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
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ExplicitIcon from '@mui/icons-material/Explicit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ITrack from '../interfaces/track.interface';

interface IProps {
    tracks: ITrack[];
    rowCount?: number;
    columnSpan?: GridSize;
    hideHeader?: boolean;
    density?: 'standard' | 'compact' | 'comfortable';
}

const convertToTimeFormat = (d: number): string => {
    const m = Math.floor((d % 3600) / 60);
    const _s = Math.floor((d % 3600) % 60);
    const s = _s < 10 ? '0' + _s : _s;
    return `${m}:${s}`;
};

const playMusic = () => {
    console.log('playing music ...');
};

const handleClick = () => {
    console.log('added to/removed from favorites');
};

const handleOpen = () => {
    console.log('open menu');
};

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: '#',
        headerAlign: 'center',
        align: 'center',
        width: 20,
        sortable: false,
        editable: false,
        renderCell: (params) => (
            <Stack
                alignItems='center'
                justifyContent='center'
                position='relative'
            >
                <Typography component='h3' sx={{ position: 'absolute' }}>
                    {params.value}
                </Typography>
                <PlayArrowIcon
                    fontSize='small'
                    sx={{ opacity: 0, position: 'absolute' }}
                    onClick={playMusic}
                />
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
                    <Stack direction='row' alignItems='center' spacing={0.5}>
                        {params.value.isExplicit ? (
                            <ExplicitIcon
                                fontSize='small'
                                sx={{ color: 'text.secondary' }}
                            />
                        ) : null}
                        <Typography>
                            {params.value.authors.map((a: any, i: number) => (
                                <Fragment key={i}>
                                    <Link
                                        href={params.value.href}
                                        color='text.secondary'
                                        underline='hover'
                                        onClick={(e: any) =>
                                            e.stopPropagation()
                                        }
                                    >
                                        {a.name}
                                    </Link>
                                    {params.value.authors.length > 1 &&
                                        i < params.value.authors.length - 1 && (
                                            <span>, </span>
                                        )}
                                </Fragment>
                            ))}
                        </Typography>
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
        // hide: true,
        renderCell: (params) => (
            <div>
                <Link
                    color='textSecondary'
                    underline='hover'
                    href={params.value.href}
                    onClick={(e: any) => e.stopPropagation()}
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
        field: 'duration',
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
                    <FavoriteBorderIcon
                        fontSize='small'
                        sx={{
                            opacity: 0,
                            position: 'absolute',
                            '&:hover': { color: 'primary.main' },
                        }}
                        onClick={handleClick}
                    />
                    <FavoriteIcon
                        fontSize='small'
                        color='primary'
                        sx={{ opacity: 0, position: 'absolute' }}
                        onClick={handleClick}
                    />
                </Stack>
                <div>{params.value}</div>
                <MoreHorizIcon
                    fontSize='small'
                    sx={{ opacity: 0 }}
                    onClick={handleOpen}
                />
            </Stack>
        ),
    },
];

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
        '[data-field="duration"]': {
            '[data-testid="FavoriteIcon"]': {
                opacity: 0,
                zIndex: 0,
            },
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
    rowCount,
    columnSpan,
    hideHeader,
    density,
}: IProps) {
    const [pageSize, setPageSize] = useState<number>(rowCount || 100);
    const [open, setOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<any>([]);

    const addRow = (id: number, track: ITrack) => ({
        id,
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
        duration: convertToTimeFormat(track.duration),
    });

    useEffect(() => {
        const _rows =
            tracks && tracks.map((track, index) => addRow(index + 1, track));
        setRows(_rows);
    }, [tracks]);

    const handleClick = () => {
        setOpen((open) => !open);
        setPageSize((pageSize) => (!open ? 2 * pageSize : pageSize / 2));
    };

    return tracks?.length > 0 ? (
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
                    <Button
                        variant='text'
                        size='large'
                        color='secondary'
                        onClick={handleClick}
                    >
                        {rowCount
                            ? open
                                ? 'Pokaż mniej'
                                : 'Pokaż więcej'
                            : null}
                    </Button>
                </Grid>
            ) : (
                <Stack spacing={2} alignItems='center' mt='15vh'>
                    <Typography variant='h4'>
                        Ta playlista jest obecnie pusta
                    </Typography>
                    <Typography>
                        Znajdź muzykę, którą kochasz wśród naszych najnowszych
                        wydań
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

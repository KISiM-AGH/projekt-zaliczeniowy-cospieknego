import { Fragment, useEffect, useState } from 'react';
import { alpha, Link, Stack, Typography, Button, styled } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ExplicitIcon from '@mui/icons-material/Explicit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ITrack from '../interfaces/track.interface';
import IArtist from '../interfaces/artist.interface';

interface IProps {
    tracks: ITrack[];
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
        renderCell: (params) => (
            <div>
                <Link
                    color='textSecondary'
                    underline='hover'
                    href={params.value.href}
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

export default function Tracklist({ tracks }: IProps) {
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
        const _rows = tracks.map((track, index) => addRow(index + 1, track));
        setRows(_rows);
    }, [tracks]);

    return (
        <div
            style={{
                width: '100%',
                marginTop: '24px',
            }}
        >
            {rows.length > 0 ? (
                <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter
                    autoHeight
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    density='comfortable'
                />
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
        </div>
    );
}

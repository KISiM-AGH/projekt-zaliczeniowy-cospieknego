import { useState, ReactElement } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CollectionType from './collectionType';

const menuItems = [
    {
        text: 'Konto',
        link: true,
    },
    {
        text: 'Profil',
        link: false,
    },
    {
        text: 'Przejdź na Premium',
        link: true,
    },
    {
        text: 'Wyloguj',
        link: false,
    },
];

export default function Topbar(props: {}): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Toolbar
            sx={{
                width: `calc(100vw - 200px - ${theme.spacing(6)})`,
                m: 2,
                marginLeft: `calc(200px + ${theme.spacing(4)})`,
                bgcolor: theme.palette.background.paper,
            }}
        >
            <Box sx={{ flexGrow: 1, minWidth: 108 }}>
                <Tooltip enterDelay={3000} leaveDelay={200} title='Wstecz'>
                    <IconButton
                        aria-label='back'
                        sx={{
                            ml: 1,
                            bgcolor: theme.palette.primary.main,
                            '&:hover': {
                                bgcolor: theme.palette.primary.dark,
                            },
                        }}
                        onClick={() => history.goBack()}
                    >
                        <ChevronLeftIcon
                            sx={{
                                color: theme.palette.background.default,
                            }}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip enterDelay={3000} leaveDelay={200} title='Dalej'>
                    <IconButton
                        aria-label='forward'
                        sx={{
                            ml: 1,
                            bgcolor: theme.palette.background.default,
                        }}
                        onClick={(prevHistory) => {
                            history.goForward();
                            console.log(history);
                            console.log(prevHistory);
                        }}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            {matchPath(location.pathname, {
                path: '/collection/:id',
            }) && (
                <CollectionType activeType={location.pathname.split('/')[2]} />
            )}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={handleMenu}
            >
                <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    sx={{
                        height: '40px',
                        borderRadius: '20px',
                        mr: 2,
                        p: 1,
                        bgcolor: theme.palette.background.default,
                    }}
                >
                    <AccountCircle color='primary' sx={{ fontSize: '32px' }} />
                    <Typography ml={1}>Admin</Typography>
                    {Boolean(anchorEl) ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ mt: 1 }}
            >
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.text}
                        onClick={handleClose}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 1,
                        }}
                    >
                        <Typography variant='subtitle2'>{item.text}</Typography>
                        {item.link && <OpenInNewIcon fontSize='small' />}
                    </MenuItem>
                ))}
            </Menu>
        </Toolbar>
    );
}

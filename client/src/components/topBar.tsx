import { useState, ReactElement } from 'react';
import { useHistory, useLocation, Link, matchPath } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    CardMedia,
    Button,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CollectionType from './collectionType';
import { useAuthState } from '../context/auth';

const menuItems = [
    {
        text: 'Konto',
        isLink: true,
    },
    {
        text: 'Profil',
        isLink: false,
    },
    {
        text: 'Przejdź na Premium',
        isLink: true,
    },
    {
        text: 'Wyloguj',
        isLink: false,
    },
];

const UserMenu = ({ isOpen, onClick }: { isOpen: any; onClick: any }) => {
    const theme = useTheme();
    const { currentUser }: { currentUser: any } = useAuthState();

    return (
        <IconButton
            size='large'
            aria-label='account of the current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            sx={{
                p: 1,
                height: '40px',
                borderRadius: '20px',
                bgcolor: theme.palette.background.default,
            }}
            onClick={onClick}
        >
            {currentUser.image_url ? (
                <CardMedia
                    component='img'
                    src={currentUser.image_url}
                    sx={{ width: '26px', borderRadius: '50%' }}
                />
            ) : (
                <AccountCircle color='primary' sx={{ fontSize: '32px' }} />
            )}
            <Typography ml={1.5}>{currentUser.username}</Typography>
            {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
    );
};

const JoinMenu = () => {
    const theme = useTheme();

    return (
        <>
            <Button
                variant='text'
                color='secondary'
                component={Link}
                to={'/register'}
            >
                ZAREJESTRUJ SIĘ
            </Button>
            <Button
                variant='contained'
                sx={{ ml: theme.spacing(3) }}
                component={Link}
                to={'/login'}
            >
                ZALOGUJ SIĘ
            </Button>
        </>
    );
};

export default function Topbar(props: {}): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();

    const {
        isLoggedIn,
    }: { currentUser: any; isLoggedIn: boolean; dispatch: any } =
        useAuthState();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement);
        console.log(isLoggedIn);
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
                    mr: 2,
                }}
            >
                {isLoggedIn ? (
                    <UserMenu isOpen={Boolean(anchorEl)} onClick={handleMenu} />
                ) : (
                    <JoinMenu />
                )}
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
                        {item.isLink && <OpenInNewIcon fontSize='small' />}
                    </MenuItem>
                ))}
            </Menu>
        </Toolbar>
    );
}

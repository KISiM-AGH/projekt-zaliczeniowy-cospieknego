import { useState, ReactElement, Dispatch } from 'react';
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
    Skeleton,
} from '@mui/material';
import { SearchBar } from '../components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CollectionType from '../components/collectionType';
import useAuth from '../hooks/useAuth';
import { logout } from '../actions/authActions';
import * as ROUTES from '../constants/routes';

export default function Topbar(): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();

    const {
        isLoggedIn,
        loading,
        dispatch,
    }: { isLoggedIn: boolean; loading: boolean; dispatch: Dispatch<any> } =
        useAuth();

    const handleClick = () => {
        logout(dispatch);
        setAnchorEl(null);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement);
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
                            ml: 2,
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
                path: `${ROUTES.COLLECTION}/:id`,
            }) && (
                <CollectionType activeType={location.pathname.split('/')[2]} />
            )}
            {matchPath(location.pathname, {
                path: `${ROUTES.BROWSE}`,
            }) && <SearchBar />}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mr: 2,
                }}
            >
                {!loading ? (
                    isLoggedIn ? (
                        <UserMenu
                            isOpen={Boolean(anchorEl)}
                            onClick={handleMenu}
                        />
                    ) : (
                        <JoinMenu />
                    )
                ) : (
                    <Skeleton animation='wave' />
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
                        onClick={
                            item.type === 'logout' ? handleClick : handleClose
                        }
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

const UserMenu = ({ isOpen, onClick }: { isOpen: any; onClick: any }) => {
    const theme = useTheme();
    const { currentUser } = useAuth();

    return (
        <IconButton
            size='large'
            aria-label='account of the current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            sx={{
                px: 1,
                py: 0.5,
                height: '40px',
                borderRadius: '20px',
                bgcolor: theme.palette.background.default,
            }}
            onClick={onClick}
        >
            {currentUser?.images && currentUser.images.length! > 0 ? (
                <CardMedia
                    component='img'
                    src={currentUser.images[0].url}
                    alt='avatar'
                    width={28}
                    height={28}
                    sx={{ borderRadius: '50%' }}
                />
            ) : (
                <AccountCircle color='primary' sx={{ fontSize: '32px' }} />
            )}
            <Typography ml={1}>{currentUser?.username}</Typography>
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
                to={ROUTES.SIGNUP}
            >
                ZAREJESTRUJ SIĘ
            </Button>
            <Button
                variant='contained'
                sx={{ ml: theme.spacing(3) }}
                component={Link}
                to={ROUTES.LOGIN}
            >
                ZALOGUJ SIĘ
            </Button>
        </>
    );
};

const menuItems = [
    {
        type: 'accountSettings',
        text: 'Konto',
        isLink: true,
    },
    {
        type: 'profileSettings',
        text: 'Profil',
        isLink: false,
    },
    {
        type: 'goPremium',
        text: 'Przejdź na Premium',
        isLink: true,
    },
    {
        type: 'logout',
        text: 'Wyloguj',
        isLink: false,
    },
];

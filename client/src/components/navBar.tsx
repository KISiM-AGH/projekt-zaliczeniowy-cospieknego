import { useState, ReactElement, Fragment, MouseEvent } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { styled, useTheme, Theme } from '@mui/material/styles';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SvgIconProps,
    Divider,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeIcon from '../icons/homeIcon';
import SearchIcon from '../icons/searchIcon';
import CollectionIcon from '../icons/collectionIcon';
import Logo from './logo';
import useAuth from '../hooks/useAuth';
import LoginPopover from './loginPopover';

interface INavItem {
    id: number;
    path?: string;
    text: string;
    icon: ReactElement<SvgIconProps>;
    loggedInOnly: boolean;
    popover?: {
        title: string;
        text: string;
    };
}
interface IPlaylist {
    name: string;
}

const drawerWidth: number = 200;
const mediaPlayerHeight: number = 94;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    ...theme.mixins.toolbar,
}));
const DrawerBody = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        margin: theme.spacing(2),
        border: 0,
        zIndex: 1301, // higher than popover z-index
        width: drawerWidth,
        height: `calc(100vh - ${theme.spacing(6)} - ${mediaPlayerHeight}px)`,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            bgcolor: '#2a0b12',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            backgroundClip: 'content-box',
        },
    },
}));

export default function NavBar(): ReactElement {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [playlists, setPlaylists] = useState<IPlaylist[] | null>([
        { name: 'Moja playlista' },
    ]);
    const { isLoggedIn }: { isLoggedIn: boolean } = useAuth();
    const theme = useTheme();

    return (
        <DrawerBody variant='permanent' anchor='left'>
            <DrawerHeader>
                <Link to='/' style={{ paddingRight: theme.spacing(5) }}>
                    <Logo height={40} />
                </Link>
            </DrawerHeader>
            <NavList />
            {isLoggedIn && playlists && playlists.length > 0 && (
                <>
                    <Divider variant='middle' />
                    <List>
                        <ListItem>
                            {playlists.map((playlist) => (
                                <ListItemText
                                    key={playlist.name}
                                    primary={playlist.name}
                                    primaryTypographyProps={{
                                        noWrap: true,
                                        color: 'textSecondary',
                                        sx: {
                                            cursor: 'default ',
                                            '&:hover': {
                                                color: '#fff',
                                            },
                                        },
                                    }}
                                />
                            ))}
                        </ListItem>
                    </List>
                </>
            )}
        </DrawerBody>
    );
}

function NavList(): ReactElement {
    const [anchorEl, setAnchorEl] = useState<{
        [id: number]: HTMLElement;
    } | null>(null);
    const location = useLocation();

    const handleOpen = (event: MouseEvent<HTMLElement>, id: number) => {
        setAnchorEl({ [id]: event.currentTarget });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <List>
                {navItems.map((item, i) => (
                    <NavListItem
                        key={i}
                        item={item}
                        anchorEl={anchorEl}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />
                ))}
            </List>
            <List>
                {navOptions.map((item, i) => (
                    <NavListItem
                        key={i}
                        item={item}
                        anchorEl={anchorEl}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />
                ))}
            </List>
        </>
    );
}

function NavListItem({
    item,
    anchorEl,
    handleOpen,
    handleClose,
}: {
    item: INavItem;
    anchorEl: {
        [id: number]: HTMLElement;
    } | null;
    handleOpen: (event: MouseEvent<HTMLElement>, id: number) => void;
    handleClose: () => void;
}): ReactElement {
    const { id, text, icon, path, loggedInOnly, popover } = item;
    const location = useLocation();

    const isSelected = (path: string) => {
        return matchPath(location.pathname, {
            path: path === '/collection/albums' ? '/collection/:id' : path!,
            exact: true,
        })
            ? true
            : false;
    };

    return (
        <Fragment key={id}>
            <div
                onClick={loggedInOnly ? (e) => handleOpen(e, id) : handleClose}
            >
                <ListItem
                    button
                    selected={isSelected(path!)}
                    component={Link}
                    to={item.loggedInOnly ? '#' : item.path!}
                >
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={text}
                        primaryTypographyProps={{ noWrap: true }}
                    />
                </ListItem>
            </div>
            {popover && (
                <LoginPopover
                    text={popover.text}
                    title={popover.title}
                    anchorEl={anchorEl && anchorEl[id]}
                    handleClose={handleClose}
                />
            )}
        </Fragment>
    );
}

const navItems: INavItem[] = [
    {
        id: 1,
        path: '/',
        text: 'Home',
        icon: <HomeIcon color='primary' fontSize='medium' />,
        loggedInOnly: false,
    },
    {
        id: 2,
        path: '/search',
        text: 'Szukaj',
        icon: <SearchIcon color='primary' fontSize='medium' />,
        loggedInOnly: false,
    },
    {
        id: 3,
        path: '/collection/albums',
        text: 'Biblioteka',
        icon: <CollectionIcon color='primary' fontSize='medium' />,
        loggedInOnly: true,
        popover: {
            title: 'Ciesz się Biblioteką',
            text: 'Zaloguj się, aby zobaczyć zapisane utwory, podcasty, wykonawców i playlisty w Bibliotece.',
        },
    },
];

const navOptions: INavItem[] = [
    {
        id: 4,
        text: 'Utwórz playlistę',
        icon: <AddOutlinedIcon color='primary' fontSize='medium' />,
        loggedInOnly: true,
        popover: {
            title: 'Utwórz playlistę',
            text: 'Zaloguj się, aby tworzyć i udostępniać playlisty.',
        },
    },
    {
        id: 5,
        text: 'Polubione utwory',
        icon: <FavoriteBorderOutlinedIcon color='primary' fontSize='medium' />,
        loggedInOnly: true,
        popover: {
            title: 'Ciesz się polubionymi utworami',
            text: 'Zaloguj się, aby wyświetlić wszystkie polubione utwory na jednej wygodnej playliście.',
        },
    },
];

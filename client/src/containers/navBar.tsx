import { useState, ReactElement, Fragment, MouseEvent } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
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
import Logo from '../components/logo';
import useAuth from '../hooks/useAuth';
import LoginPopover from '../components/loginPopover';
import * as ROUTES from '../constants/routes';

interface INavItem {
    id: number;
    path: string;
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
                <Link
                    to={ROUTES.HOME}
                    style={{ paddingRight: theme.spacing(5) }}
                >
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

    const { isLoggedIn, loading }: { isLoggedIn: boolean; loading: boolean } =
        useAuth();

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
                        isLoggedIn={loading ? false : isLoggedIn}
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
                        isLoggedIn={isLoggedIn}
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
    isLoggedIn,
    handleOpen,
    handleClose,
}: {
    item: INavItem;
    anchorEl: {
        [id: number]: HTMLElement;
    } | null;
    isLoggedIn: boolean;
    handleOpen: (event: MouseEvent<HTMLElement>, id: number) => void;
    handleClose: () => void;
}): ReactElement {
    const { id, text, icon, path, loggedInOnly, popover } = item;
    const location = useLocation();

    const isSelected = (path: string) => {
        const isCollection = matchPath(location.pathname, {
            path: path === ROUTES.ALBUMS ? `${ROUTES.COLLECTION}/:id` : path,
            exact: true,
        });

        const isFavorites = matchPath(location.pathname, {
            path: path === ROUTES.TRACKS ? `${ROUTES.COLLECTION}/:id` : path,
            exact: true,
        });

        return isCollection ? true : false;
    };

    return (
        <Fragment key={id}>
            <div
                onClick={
                    loggedInOnly && !isLoggedIn
                        ? (e) => handleOpen(e, id)
                        : handleClose
                }
            >
                <ListItem
                    button
                    selected={isSelected(path!)}
                    component={Link}
                    to={item.loggedInOnly && !isLoggedIn ? '#' : path!}
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
        path: ROUTES.HOME,
        text: 'Home',
        icon: <HomeIcon color='primary' fontSize='medium' />,
        loggedInOnly: false,
    },
    {
        id: 2,
        path: ROUTES.BROWSE,
        text: 'Szukaj',
        icon: <SearchIcon color='primary' fontSize='medium' />,
        loggedInOnly: false,
    },
    {
        id: 3,
        path: ROUTES.ALBUMS,
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
        path: '#',
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
        path: ROUTES.TRACKS,
        text: 'Polubione utwory',
        icon: <FavoriteBorderOutlinedIcon color='primary' fontSize='medium' />,
        loggedInOnly: true,
        popover: {
            title: 'Ciesz się polubionymi utworami',
            text: 'Zaloguj się, aby wyświetlić wszystkie polubione utwory na jednej wygodnej playliście.',
        },
    },
];

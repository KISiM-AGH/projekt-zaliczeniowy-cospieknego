import { useState, forwardRef, ReactElement } from 'react';
import { Link, LinkProps, matchPath, useLocation } from 'react-router-dom';
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

interface INavItem {
    path?: string;
    text: string;
    icon: ReactElement<SvgIconProps>;
}
interface IPlaylist {
    name: string;
}

const drawerWidth: number = 200;
const mediaPlayerHeight: number = 94;
const navItems: INavItem[] = [
    {
        path: '/',
        text: 'Home',
        icon: <HomeIcon color='primary' fontSize='medium' />,
    },
    {
        path: '/search',
        text: 'Szukaj',
        icon: <SearchIcon color='primary' fontSize='medium' />,
    },
    {
        path: '/collection/albums',
        text: 'Biblioteka',
        icon: <CollectionIcon color='primary' fontSize='medium' />,
    },
];
const navOptions: INavItem[] = [
    {
        text: 'Utwórz playlistę',
        icon: <AddOutlinedIcon color='primary' fontSize='medium' />,
    },
    {
        text: 'Polubione utwory',
        icon: <FavoriteBorderOutlinedIcon color='primary' fontSize='medium' />,
    },
];
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    ...theme.mixins.toolbar,
}));

export default function NavBar(props: {}): ReactElement {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [playlists, setPlaylists] = useState<IPlaylist[] | null>([
        { name: 'Moja playlista' },
    ]);
    const location = useLocation();
    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    m: 2,
                    border: 0,
                    width: drawerWidth,
                    height: (theme: Theme) =>
                        `calc(100vh - ${theme.spacing(
                            6
                        )} - ${mediaPlayerHeight}px)`,
                    boxSizing: 'border-box',
                },
            }}
            variant='permanent'
            anchor='left'
        >
            <DrawerHeader>
                <Link to='/' style={{ paddingRight: theme.spacing(5) }}>
                    <Logo height={40} />
                </Link>
            </DrawerHeader>
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        selected={
                            matchPath(location.pathname, {
                                path:
                                    item.path === '/collection/albums'
                                        ? '/collection/:id'
                                        : item.path!,
                                exact: true,
                            })
                                ? true
                                : false
                        }
                        component={forwardRef<
                            HTMLAnchorElement,
                            Partial<LinkProps>
                        >((props, ref) => (
                            <Link to={item.path!} ref={ref as any} {...props} />
                        ))}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <List>
                {navOptions.map((item) => (
                    <ListItem button key={item.text}>
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            {playlists && playlists.length > 0 && (
                <>
                    <Divider variant='middle' />
                    <List>
                        <ListItem>
                            {playlists.map((playlist) => (
                                <ListItemText
                                    key={playlist.name}
                                    primary={playlist.name}
                                    primaryTypographyProps={{
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
        </Drawer>
    );
}

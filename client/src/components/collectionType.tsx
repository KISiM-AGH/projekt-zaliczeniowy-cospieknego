import { useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useWindowSize from '../hooks/useWindowSize';
import * as ROUTES from '../constants/routes';

interface IProps {
    activeType: string;
}

export default function CollectionType({ activeType }: IProps): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const windowSize = useWindowSize();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack direction='row' spacing={2} sx={{ flexGrow: 24, color: '#fff' }}>
            {windowSize.x >= 1024 && (
                <>
                    <Button
                        variant={activeType === 'albums' ? 'contained' : 'text'}
                        color={
                            activeType === 'albums' ? 'primary' : 'secondary'
                        }
                        sx={{ padding: '6px 16px' }}
                        component={Link}
                        to={ROUTES.ALBUMS}
                    >
                        Albumy
                    </Button>
                    <Button
                        variant={
                            activeType === 'playlists' ? 'contained' : 'text'
                        }
                        color={
                            activeType === 'playlists' ? 'primary' : 'secondary'
                        }
                        sx={{ padding: '6px 16px' }}
                        component={Link}
                        to={ROUTES.PLAYLISTS}
                    >
                        Playlisty
                    </Button>
                    <Button
                        variant={
                            activeType === 'podcasts' ? 'contained' : 'text'
                        }
                        color={
                            activeType === 'podcasts' ? 'primary' : 'secondary'
                        }
                        sx={{ padding: '6px 16px' }}
                        component={Link}
                        to={ROUTES.PODCASTS}
                    >
                        Podcasty
                    </Button>
                    <Button
                        variant={
                            activeType === 'artists' ? 'contained' : 'text'
                        }
                        color={
                            activeType === 'artists' ? 'primary' : 'secondary'
                        }
                        sx={{ padding: '6px 16px' }}
                        component={Link}
                        to={ROUTES.ARTISTS}
                    >
                        Wykonawcy
                    </Button>
                </>
            )}
            {windowSize.x < 1024 && windowSize.x >= 900 && (
                <>
                    <Button
                        variant='contained'
                        component={Link}
                        to={ROUTES.ALBUMS}
                    >
                        Albumy
                    </Button>
                    <Button
                        color='secondary'
                        component={Link}
                        to={ROUTES.PLAYLISTS}
                    >
                        Playlisty
                    </Button>
                    <Button
                        color='secondary'
                        component={Link}
                        to={ROUTES.PODCASTS}
                    >
                        Podcasty
                    </Button>
                    <Button
                        color='secondary'
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleMenu}
                    >
                        Więcej
                    </Button>
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
                        <Button
                            color='secondary'
                            component={Link}
                            to={ROUTES.ARTISTS}
                        >
                            Wykonawcy
                        </Button>
                    </Menu>
                </>
            )}
            {windowSize.x < 900 && (
                <>
                    <Button
                        variant='contained'
                        component={Link}
                        to={ROUTES.ALBUMS}
                    >
                        Albumy
                    </Button>
                    <Button
                        color='secondary'
                        component={Link}
                        to={ROUTES.PLAYLISTS}
                    >
                        Playlisty
                    </Button>
                    <Button
                        color='secondary'
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleMenu}
                    >
                        Więcej
                    </Button>
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
                        <MenuItem>
                            <Button
                                color='secondary'
                                component={Link}
                                to={ROUTES.PODCASTS}
                            >
                                Podcasty
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button
                                color='secondary'
                                component={Link}
                                to={ROUTES.ARTISTS}
                            >
                                Wykonawcy
                            </Button>
                        </MenuItem>
                    </Menu>
                </>
            )}
        </Stack>
    );
}

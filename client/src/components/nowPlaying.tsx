import { ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import { MediaPlayer, SignupBar } from '../components';
import useAuth from '../hooks/useAuth';

export default function NowPlaying(): ReactElement {
    const { isLoggedIn }: { isLoggedIn: boolean } = useAuth();
    const theme = useTheme();

    return (
        <AppBar
            elevation={0}
            sx={{
                m: 2,
                zIndex: theme.zIndex.drawer + 1,
                top: 'unset',
                bottom: 0,
                width: `calc(100% - ${theme.spacing(4)})`,
                display: 'flex',
            }}
        >
            {isLoggedIn ? <MediaPlayer /> : <SignupBar />}
        </AppBar>
    );
}

import { createTheme } from '@mui/material';
import darkScrollbar from '@mui/material/darkScrollbar';

export const THEME = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff2850',
        },
        secondary: {
            main: '#edf2ff',
        },
        background: {
            default: '#000b0f',
            paper: '#00141a',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                // body: darkScrollbar(),
                body: darkScrollbar({
                    track: '#00141a',
                    thumb: '#6b6b6b',
                    active: '#959595',
                }),
            },
        },
    },
});

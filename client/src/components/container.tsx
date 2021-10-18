import { ReactElement, ReactNode } from 'react';
import { Grid, Box, Theme } from '@mui/material';

const drawerWidth: number = 200;
const mediaPlayerHeight: number = 94;
const topBarHeight: number = 64;

const styles = {
    root: {
        backgroundColor: 'background.default',
        minHeight: '100%',
        m: 2,
        marginLeft: (theme: Theme) =>
            `calc(${drawerWidth}px + ${theme.spacing(4)})`,
        '&::before, &::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: 99,
            height: '40px',
            width: (theme: Theme) => `calc(100% - ${theme.spacing(1)})`,
        },
        '&::before': {
            background: (theme: Theme) =>
                `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${theme.palette.background.paper} 100%)`,
        },
        '&::after': {
            transform: 'translateY(-100%)',
            background: (theme: Theme) =>
                `linear-gradient(0deg, ${theme.palette.background.paper} 0%, rgba(255,255,255,0) 100%)`,
        },
    },
    topbar: {
        width: (theme: Theme) => `calc(100% - ${theme.spacing(4)})`,
    },
    container: {
        bgcolor: (theme: Theme) => theme.palette.background.paper,
        height: (theme: Theme) =>
            `calc(100vh - ${theme.spacing(
                8
            )} - ${mediaPlayerHeight}px - ${topBarHeight}px)`,
        overflow: 'auto',
        p: 4,
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            bgcolor: '#2a0b12',
        },
        '&::-webkit-scrollbar-thumb': {
            bgcolor: (theme: Theme) => theme.palette.primary.main,
        },
    },
};

interface IProps {
    children: ReactNode;
}

export default function Container({
    children,
    ...props
}: IProps): ReactElement {
    return (
        <>
            <Box sx={styles.root} position='relative'>
                <Grid container sx={styles.container}>
                    {children}
                </Grid>
            </Box>
        </>
    );
}

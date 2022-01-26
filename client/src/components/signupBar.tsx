import { ReactElement } from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SignupBar(): ReactElement {
    const theme = useTheme();

    return (
        <Stack
            p='11px 24px 7px 15px'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{
                height: '94px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #0aa17a 100%)`,
            }}
        >
            <Box ml={3}>
                <Typography variant='button'>Podgląd Spotify</Typography>
                <Typography>
                    Zarejestruj się, aby słuchać utworów i podcastów
                    przerywanych sporadycznie reklamami. Nie wymagamy podania
                    numeru karty kredytowej.
                </Typography>
            </Box>
            <Button
                size='large'
                color='secondary'
                variant='contained'
                sx={{
                    textTransform: 'uppercase',
                    m: '8px 0 12px',
                    color: '#0aa17a',
                }}
                component={Link}
                to={'/signup'}
            >
                Zarejestruj się za darmo
            </Button>
        </Stack>
    );
}

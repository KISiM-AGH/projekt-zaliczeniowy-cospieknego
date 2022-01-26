import { ReactElement } from 'react';
import { Button, Popover, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface IProps {
    text: string;
    title: string;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
}

export default function LoginPopover({
    text,
    title,
    anchorEl,
    handleClose,
}: IProps): ReactElement {
    const open = Boolean(anchorEl);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                    p: 2,
                    maxWidth: '336px',
                    minWidth: '300px',
                },
            }}
            onClose={handleClose}
        >
            <Typography sx={{ mb: 1, fontSize: '18px' }}>{title}</Typography>
            <Typography variant='subtitle2' sx={{ letterSpacing: 'normal' }}>
                {text}
            </Typography>
            <Stack mt={3} spacing={1} alignItems='flex-end'>
                <Button
                    size='medium'
                    variant='text'
                    color='secondary'
                    onClick={handleClose}
                >
                    NIE TERAZ
                </Button>
                <Button
                    size='medium'
                    variant='contained'
                    component={Link}
                    to={'/login'}
                >
                    ZALOGUJ SIĘ
                </Button>
            </Stack>
        </Popover>
    );
}

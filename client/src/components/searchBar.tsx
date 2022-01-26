import { useState, ChangeEvent, ReactElement } from 'react';
import { Box, Paper, IconButton, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '../icons/search.icon';

export default function SearchBar(): ReactElement {
    const [keyword, setKeyword] = useState<string>('');

    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const value = e.target.value;
        setKeyword(value);
    };

    const handleClear = () => {
        setKeyword('');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 80,
                minWidth: 0,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '364px',
                }}
            >
                <Paper
                    component='form'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'common.white',
                        borderRadius: '30px',
                    }}
                >
                    <IconButton
                        type='submit'
                        aria-label='search'
                        sx={{ p: 1, color: '#121212' }}
                    >
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{
                            flex: '0 1 364px',
                            position: 'relative',
                            color: '#000',
                            'input::placeholder': {
                                color: '#000',
                            },
                        }}
                        inputProps={{
                            'aria-label': 'search artists, tracks, podcasts',
                        }}
                        value={keyword}
                        placeholder='Wykonawcy, utwory, podcasty'
                        onChange={handleChange}
                    />
                    {keyword.length > 0 && (
                        <IconButton
                            type='button'
                            aria-label='clear'
                            sx={{ p: 1, color: '#121212' }}
                            onClick={handleClear}
                        >
                            <ClearIcon />
                        </IconButton>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}

import { ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
} from '@mui/material';

interface ISong {
    artist: string;
    title: string;
    slug: string;
}

interface ISongProps {
    song: ISong;
}

export default function SongCard({ song }: ISongProps): ReactElement {
    const { artist, title, slug } = song;
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <Card
                sx={{
                    minWidth: 50,
                    background: theme.palette.background.default,
                    // '&:hover': {
                    //     bgcolor: theme.palette.primary.main,
                    // },
                }}
            >
                <CardActionArea>
                    <CardMedia
                        component='img'
                        height='100%'
                        image={`./images/albums/${slug}.jpg`}
                        alt={title}
                        sx={{ p: 3, pb: 2, pointerEvents: 'none' }}
                    />
                    <CardContent
                        sx={{
                            p: 3,
                            pt: 0,
                        }}
                    >
                        <Typography
                            noWrap
                            variant='h6'
                            component='div'
                            title={title}
                        >
                            {title}
                        </Typography>
                        <Typography
                            noWrap
                            variant='body1'
                            color='text.secondary'
                            title={artist}
                        >
                            {artist}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

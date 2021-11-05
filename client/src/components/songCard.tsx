import { ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
} from '@mui/material';

interface ICard {
    title: string;
    subtitle: string;
    slug: string;
}

export default function SongCard({
    title,
    subtitle,
    slug,
}: ICard): ReactElement {
    const theme = useTheme();

    return (
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
                    image={`/images/albums/${slug}.jpg`}
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
                        title={subtitle}
                    >
                        {subtitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

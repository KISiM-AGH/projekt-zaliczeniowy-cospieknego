import { ReactElement, Fragment, useRef, MutableRefObject } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme, Theme, styled } from '@mui/material/styles';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    Link,
    IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IArtist from '../interfaces/artist.interface';

type ICard = {
    href: string;
    title: string;
    artist?: boolean;
    image: {
        url: string;
        width: number;
        height: number;
    };
} & (
    | { subtitle: string; artists?: never }
    | { artists: IArtist[]; subtitle?: never }
);

const PlayButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    position: 'absolute',
    pointerEvents: 'auto',
    opacity: 1,
    boxShadow: '0 8px 8px rgb(0 0 0 / 30%)',
    transform: 'scale(1) translateY(10px)',
    transition: theme.transitions.create(['background-color', 'transform'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeIn,
    }),
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.1) translateY(0)',
    },
}));

export default function FeatureCard({
    href,
    image,
    title,
    subtitle,
    artists,
    artist,
}: ICard): ReactElement {
    const history = useHistory();
    const theme = useTheme();
    const playBtnRef = useRef() as MutableRefObject<HTMLButtonElement>;

    return (
        <Grid item xs={8} sm={4} md={2} lg={2} xl={1}>
            <Card
                raised={true}
                sx={{
                    minWidth: 50,
                    background: theme.palette.background.default,
                }}
            >
                <CardActionArea
                    onMouseOver={() => {
                        // playBtnRef.current.style.opacity = '1';
                        // playBtnRef.current.sx = {{opacity: 1}}
                    }}
                    onClick={() => {
                        history.push(href);
                    }}
                >
                    <div
                        style={{
                            paddingBottom: '100%',
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <div>
                            <CardMedia
                                alt={title}
                                image={image.url}
                                component='img'
                                height='100%'
                                sx={{
                                    p: 2,
                                    position: 'absolute',
                                    pointerEvents: 'none',
                                    borderRadius: artist ? '50%' : 0,
                                }}
                            />
                        </div>
                        <PlayButton ref={playBtnRef} aria-label='play'>
                            <PlayArrowIcon />
                        </PlayButton>
                    </div>
                    <CardContent
                        sx={{
                            p: 2,
                            pt: 0,
                        }}
                    >
                        <Typography
                            noWrap
                            variant='body1'
                            component='div'
                            title={title}
                        >
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography
                                noWrap
                                gutterBottom
                                variant='body2'
                                color='text.secondary'
                                title={subtitle}
                            >
                                {subtitle}
                            </Typography>
                        )}
                        {artists && (
                            <Typography
                                noWrap
                                gutterBottom
                                variant='body2'
                                title={'WDAWDAWD'}
                            >
                                {artists.map((a: IArtist, i) => (
                                    <Fragment key={i}>
                                        <Link
                                            color='text.secondary'
                                            underline='hover'
                                            href={`/${a.type}/${a.id}`}
                                        >
                                            {a.name}
                                        </Link>
                                        {artists.length > 1 &&
                                            i < artists.length - 1 && (
                                                <span>, </span>
                                            )}
                                    </Fragment>
                                ))}
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

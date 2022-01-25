import {
    useState,
    useRef,
    ReactElement,
    Fragment,
    MouseEvent,
    MutableRefObject,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    Link,
    IconButton,
    Grow,
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
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    pointerEvents: 'auto',
    boxShadow: '0 8px 8px rgb(0 0 0 / 30%)',
    transform: 'scale(1)',
    transition: theme.transitions.create(['all', 'transform'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeIn,
    }),
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.1)',
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
    const cardRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [visible, setVisible] = useState(false);
    const history = useHistory();
    const theme = useTheme();

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
                    component='div'
                    onMouseEnter={() => {
                        setVisible(true);
                    }}
                    onMouseLeave={() => {
                        setVisible(false);
                    }}
                    onClick={(e: MouseEvent) => {
                        history.push(href);
                        e.stopPropagation();
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
                                ref={cardRef}
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
                        <Grow
                            in={visible}
                            style={{ transformOrigin: '0 100px 0' }}
                            timeout={500}
                        >
                            <PlayButton
                                aria-label='play'
                                onClick={(e: MouseEvent) => {
                                    e.stopPropagation();
                                }}
                            >
                                <PlayArrowIcon />
                            </PlayButton>
                        </Grow>
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
                                mt={0.5}
                            >
                                {subtitle}
                            </Typography>
                        )}
                        {artists && (
                            <Typography
                                noWrap
                                gutterBottom
                                variant='body2'
                                mt={0.5}
                            >
                                {artists.map((a: IArtist, i) => (
                                    <Fragment key={i}>
                                        <Link
                                            color='text.secondary'
                                            underline='hover'
                                            onClick={(e: MouseEvent) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                history.push(
                                                    `/${a.type}/${a.id}`
                                                );
                                            }}
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

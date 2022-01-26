import { ReactElement, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Link, Stack } from '@mui/material';
import featureFilter from '../utils/featureFilter';
import FeatureCard from '../components/featureCard';
import IArtist from '../interfaces/artist.interface';
import useContent from '../hooks/useContent';
import IAlbum from '../interfaces/album.interface';
import ITrack from '../interfaces/track.interface';
import IPlaylist from '../interfaces/playlist.interface';
import { Loader } from '../components';

interface IProps {
    [key: string]: { title: string; type: string; data: any[] | undefined }[];
}

export default function HomePage(): ReactElement {
    // placeholder for recommended
    const tracks = useContent('tracks?limit=8&sort=popularity');
    const albums = useContent('albums?limit=8');
    const artists = useContent('artists?limit=8');
    const playlists = useContent('playlists?limit=8');
    const slides = featureFilter({
        tracks,
        albums,
        artists,
        playlists,
    });

    if (slides[0]?.data && slides[0].data.length === 0) {
        return <Loader />;
    }

    return (
        <>
            <Helmet>
                <title>Spotify – Odtwarzacz internetowy</title>
            </Helmet>
            <HomeContainer slides={slides} />
        </>
    );
}

// @TODO redo type check
function HomeContainer({ slides }: IProps): ReactElement {
    return (
        <>
            {slides.map((slide: any) => (
                <Fragment key={slide.title}>
                    <Stack
                        direction='row'
                        alignItems='self-end'
                        width='100%'
                        mb={2}
                        sx={{
                            '&:not(:first-of-type)': {
                                mt: 4,
                            },
                        }}
                    >
                        <Typography
                            variant='h5'
                            component='h2'
                            color='textPrimary'
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            {slide.title}
                        </Typography>
                        {slide.data.length >= 8 && (
                            <Link
                                href={`/${slide.type}`}
                                underline='hover'
                                color='textSecondary'
                            >
                                <Typography variant='button'>
                                    POKAŻ WSZYSTKO
                                </Typography>
                            </Link>
                        )}
                    </Stack>
                    <Grid container spacing={3}>
                        {slide.type === 'playlists' &&
                            slide.data.map(
                                ({
                                    id,
                                    name,
                                    description,
                                    owner,
                                    images,
                                }: IPlaylist) => (
                                    <FeatureCard
                                        key={name}
                                        href={`/playlist/${id}`}
                                        title={name}
                                        subtitle={
                                            description.length > 0
                                                ? description
                                                : owner.username
                                        }
                                        image={images[0]}
                                    />
                                )
                            )}
                        {slide.type === 'tracks' &&
                            slide.data.map(
                                ({ name, artists, album }: ITrack) => (
                                    <FeatureCard
                                        key={name}
                                        href={`/album/${album.id}`}
                                        title={name}
                                        artists={artists}
                                        image={album.images[0]}
                                    />
                                )
                            )}
                        {slide.type === 'albums' &&
                            slide.data.map(
                                ({ id, name, artists, images }: IAlbum) => (
                                    <FeatureCard
                                        key={name}
                                        href={`/album/${id}`}
                                        title={name}
                                        artists={artists}
                                        image={images[0]}
                                    />
                                )
                            )}
                        {slide.type === 'artists' &&
                            slide.data.map(
                                ({ id, type, name, images }: IArtist) => (
                                    <FeatureCard
                                        key={name}
                                        artist
                                        href={`/${type}/${id}`}
                                        title={name}
                                        subtitle='Wykonawca'
                                        image={images[0]}
                                    />
                                )
                            )}
                    </Grid>
                </Fragment>
            ))}
        </>
    );
}

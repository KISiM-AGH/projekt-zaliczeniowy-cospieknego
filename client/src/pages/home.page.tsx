import { useState, useEffect, ReactElement, Fragment } from 'react';
import { Grid, Box, Typography, Link, Skeleton, Stack } from '@mui/material';
import featureFilter from '../utils/featureFilter';
import FeatureCard from '../components/featureCard';
import IArtist from '../interfaces/artist.interface';
import useContent from '../hooks/useContent';
import IAlbum from '../interfaces/album.interface';
import ITrack from '../interfaces/track.interface';
import IPlaylist from '../interfaces/playlist.interface';

interface IProps {
    [key: string]: { title: string; type: string; data: any[] | undefined }[];
}

interface ISlideData {
    id: number;
    name: string;
    type: string;
    artists: IArtist[];
    album: {
        images: [
            {
                url: string;
                width: number;
                height: number;
            }
        ];
    };
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

    if (!slides) {
        return <div>Loading...</div>;
    }

    return <HomeContainer slides={slides} />;
}

function HomeContainer({ slides }: IProps): ReactElement {
    return slides[0].data?.length === 0 ? (
        <>
            <Skeleton width={300} height={42} sx={{ mb: 2 }} />
            <Stack direction='row' justifyContent='space-between' width='100%'>
                {Array.from(new Array(8)).map((item, index) => (
                    <Skeleton
                        key={index}
                        width={177}
                        height={246}
                        variant='rectangular'
                    />
                ))}
            </Stack>
            <Skeleton width={300} height={42} sx={{ my: 2 }} />
            <Stack direction='row' justifyContent='space-between' width='100%'>
                {Array.from(new Array(8)).map((item, index) => (
                    <Skeleton
                        key={index}
                        width={177}
                        height={246}
                        variant='rectangular'
                    />
                ))}
            </Stack>
            <Skeleton width={300} height={42} sx={{ my: 2 }} />
            <Stack direction='row' justifyContent='space-between' width='100%'>
                {Array.from(new Array(8)).map((item, index) => (
                    <Skeleton
                        key={index}
                        width={177}
                        height={246}
                        variant='rectangular'
                    />
                ))}
            </Stack>
        </>
    ) : (
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

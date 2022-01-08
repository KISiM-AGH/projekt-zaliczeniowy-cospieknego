import { useState, useEffect, ReactElement, Fragment } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import featureFilter from '../utils/featureFilter';
import FeatureCard from '../components/featureCard';
import IArtist from '../interfaces/artist.interface';
import useContent from '../hooks/useContent';

interface IProps {
    [key: string]: { title: string; data: any[] | undefined }[];
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
    const tracks = useContent('tracks');
    const albums = useContent('tracks');
    const artists = useContent('tracks');
    const slides = featureFilter({
        tracks,
        albums,
        artists,
    });

    if (!slides) {
        return <div>Loading...</div>;
    }

    return <HomeContainer slides={slides} />;
}

function HomeContainer({ slides }: IProps): ReactElement {
    const [slideRows, setSlideRows] = useState<any>([]);

    useEffect(() => {
        setSlideRows(slides);
    }, [slides]);

    return (
        <>
            {slideRows.map((slide: { title: string; data: [] }) => (
                <Fragment key={slide.title}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'self-end',
                            width: '100%',
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant='h5'
                            component='h2'
                            color='textPrimary'
                            sx={{ flexGrow: 1 }}
                        >
                            {slide.title}
                        </Typography>
                        {slide.data.length > 6 && (
                            <Typography variant='button' color='textSecondary'>
                                POKAŻ WSZYSTKO
                            </Typography>
                        )}
                    </Box>
                    <Grid container spacing={3}>
                        {slide.data.map(
                            ({
                                id,
                                type,
                                name,
                                artists,
                                album,
                            }: ISlideData) => (
                                <FeatureCard
                                    key={name}
                                    href={`/${type}/${id}`}
                                    title={name}
                                    artists={artists}
                                    image={album.images[0]}
                                />
                            )
                        )}
                    </Grid>
                </Fragment>
            ))}
        </>
    );
}

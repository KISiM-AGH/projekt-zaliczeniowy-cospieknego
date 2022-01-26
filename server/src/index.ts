import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db/db.config';
import errorMiddleware from './middlewares/error.middleware';
import {
    userRoutes,
    showRoutes,
    genreRoutes,
    albumsRoutes,
    tracksRoutes,
    artistsRoutes,
    playlistsRoutes,
} from './routes';

dotenv.config();

const port = process.env.PORT || 8080;
const app: Express = express();
const api: string = 'api/v1';

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'origin, X-Requested-With,Content-Type,Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET,PATCH,DELETE,POST,PUT,OPTIONS'
        );

        return res.status(200).json({});
    }
    next();
});

// Routes
app.use(`/${api}`, playlistsRoutes);
app.use(`/${api}`, artistsRoutes);
app.use(`/${api}`, albumsRoutes);
app.use(`/${api}`, tracksRoutes);
app.use(`/${api}`, genreRoutes);
app.use(`/${api}`, showRoutes);
app.use(`/${api}`, userRoutes);

// Error middleware
app.use(errorMiddleware);

// Error handling
app.use('*', (req: Request, res: Response) => {
    const error = new Error('Endpoint not found!');

    return res.status(404).json({
        error: {
            code: 'invalid_api_endpoint',
            message: error.message,
        },
    });
});

app.listen(port, () =>
    // tslint:disable-next-line:no-console
    console.log(`Running on http://localhost:${port}/${api}`)
);

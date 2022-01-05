import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware';
import songsRoutes from './routes/songs.route';
import albumsRoutes from './routes/albums.route';
import usersRoutes from './routes/users.route';
import genresRoutes from './routes/genre.route';

////////////////////////////////////////////////
import mongoose from 'mongoose';
import tracksRoutes from './routes/tracks.route';
// connect to mongoDB database
mongoose.connect('mongodb://localhost:27017/spotify');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));
////////////////////////////////////////////////////

dotenv.config();

const port = process.env.PORT || 8080;
const app: Express = express();
const api: string = 'api/v1';

app.use(express.urlencoded({ extended: false }));
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
            'GET,PATCH,DELETE,POST,OPTIONS'
        );

        return res.status(200).json({});
    }
    next();
});

// Routes
app.use(`/${api}`, songsRoutes);
app.use(`/${api}`, albumsRoutes);
app.use(`/${api}`, usersRoutes);
app.use(`/${api}`, genresRoutes);

// TEST
app.use(`/${version}`, tracksRoutes);

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
    console.log(`Running on http://localhost:${port}/${version}`)
);

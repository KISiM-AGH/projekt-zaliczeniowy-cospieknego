import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware';
import songsRoutes from './routes/songs.route';
import albumsRoutes from './routes/albums.route';

dotenv.config();

const port = process.env.PORT || 8080;
const app: Express = express();

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
            'GET PATCH DELETE POST OPTIONS'
        );

        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/api/v1', songsRoutes);
app.use('/api/v1', albumsRoutes);

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
    console.log(`Running on http://localhost:${port}/api/v1`)
);

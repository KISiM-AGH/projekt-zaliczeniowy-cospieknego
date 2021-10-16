import { Pool, createPool } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABASE || 'music_library',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}).promise();

export default pool;

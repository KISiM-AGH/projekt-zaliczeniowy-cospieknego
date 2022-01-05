import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/spotify');
const db = mongoose.connection;

export default db;

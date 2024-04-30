import mongoose from 'mongoose';
import logger from '../utils/logger';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  logger.error('No mongo connection string. Set `MONGODB_URI` environment variable.');
  process.exit(1);
}

console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', (error) => {
  logger.error(`MongoDB connection error: ${error}`);
});

db.once('open', () => {
  logger.info('Connected to MongoDB');
});

export default db;
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import todoRoutes from './routes/todo.routes';
import authRoutes from './routes/auth.routes';
import logger from './utils/logger';
import './config/db';
import dotenv from 'dotenv';
import docsSpecs from './config/docs';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(docsSpecs, {
    explorer: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Todo App is running');
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
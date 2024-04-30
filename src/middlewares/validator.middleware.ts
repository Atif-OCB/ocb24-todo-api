import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const validateTodoInput = (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;

  if (!title || !description) {
    logger.error('Invalid input data');
    return res.status(400).json({ error: 'Title and description are required' });
  }

  next();
};

export default validateTodoInput;
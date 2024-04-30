import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { verifyToken } from '../utils/auth';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (decoded) {
      // @ts-ignore
      req.body.userId = decoded.userId;
      next();
    } else {
      logger.error('Invalid token');
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    logger.error('No token provided');
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as object;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
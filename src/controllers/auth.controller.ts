import { Request, Response } from 'express';
import User from '../models/user.schema';
import logger from '../utils/logger';
import { generateToken } from '../utils/auth';

const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken({ userId: user._id });
    res.status(201).json({ token });
  } catch (error) {
    logger.error(`Error registering user: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = generateToken({ userId: user._id });
    res.json({ token });
  } catch (error) {
    logger.error(`Error logging in: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { registerController, loginController };
import { Request, Response } from 'express';
import logger from '../utils/logger';
import { getTodos, getTodoById, addTodo, updateTodo, deleteTodo } from '../models/todo.model';

const getTodosController = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  try {
    const todos = await getTodos(userId);
    res.json(todos);
  } catch (error) {
    logger.error(`[${userId}] Error retrieving todos: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTodoController = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { id } = req.params;
  try {
    const todo = await getTodoById(userId, id);
    if (todo) {
      res.json(todo);
    } else {
      logger.error(`[${userId}] Todo with id ${id} not found`);
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    logger.error(`[${userId}] Error retrieving todo: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createTodoController = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { title, description } = req.body;
  try {
    const newTodo = await addTodo({ title, description, createdBy: userId } as any); // Pass the userId directly
    res.status(201).json(newTodo);
  } catch (error) {
    logger.error(`[${userId}] Error creating todo: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTodoController = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { id } = req.params;
  const updatedTodo = {
    ...req.body,
  };
  try {
    const todo = await updateTodo(userId, id, updatedTodo);
    if (todo) {
      res.json(todo);
    } else {
      logger.error(`[${userId}] Todo with id ${id} not found`);
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    logger.error(`[${userId}] Error updating todo: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTodoController = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { id } = req.params;
  try {
    const todo = await deleteTodo(userId, id);
    if (todo) {
      res.json({ message: 'Todo deleted successfully' });
    } else {
      logger.error(`[${userId}] Todo with id ${id} not found`);
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    logger.error(`[${userId}] Error deleting todo: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  getTodosController,
  getTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
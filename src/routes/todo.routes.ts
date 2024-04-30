import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import validateTodoInput from '../middlewares/validator.middleware';
import {
  getTodosController,
  getTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from '../controllers/todo.controller';

const router = express.Router();

router.get('/', authMiddleware, getTodosController);
router.get('/:id', authMiddleware, getTodoController);
router.post('/', authMiddleware, validateTodoInput, createTodoController);
router.put('/:id', authMiddleware, validateTodoInput, updateTodoController);
router.delete('/:id', authMiddleware, deleteTodoController);

export default router;
import Todo, { ITodo } from './todo.schema';

const getTodos = async (userId: string): Promise<ITodo[]> => {
  return await Todo.find({ createdBy: userId });
};

const getTodoById = async (userId: string, id: string): Promise<ITodo | null> => {
  return await Todo.findOne({ _id: id, createdBy: userId });
};

const addTodo = async (todo: ITodo): Promise<ITodo> => {
  const newTodo = new Todo(todo);
  return await newTodo.save();
};

const updateTodo = async (userId: string, id: string, updatedTodo: ITodo): Promise<ITodo | null> => {
  return await Todo.findOneAndUpdate({ _id: id, createdBy: userId }, updatedTodo, { new: true });
};

const deleteTodo = async (userId: string, id: string): Promise<ITodo | null> => {
  return await Todo.findOneAndDelete({ _id: id, createdBy: userId });
};

export { getTodos, getTodoById, addTodo, updateTodo, deleteTodo };
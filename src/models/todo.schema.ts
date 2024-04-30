import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdBy: string;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
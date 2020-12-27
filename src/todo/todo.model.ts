import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, default: false, required: true }
});

export interface Todo extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

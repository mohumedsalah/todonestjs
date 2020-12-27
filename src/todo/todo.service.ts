import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel('todo') private readonly todoModel: Model<Todo>) {}
  async addOne(title: string, desc: string, userId: string) {
    const newTodo = new this.todoModel({ title, description: desc, userId });
    const result = await newTodo.save();
    return result;
  }
  async getAll(userId: string) {
    const result = await this.todoModel.find({ userId });
    return result;
  }
  async getOne(id: string, userId: string) {
    const result = await this.findTodo(id, userId);
    return result;
  }

  async updateOne(
    todoId: string,
    title: string,
    desc: string,
    done: boolean,
    userId: string
  ) {
    const updatedTodo = await this.findTodo(todoId, userId);

    if (title) {
      updatedTodo.title = title;
    }
    if (desc) {
      updatedTodo.description = desc;
    }
    if (done) {
      updatedTodo.done = done;
    }
    await updatedTodo.save();
    return updatedTodo;
  }

  async deleteOne(prodId: string, userId: string) {
    const result = await this.todoModel
      .deleteOne({ _id: prodId, userId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Todo.');
    }
  }

  private async findTodo(id: string, userId: string): Promise<Todo> {
    let todo;
    try {
      todo = await this.todoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find todo.');
    }
    if (!todo || todo.userId != userId) {
      throw new NotFoundException('Could not find todo.');
    }
    return todo;
  }
}

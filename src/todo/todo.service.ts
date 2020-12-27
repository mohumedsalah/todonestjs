import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel('todo') private readonly todoModel: Model<Todo>) {}
  async addOne(title: string, desc: string) {
    const newTodo = new this.todoModel({ title, description: desc });
    const result = await newTodo.save();
    return result;
  }
  async getAll() {
    const result = await this.todoModel.find({});
    return result;
  }
  async getOne(id: string) {
    const result = await this.findTodo(id);
    return result;
  }

  async updateOne(todoId: string, title: string, desc: string, done: boolean) {
    const updatedProduct = await this.findTodo(todoId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (done) {
      updatedProduct.done = done;
    }
    updatedProduct.save();
  }

  async deleteOne(prodId: string) {
    const result = await this.todoModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findTodo(id: string): Promise<Todo> {
    let product;
    try {
      product = await this.todoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}

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
    const updatedProduct = await this.findTodo(todoId, userId);
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

  async deleteOne(prodId: string, userId: string) {
    const result = await this.todoModel
      .deleteOne({ _id: prodId, userId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findTodo(id: string, userId: string): Promise<Todo> {
    let product;
    try {
      product = await this.todoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product || product.userId !== userId) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}

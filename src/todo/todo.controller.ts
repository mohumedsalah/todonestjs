import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async addTodo(@Body('title') title: string, @Body('desc') desc: string) {
    const generatedId = await this.todoService.addOne(title, desc);
    return { id: generatedId };
  }

  @Get()
  async getAllTodo() {
    const ret = await this.todoService.getAll();
    return ret;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.todoService.getOne(prodId);
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.todoService.deleteOne(prodId);
    return null;
  }

  @Patch(':id')
  async editTodo(
    @Param('id') todoId: string,
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('done') done: boolean
  ) {
    await this.todoService.updateOne(todoId, title, desc, done);
    return null;
  }
}

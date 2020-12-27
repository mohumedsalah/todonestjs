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
  async addTodo(
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('user') user: { id: string }
  ) {
    const generatedId = await this.todoService.addOne(title, desc, user.id);
    return { id: generatedId };
  }

  @Get()
  async getAllTodo(@Body('user') user: { id: string }) {
    const ret = await this.todoService.getAll(user.id);
    return ret;
  }

  @Get(':id')
  getTodo(@Param('id') todoId: string, @Body('user') user: { id: string }) {
    return this.todoService.getOne(todoId, user.id);
  }

  @Delete(':id')
  async removeTodo(
    @Param('id') TodoId: string,
    @Body('user') user: { id: string }
  ) {
    await this.todoService.deleteOne(TodoId, user.id);
    return null;
  }

  @Patch(':id')
  async editTodo(
    @Param('id') todoId: string,
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('done') done: boolean,
    @Body('user') user: { id: string }
  ) {
    await this.todoService.updateOne(todoId, title, desc, done, user.id);
    return null;
  }
}

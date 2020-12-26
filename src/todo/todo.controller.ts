import { Controller, Body, Post, Get } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  addTodo(@Body('title') title: string, @Body('desc') desc: string): any {
    const generatedId = this.todoService.insertTodo(title, desc);
    return { id: generatedId };
  }

  @Get()
  getAllTodo() {
    return this.todoService.getAllToDoList();
  }
}

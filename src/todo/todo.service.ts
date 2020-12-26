import { Injectable } from '@nestjs/common';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  todoList: Todo[] = [];
  insertTodo(title: string, desc: string) {
    const todoId = new Date().toString();
    const newTodo = new Todo(todoId, title, desc);
    this.todoList.push(newTodo);
    return todoId;
  }
  getAllToDoList() {
    return this.todoList;
  }
}

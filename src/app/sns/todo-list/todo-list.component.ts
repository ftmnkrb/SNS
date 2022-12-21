import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/auth/models/UserDto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Todo } from './Todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  user: UserDto | null | undefined = null;

  todos: Todo[] = [];

  todoForm = new FormGroup({
    todo: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService, private todoService: TodoService, private alertService: AlertService) {
    this.userService.user.subscribe(user => {
      this.user = user;

      this.todoService.getUserTodo(this.user?.localId!).subscribe(todos => {
        console.log(todos);
        this.todos = todos;
      })
    })
  }

  addTodo() {
    if (this.todoForm.invalid) {
      this.alertService.error("Please enter a value");
      return
    }
    let newTodo: Todo = {
      description: this.todoForm.get('todo')?.value!,
      done: false
    }
    this.todoService.addToDo(this.user?.localId!, newTodo).subscribe(res => {
      console.log(res);
      this.todos.push(newTodo);
      this.todoForm.reset();
    })
  }

  updateTodo(todo: Todo, e: any) {
    todo.done = e.currentTarget.checked;
    this.todoService.updateTodo(this.user?.localId!, todo).subscribe(res => {
      console.log(res);
    })
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(this.user?.localId!, todoId).subscribe(res => {
      this.todos.splice(this.todos.findIndex(t => t.id == todoId), 1);
    })
  }
}

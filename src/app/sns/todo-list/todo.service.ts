import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  addToDo(userId: string, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.firebaseConfig.databaseURL + '/todos/' + userId + '.json', todo);
  }

  getUserTodo(userId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.firebaseConfig.databaseURL + '/todos/' + userId + '.json').pipe(
      map(contents => {
        let newTodos: Todo[] = [];

        for (let key in contents) {
          console.log(contents[key]);
          newTodos.push({ ...contents[key], id: key })
        }
        console.log(newTodos);
        return newTodos;
      })
    );;
  }

  updateTodo(userId: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(environment.firebaseConfig.databaseURL + '/todos/' + userId + '/' + todo.id + '.json', todo);
  }

  deleteTodo(userId: string, todoId: string): Observable<Todo> {
    return this.http.delete<Todo>(environment.firebaseConfig.databaseURL + '/todos/' + userId + '/' + todoId + '.json');
  }
}

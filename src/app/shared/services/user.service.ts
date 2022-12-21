import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, map, Observable } from 'rxjs';
import { UserDto } from 'src/app/auth/models/UserDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<UserDto | null>(null);

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<UserDto | undefined> {
    return this.GetUsers().pipe(
      map(users => {
        return users.find(u => u.localId === id);
      })
    )
  }

  GetUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(environment.firebaseConfig.databaseURL + '/users.json').pipe(
      map(users => {
        let newUsers: UserDto[] = [];

        for (let key in users) {
          newUsers.push({ ...users[key], localId: users[key].localId, id: key })
        }

        return newUsers;
      })
    )
  }

  newUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(environment.firebaseConfig.databaseURL + '/users.json', user);
  }

  updateUser(userId: string, updatedUser: UserDto): Observable<UserDto> {
    return this.GetUsers().pipe(
      exhaustMap(users=>{
        const id = users.find(u=>u.localId == userId)?.id;
        return this.http.put<UserDto>(environment.firebaseConfig.databaseURL + '/users/' + id + '.json', updatedUser)
      })
    );
  }
}

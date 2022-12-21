import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Content } from './Content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  allContents = new BehaviorSubject<Content[]>([]);

  constructor(private http: HttpClient) {
    this.getContents().subscribe(contents => {
      console.log(contents);
      this.allContents.next(contents);
    })
  }

  createContent(content: Content): Observable<Content> {
    return this.http.post<Content>(environment.firebaseConfig.databaseURL + '/contents.json', content).pipe(
      tap(c => {
        let _contents = this.allContents.getValue();
        _contents.push(content);
        this.allContents.next(_contents);
      })
    );
  }

  getContents(): Observable<Content[]> {
    return this.http.get<Content[]>(environment.firebaseConfig.databaseURL + '/contents.json').pipe(
      map(contents => {
        let newContents: Content[] = [];

        for (let key in contents) {
          console.log(contents[key]);
          newContents.push({ ...contents[key], id: key })
        }

        return newContents;
      })
    );
  }

  deleteContent(content: Content): Observable<Content> {
    return this.http.delete<Content>(environment.firebaseConfig.databaseURL + '/contents/' + content.id + '.json').pipe(
      tap(c => {
        let _contents = this.allContents.getValue();
        _contents.splice(_contents.findIndex(c => c.id == content.id),1)
      })
    );
  }
}

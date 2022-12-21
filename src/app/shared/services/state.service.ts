import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  _loading = new BehaviorSubject(false);

  darkMode = new BehaviorSubject(true);

  constructor() {
    const _darkMode = JSON.parse(localStorage.getItem('darkMode')!);
    this.darkMode.next(_darkMode);
  }

  setLoading(state: boolean) {
    this._loading.next(state);
  }
}

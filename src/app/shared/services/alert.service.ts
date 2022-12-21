import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  success(message: string) {
    this._snackBar.open(message, '', {
      duration: 7500,
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  error(message: string) {
    this._snackBar.open(message, '', {
      duration: 7500,
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-warn'],
    });
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreServiceService {

  constructor(private _snackbar: MatSnackBar) { }


  openSnackBar(message: string, action: string = 'ok') {
    this._snackbar.open(message,action, {
      duration: 1000,
      verticalPosition: 'top'
    })
  }
}

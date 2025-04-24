import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {
  private isFormVisibleSource = new BehaviorSubject<boolean>(false);
  isFormVisible$ = this.isFormVisibleSource.asObservable();

  constructor() { }

  showForm() {
    this.isFormVisibleSource.next(true);
  }

  hideForm() {
    this.isFormVisibleSource.next(false);
  }
}

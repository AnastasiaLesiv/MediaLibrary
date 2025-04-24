import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadFoldersListService {
  private isFormVisibleSource = new BehaviorSubject<boolean>(false);
  reloadFolders$ = this.isFormVisibleSource.asObservable();
  constructor() { }

  reloadFolder() {
    this.isFormVisibleSource.next(true);
  }
}

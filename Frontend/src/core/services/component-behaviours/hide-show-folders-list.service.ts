import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideShowFoldersListService {
  private isFoldersListVisibleSouce = new BehaviorSubject<boolean>(true);
  isFoldersListVisible$ = this.isFoldersListVisibleSouce.asObservable();

  constructor() { }

  showFoldersList() {
    this.isFoldersListVisibleSouce.next(true);
  }

  hideFoldersList() {
    this.isFoldersListVisibleSouce.next(false);
  }
}

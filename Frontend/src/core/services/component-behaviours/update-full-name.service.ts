import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateFullNameService {
 private updatedFullName = new BehaviorSubject<string>("");
 updatedFullName$ = this.updatedFullName.asObservable();

  constructor() { }

  getUpdatedName(name: string){
    this.updatedFullName.next(name)
  }
}

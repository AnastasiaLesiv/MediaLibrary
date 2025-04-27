import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/auth/user.model';
import { Observable } from 'rxjs';
import { UserUpdate } from '../../interfaces/auth/user-update.model';
import { Folder } from '../../interfaces/folders/folder.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   private baseUrl: string = "http://localhost:5204"
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  
    constructor(private client: HttpClient) { }
  

  getUserById(id: string): Observable<User> {
    return this.client.get<User>(`${this.baseUrl}/api/Users/${id}`);
  }

  putUser(id: string, user: UserUpdate){
    return this.client.put(`${this.baseUrl}/api/Users/${id}`, user, this.httpOptions);
  }

  deleteUser(id: string){
    return this.client.delete(`${this.baseUrl}/api/Users/${id}`)
  }

  getUserFolders(): Observable<Folder[]>{
    return this.client.get<Folder[]>(`${this.baseUrl}/api/Users/folders`)
  }

  getOwnData(): Observable<User>{
    return this.client.get<User>(`${this.baseUrl}/api/Users/me`)
  }

}

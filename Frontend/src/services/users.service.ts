import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../interfaces/response-dtos/user-dto';
import { Observable } from 'rxjs';
import { UserEdit } from '../interfaces/edition-models/user-edit';
import { FolderDto } from '../interfaces/response-dtos/folder-dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   private baseUrl: string = "http://localhost:5204"
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  
    constructor(private client: HttpClient) { }
  

  getUserById(id: string): Observable<UserDto> {
    return this.client.get<UserDto>(`${this.baseUrl}/api/Users/${id}`);
  }

  putUser(id: string, user: UserEdit){
    return this.client.put(`${this.baseUrl}/api/Users/${id}`, user, this.httpOptions);
  }

  deleteUser(id: string){
    return this.client.delete(`${this.baseUrl}/api/Users/${id}`)
  }

  getUserFolders(): Observable<FolderDto[]>{
    return this.client.get<FolderDto[]>(`${this.baseUrl}/api/Users/folders`)
  }

  getOwnData(): Observable<UserDto>{
    return this.client.get<UserDto>(`${this.baseUrl}/api/Users/me`)
  }

}

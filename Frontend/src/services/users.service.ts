import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../interfaces/response-dtos/user-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = "http://localhost:5204";

  constructor(private client: HttpClient) { }

  getUserById(id: string): Observable<UserDto> {
    return this.client.get<UserDto>(`${this.baseUrl}/api/Users/${id}`);
  }

}

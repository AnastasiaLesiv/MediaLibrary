import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDto } from '../../interfaces/mediafiles/category-dto';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from '../../interfaces/mediafiles/create-category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   private baseUrl: string = "http://localhost:5204"
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

  constructor(private client: HttpClient) { }


  getCategory(): Observable<CategoryDto[]>{
    return this.client.get<CategoryDto[]>(`${this.baseUrl}/api/Categories`)
  }

  postCategory(category: CreateCategoryDto): Observable<number>{
    return this.client.post<number>(`${this.baseUrl}/api/Categories`, category, this.httpOptions)
  }
}

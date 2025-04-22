import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ebook } from '../interfaces/creation-models/ebook';
import { Observable } from 'rxjs';
import { EbookEdit } from '../interfaces/edition-models/ebook-edit';
import { UpdateEbookDto } from '../interfaces/update-dtos/update-ebook-dto';

@Injectable({
  providedIn: 'root'
})
export class EbookService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

constructor(private client: HttpClient) { }

  postEbook(ebook: Ebook){
    return this.client.post(`${this.baseUrl}/api/Ebooks`, ebook, this.httpOptions)
  }

  getEbookByid(id: number): Observable<UpdateEbookDto>{
    return this.client.get<UpdateEbookDto>(`${this.baseUrl}/api/Ebooks/${id}`);
  }

  putEbook(id: number, ebook: EbookEdit){
    return this.client.put(`${this.baseUrl}/api/Ebooks/${id}`, ebook, this.httpOptions);
  }

  deleteEbook(id: number){
    return this.client.delete(`${this.baseUrl}/api/Ebooks/${id}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEbook } from '../../interfaces/mediafiles/create-ebook.model';
import { Observable } from 'rxjs';
import { EbookUpdate } from '../../interfaces/mediafiles/ebook-update.model';
import { Ebook } from '../../interfaces/mediafiles/ebook.model';

@Injectable({
  providedIn: 'root'
})
export class EbookService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

constructor(private client: HttpClient) { }

  postEbook(ebook: CreateEbook){
    return this.client.post(`${this.baseUrl}/api/Ebooks`, ebook, this.httpOptions)
  }

  getEbookByid(id: number): Observable<Ebook>{
    return this.client.get<Ebook>(`${this.baseUrl}/api/Ebooks/${id}`);
  }

  putEbook(id: number, ebook: EbookUpdate){
    return this.client.put(`${this.baseUrl}/api/Ebooks/${id}`, ebook, this.httpOptions);
  }

  deleteEbook(id: number){
    return this.client.delete(`${this.baseUrl}/api/Ebooks/${id}`);
  }
}

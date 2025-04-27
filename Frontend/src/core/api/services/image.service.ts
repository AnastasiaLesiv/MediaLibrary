import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateImage } from '../../interfaces/mediafiles/create-image.model';
import { ImageUpdate } from '../../interfaces/mediafiles/image-update.model';
import { Observable } from 'rxjs';
import { Image } from '../../interfaces/mediafiles/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }

  postImage(image: CreateImage){
    return this.client.post(`${this.baseUrl}/api/Images`, image, this.httpOptions)
  }

  getImageByid(id: number): Observable<Image>{
    return this.client.get<Image>(`${this.baseUrl}/api/Images/${id}`);
  }

  putImage(id: number, image: ImageUpdate){
    return this.client.put(`${this.baseUrl}/api/Images/${id}`, image, this.httpOptions)
  }

  deleteImage(id: number){
    return this.client.delete(`${this.baseUrl}/api/Images/${id}`);
  }
}

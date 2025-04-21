import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../interfaces/creation-models/image';
import { ImageEdit } from '../interfaces/edition-models/image-edit';
import { UpdateImageDto } from '../interfaces/update-dtos/update-image-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }

  postImage(image: Image){
    return this.client.post(`${this.baseUrl}/api/Images`, image, this.httpOptions)
  }

  getImageByid(id: number): Observable<UpdateImageDto>{
    return this.client.get<UpdateImageDto>(`${this.baseUrl}/api/Images/${id}`);
  }

  putImage(id: number, image: ImageEdit){
    return this.client.put(`${this.baseUrl}/api/Images/${id}`, image, this.httpOptions)
  }

  deleteImage(id: number){
    return this.client.delete(`${this.baseUrl}/api/Images/${id}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../interfaces/creation-models/video';
import { UpdateVideoDto } from '../interfaces/update-dtos/update-video-dto';
import { Observable } from 'rxjs';
import { VideoEdit } from '../interfaces/edition-models/video-edit';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  constructor(private client: HttpClient) { }

  postVideo(video: Video){
    return this.client.post(`${this.baseUrl}/api/Videos`, video, this.httpOptions)
  }

  getVideoByid(id: number): Observable<UpdateVideoDto>{
    return this.client.get<UpdateVideoDto>(`${this.baseUrl}/api/Videos/${id}`);
  }

  putVideo(id: number, video: VideoEdit){
    return this.client.put(`${this.baseUrl}/api/Videos/${id}`, video, this.httpOptions)
  }

  deleteVideo(id: number){
    return this.client.delete(`${this.baseUrl}/api/Videos/${id}`);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateVideo } from '../../interfaces/mediafiles/create-video,model';
import { Observable } from 'rxjs';
import { VideoUpdate } from '../../interfaces/mediafiles/video-update.model';
import { Video } from '../../interfaces/mediafiles/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  constructor(private client: HttpClient) { }

  postVideo(video: CreateVideo){
    return this.client.post(`${this.baseUrl}/api/Videos`, video, this.httpOptions)
  }

  getVideoByid(id: number): Observable<Video>{
    return this.client.get<Video>(`${this.baseUrl}/api/Videos/${id}`);
  }

  putVideo(id: number, video: VideoUpdate){
    return this.client.put(`${this.baseUrl}/api/Videos/${id}`, video, this.httpOptions)
  }

  deleteVideo(id: number){
    return this.client.delete(`${this.baseUrl}/api/Videos/${id}`);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAudio } from '../../interfaces/mediafiles/create-audio.model';
import { Observable } from 'rxjs';
import { AudioUpdate } from '../../interfaces/mediafiles/audio-update.model';
import { Audio } from '../../interfaces/mediafiles/audio.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }

  postAudio(audio: CreateAudio){
    return this.client.post(`${this.baseUrl}/api/Audios`, audio, this.httpOptions)
  }

  getAudioByid(id: number): Observable<Audio>{
    return this.client.get<Audio>(`${this.baseUrl}/api/Audios/${id}`);
  }

  putAudio(id: number, audio: AudioUpdate){
    return this.client.put(`${this.baseUrl}/api/Audios/${id}`, audio, this.httpOptions);
  }

  deleteAudio(id: number){
    return this.client.delete(`${this.baseUrl}/api/Audios/${id}`);
  }

}

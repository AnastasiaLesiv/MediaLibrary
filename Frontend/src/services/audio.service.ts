import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Audio } from '../interfaces/creation-models/audio';
import { Observable } from 'rxjs';
import { AudioEdit } from '../interfaces/edition-models/audio-edit';
import { UpdateAudioDto } from '../interfaces/update-dtos/update-audio-dto';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }

  postAudio(audio: Audio){
    return this.client.post(`${this.baseUrl}/api/Audios`, audio, this.httpOptions)
  }

  getAudioByid(id: number): Observable<UpdateAudioDto>{
    return this.client.get<UpdateAudioDto>(`${this.baseUrl}/api/Audios/${id}`);
  }

  putAudio(id: number, audio: AudioEdit){
    return this.client.put(`${this.baseUrl}/api/Audios/${id}`, audio, this.httpOptions);
  }

  deleteAudio(id: number){
    return this.client.delete(`${this.baseUrl}/api/Audios/${id}`);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateFolder } from '../interfaces/creation-dtos/create-folder';
import { FolderDto } from '../interfaces/response-dtos/folder-dto';
import { Observable } from 'rxjs';
import { AddAudioToFolder } from '../interfaces/creation-dtos/add-audio-to-folder';
import { AddEbookToFolder } from '../interfaces/creation-dtos/add-ebook-to-folder';
import { AddVideoToFolder } from '../interfaces/creation-dtos/add-video-to-folder';
import { AddImageToFolder } from '../interfaces/creation-dtos/add-image-to-folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private baseUrl: string = "http://localhost:5204";

  constructor(private client: HttpClient) { }

  getFolderById(id: number) : Observable<FolderDto>{
    return this.client.get<FolderDto>(`${this.baseUrl}/api/Folders/${id}`)
  }

  postFolder(folder: CreateFolder){
    return this.client.post(`${this.baseUrl}/api/Folders`, folder, this.httpOptions)
  }

  deleteFolder(id: number){
    return this.client.delete(`${this.baseUrl}/api/Folders/${id}`)
  }

  addAudioToFolder(audioToFolder: AddAudioToFolder){
    return this.client.post(`${this.baseUrl}/AddAudioToFolder`, audioToFolder, this.httpOptions)
  }

  addEbookToFolder(ebookToFolder: AddEbookToFolder){
    return this.client.post(`${this.baseUrl}/AddEbookToFolder`, ebookToFolder, this.httpOptions)
  }

  addVideoToFolder(videoToFolder: AddVideoToFolder){
    return this.client.post(`${this.baseUrl}/AddVideoToFolder`, videoToFolder, this.httpOptions)
  }

  addImageToFolder(imageToFolder: AddImageToFolder){
    return this.client.post(`${this.baseUrl}/AddImageToFolder`, imageToFolder, this.httpOptions)
  }

  deleteAudioFromFolder(folderId:number, audioId: number){
    return this.client.delete(`${this.baseUrl}/DeleteAudioFromFolder/${folderId}/${audioId}`)
  }

  deleteEbookFromFolder(folderId:number, ebookId: number){
    return this.client.delete(`${this.baseUrl}/DeleteEbookFromFolder/${folderId}/${ebookId}`)
  }

  deleteImageFromFolder(folderId:number, imageId: number){
    return this.client.delete(`${this.baseUrl}/DeleteImageFromFolder/${folderId}/${imageId}`)
  }

  deleteVideoFromFolder(folderId:number, videoId: number){
    return this.client.delete(`${this.baseUrl}/DeleteVideoFromFolder/${folderId}/${videoId}`)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateFolder } from '../../interfaces/folders/create-folder.model';
import { Folder } from '../../interfaces/folders/folder.model';
import { Observable } from 'rxjs';
import { AddAudioToFolder } from '../../interfaces/folders/add-audio-to-folder.model';
import { AddEbookToFolder } from '../../interfaces/folders/add-ebook-to-folder.model';
import { AddVideoToFolder } from '../../interfaces/folders/add-video-to-folder.model';
import { AddImageToFolder } from '../../interfaces/folders/add-image-to-folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private baseUrl: string = "http://localhost:5204";

  constructor(private client: HttpClient) { }

  getFolderById(id: number) : Observable<Folder>{
    return this.client.get<Folder>(`${this.baseUrl}/api/Folders/${id}`)
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

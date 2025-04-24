import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FolderDto } from '../../../interfaces/response-dtos/folder-dto';
import { FolderService } from '../../../services/folder.service';
import { AddAudioToFolder } from '../../../interfaces/creation-dtos/add-audio-to-folder';
import { MediaType } from '../../../core/enums/media-type';
import { AddEbookToFolder } from '../../../interfaces/creation-dtos/add-ebook-to-folder';
import { AddImageToFolder } from '../../../interfaces/creation-dtos/add-image-to-folder';
import { AddVideoToFolder } from '../../../interfaces/creation-dtos/add-video-to-folder';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-media-to-folder',
  imports: [NgbDropdownModule],
  templateUrl: './add-media-to-folder.component.html',
  styleUrls: ['./add-media-to-folder.component.css']
})
export class AddMediaToFolderComponent implements OnInit {
  @Input() foldersList: FolderDto[] = [];
  @Input() mediaFileId?: number;
  @Input() mediaType?: MediaType;
  @Output() successfullOperation = new EventEmitter<boolean>();

  mediaTypes = MediaType;

  constructor(private folderService: FolderService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addMediaToFolder(folderId: number){
    switch(this.mediaType){
      case this.mediaTypes.Audio: 
        this.addAudioToFolder(folderId)    
        break;

      case this.mediaTypes.Ebook:
        this.addEbookToFolder(folderId)
        break;

      case this.mediaTypes.Image:
        this.addImageToFolder(folderId)
        break;

      case this.mediaTypes.Video:
        this.addVideoToFolder(folderId)
        break;
    } 
  }

  isMefiaFileInFolder(folder: FolderDto): boolean {
    switch(this.mediaType){
      case this.mediaTypes.Audio:
        return folder.audios!.some(a => a.id === this.mediaFileId)
      case this.mediaTypes.Ebook:
        return folder.ebooks!.some(e => e.id === this.mediaFileId)
      case this.mediaTypes.Image:
        return folder.images!.some(i => i.id === this.mediaFileId)
      case this.mediaTypes.Video:
        return folder.videos!.some(v => v.id === this.mediaFileId)
    }
    return false;
  }

  removeMediaFromFolder(folderId: number) {
    switch(this.mediaType){
      case this.mediaTypes.Audio:
        this.folderService.deleteAudioFromFolder(folderId, this.mediaFileId!).subscribe(response => {
          this.successfullOperation.emit();
          this.sucessDeletedNotification(folderId);
        })
        break;
      case this.mediaTypes.Ebook:
        this.folderService.deleteEbookFromFolder(folderId, this.mediaFileId!).subscribe(response => {
          this.successfullOperation.emit();
          this.sucessDeletedNotification(folderId);
        })
        break;

      case this.mediaTypes.Image:
        this.folderService.deleteImageFromFolder(folderId, this.mediaFileId!).subscribe(response => {
          this.successfullOperation.emit();
          this.sucessDeletedNotification(folderId);
        })
        break;

      case this.mediaTypes.Video:
        this.folderService.deleteVideoFromFolder(folderId, this.mediaFileId!).subscribe(response => {
          this.successfullOperation.emit();
          this.sucessDeletedNotification(folderId);
        })
        break;
    }
  }


  addAudioToFolder(folderId: number){
    let audioToFolder: AddAudioToFolder = {
      audioId: this.mediaFileId!,
      folderId: folderId
    }
    this.folderService.addAudioToFolder(audioToFolder).subscribe(response =>{
      this.sucessAddedNotification(folderId)
      this.successfullOperation.emit()
    });
  }

  addEbookToFolder(folderId: number){
    let ebookToFolder: AddEbookToFolder = {
      ebookId: this.mediaFileId!,
      folderId: folderId
    }
    this.folderService.addEbookToFolder(ebookToFolder).subscribe(response => {
      this.sucessAddedNotification(folderId)
      this.successfullOperation.emit()
    })
  }

  addImageToFolder(folderId: number) {
    let imageToFolder: AddImageToFolder = {
      imageId: this.mediaFileId!,
      folderId: folderId
    }
    this.folderService.addImageToFolder(imageToFolder).subscribe(response => {
      this.sucessAddedNotification(folderId)
      this.successfullOperation.emit()
    })
  }

  addVideoToFolder(folderId: number){
    let videoToFolder: AddVideoToFolder = {
      videoId: this.mediaFileId!,
      folderId: folderId
    }
    this.folderService.addVideoToFolder(videoToFolder).subscribe(response => {
      this.sucessAddedNotification(folderId)
      this.successfullOperation.emit()
    }
    )
  }
  sucessAddedNotification(folderId: number){
    this.toastr.success(`Media added to folder: ${this.foldersList.find(f => f.id === folderId)?.name}`)
  }

  sucessDeletedNotification(folderId: number){
    this.toastr.success(`Media deleted from folder: ${this.foldersList.find(f => f.id === folderId)?.name}`)
  }
}

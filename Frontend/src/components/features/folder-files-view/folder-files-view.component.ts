import { Component, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { MediaFilesTableComponent } from '../media-files-table/media-files-table.component';
import { Router } from '@angular/router';
import { EbookDto } from '../../../interfaces/creation-dtos/ebook-dto';
import { MediaFile } from '../../../interfaces/creation-dtos/media-file';
import { MediaType } from '../../../core/enums/media-type';
import { VideoDto } from '../../../interfaces/creation-dtos/video-dto';
import { ImageDto } from '../../../interfaces/creation-dtos/image-dto';
import { AudioDto } from '../../../interfaces/creation-dtos/audio-dto';
import { FolderService } from '../../../services/folder.service';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReloadFoldersListService } from '../../../component-services/reload-folders-list.service';
import { UsersService } from '../../../services/users.service';
import { FolderDto } from '../../../interfaces/response-dtos/folder-dto';

@Component({
  selector: 'app-folder-files-view',
  imports: [MediaFilesTableComponent, NgbDropdownModule],
  templateUrl: './folder-files-view.component.html',
  styleUrls: ['./folder-files-view.component.css']
})
export class FolderFilesViewComponent implements OnInit, OnChanges {
  @Input() id?: number;
  mediaFiles: MediaFile[] = [];
  userFolders: FolderDto[] = [];

  folderName?: string;
  
  
  constructor(private folderService: FolderService, 
              private router: Router,
              private modalService: NgbModal,
              private reloadFoldersService: ReloadFoldersListService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.reloadMediaFiles();
    this.getUserFoldersData();
  }

  getUserFoldersData() {
    this.usersService.getUserFolders()
      .subscribe(response => this.userFolders = response);
  }

  ngOnChanges() {
    this.reloadMediaFiles();
  }

  transformToMediaFileList(audios: AudioDto[], images: ImageDto[], videos: VideoDto[], ebooks:EbookDto[]) {
    var mediaFileAudios = audios.map(this.audioToMediaFile);
    var mediaFileImages = images.map(this.imageToMediaFile);
    var mediaFileVideos = videos.map(this.videoToMediaFile);
    var mediaFileEbooks = ebooks.map(this.ebookToMediaFile);

    this.mediaFiles = [...mediaFileAudios, ...mediaFileImages, ...mediaFileVideos, ...mediaFileEbooks];
  }

  audioToMediaFile(a: AudioDto): MediaFile {
      var mediaFile: MediaFile = {
        id: a.id,
        author: a.artist,
        categoryName: a.categoryName,
        format: a.format,
        mediaType: MediaType.Audio,
        title: a.title,
        uploadDate: a.uploadDate,
        duration: a.duration
      };
        return mediaFile;
    }
  
    imageToMediaFile(i: ImageDto): MediaFile{
      var mediaFile: MediaFile = {
        id: i.id,
        author: i.author,
        categoryName: i.categoryName,
        format: i.format,
        mediaType: MediaType.Image,
        title: i.title,
        uploadDate: i.uploadDate,
      };
        return mediaFile;
    }
  
    videoToMediaFile(v: VideoDto): MediaFile{
      var mediaFile: MediaFile = {
        id: v.id,
        author: v.author,
        categoryName: v.categoryName,
        format: v.format,
        mediaType: MediaType.Video,
        title: v.title,
        uploadDate: v.uploadDate,
        duration: v.duration
      };
        return mediaFile;
    }
  
    ebookToMediaFile(e: EbookDto): MediaFile{
      var mediaFile: MediaFile = {
        id: e.id,
        author: e.author,
        categoryName: e.categoryName,
        format: e.format,
        mediaType: MediaType.Ebook,
        title: e.title,
        uploadDate: e.uploadDate,
        pageCount: e.pageCount
      };
        return mediaFile;
    }
  

  reloadMediaFiles(){
    this.folderService.getFolderById(this.id!) 
      .subscribe(response => {
        this.folderName = response.name;
        this.transformToMediaFileList(response.audios!, response.images!, response.videos!, response.ebooks!);
      });
    this.getUserFoldersData();
  }

  deleteFolder(){
    this.folderService.deleteFolder(this.id!).subscribe(response =>{
      this.reloadFoldersService.reloadFolder();
      this.router.navigateByUrl("")
    });
  }

  open(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then( result =>{
          if(result === "Save click"){
            this.deleteFolder();
          }
        }
      );
    }
}

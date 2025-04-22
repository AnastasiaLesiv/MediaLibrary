import { Component, OnInit, TemplateRef } from '@angular/core';
import { MediaFilesTableComponent } from '../media-files-table/media-files-table.component';
import { UsersService } from '../../../services/users.service';
import { EbookDto } from '../../../interfaces/creation-dtos/ebook-dto';
import { MediaFile } from '../../../interfaces/creation-dtos/media-file';
import { MediaType } from '../../../core/enums/media-type';
import { VideoDto } from '../../../interfaces/creation-dtos/video-dto';
import { ImageDto } from '../../../interfaces/creation-dtos/image-dto';
import { AudioDto } from '../../../interfaces/creation-dtos/audio-dto';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FolderDto } from '../../../interfaces/response-dtos/folder-dto';
import { CommonModule } from '@angular/common';
import { AppGlobalConstants } from '../../../core/global/global-variables';

@Component({
  selector: 'app-user-files-view',
  imports: [MediaFilesTableComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './user-files-view.component.html',
  styleUrls: ['./user-files-view.component.css']
})
export class UserFilesViewComponent implements OnInit {
  tableActionsTemplate!: TemplateRef<any>;

  mediaFiles: MediaFile[] = [];
  folders: FolderDto[] = [];

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;
  
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.reloadMediaFiles();
  }

  reloadMediaFiles(){
    this.usersService.getUserById(this.userId).subscribe(response => {
      this.transformToMediaFileList(response.audios!, response.images!, response.videos!, response.ebooks!);
      this.folders = response.folders!;
    });
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

  handleTableActionsTemplate(template: TemplateRef<any>) {
    this.tableActionsTemplate = template;
  }
}

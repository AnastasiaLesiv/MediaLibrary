import { Component, Input, OnInit } from '@angular/core';
import { MediaFilesTableComponent } from '../media-files-table/media-files-table.component';
import { UsersService } from '../../../services/users.service';
import { EbookDto } from '../../../interfaces/creation-dtos/ebook-dto';
import { MediaFile } from '../../../interfaces/creation-dtos/media-file';
import { MediaType } from '../../../enums/media-type';
import { VideoDto } from '../../../interfaces/creation-dtos/video-dto';
import { ImageDto } from '../../../interfaces/creation-dtos/image-dto';
import { AudioDto } from '../../../interfaces/creation-dtos/audio-dto';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FolderDto } from '../../../interfaces/response-dtos/folder-dto';

@Component({
  selector: 'app-user-files-view',
  imports: [MediaFilesTableComponent, RouterLink, RouterLinkActive],
  templateUrl: './user-files-view.component.html',
  styleUrls: ['./user-files-view.component.css']
})
export class UserFilesViewComponent implements OnInit {
  mediaFiles: MediaFile[] = [];
  folders: FolderDto[] = [];
  
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.reloadMediaFiles();
  }

  reloadMediaFiles(){
    this.usersService.getUserById('EF9B9230-51B7-4270-513D-08DD80D8D7F1').subscribe(response => {
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
}

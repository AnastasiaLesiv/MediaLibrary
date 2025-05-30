import { Component, EventEmitter, Input, OnInit, Output, PipeTransform, SimpleChanges, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MediaFile } from '../../../../core/interfaces/mediafiles/media-file.model';
import { MediaType } from '../../../../core/enums/media-type';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AudioService } from '../../../../core/api/services/audio.service';
import { ImageService } from '../../../../core/api/services/image.service';
import { VideoService } from '../../../../core/api/services/video.service';
import { EbookService } from '../../../../core/api/services/ebook.service';
import { NgbDropdownModule, NgbHighlight, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Folder } from '../../../../core/interfaces/folders/folder.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddMediaToFolderComponent } from '../add-media-to-folder/add-media-to-folder.component';

@Component({
  selector: 'app-media-files-table',
  imports: [DatePipe, RouterLink, RouterLinkActive, SlicePipe, 
    NgbPaginationModule, AddMediaToFolderComponent, ReactiveFormsModule, 
    NgbHighlight, NgbDropdownModule],
  templateUrl: './media-files-table.component.html',
  styleUrls: ['./media-files-table.component.css']
})
export class MediaFilesTableComponent{
  @Input() tablemediaFiles: MediaFile[] = [];
  @Input() folderList: Folder[] = [];
  @Output() refreshMediaFilesTable = new EventEmitter<boolean>();
  mediaTypes = MediaType;

  page: number = 1;
  pageSize: number = 5;

  filter = new FormControl('', { nonNullable: true });
  filteredMediaFiles: MediaFile[] = [];
  selectedMediaType?: MediaType;

  constructor(private audioService: AudioService,
              private imageService: ImageService,
              private videoService: VideoService,
              private ebookService: EbookService,
              private modalService: NgbModal,
  ) { 
    this.filter.valueChanges.subscribe(text => { 
      this.filteredMediaFiles = this.search(text);
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tablemediaFiles']) {
      this.filteredMediaFiles = this.tablemediaFiles;
      this.applyFilter();
    }
  }

  deleteMediaFile(id: number, mediaTypeToDelete: MediaType): void{
    if(mediaTypeToDelete === this.mediaTypes.Audio){
      this.audioService.deleteAudio(id).subscribe(response => this.refreshMediaFiles());
    }
    else if (mediaTypeToDelete === this.mediaTypes.Image){
      this.imageService.deleteImage(id).subscribe(response => this.refreshMediaFiles());
    }
    else if (mediaTypeToDelete === this.mediaTypes.Video){
      this.videoService.deleteVideo(id).subscribe(response => this.refreshMediaFiles());
    }
    else if (mediaTypeToDelete === this.mediaTypes.Ebook){
      this.ebookService.deleteEbook(id).subscribe(response => this.refreshMediaFiles());
    }
  }

  refreshMediaFiles(){
    this.refreshMediaFilesTable.emit();
  }

  open(content: TemplateRef<any>, id: number, mediaType: MediaType) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then( result =>{
        if(result === "Save click"){
          this.deleteMediaFile(id, mediaType);
        }
      }
		);
	}

  search(text: string): MediaFile[] {
    let dataToFilter = this.selectedMediaType 
                        ? this.tablemediaFiles.filter(mediaFile => mediaFile.mediaType === this.selectedMediaType) 
                        : this.tablemediaFiles;
    return dataToFilter.filter((mediaFile) => {
      const term = text.toLowerCase();
      return (
        mediaFile.title.toLowerCase().includes(term) ||
        mediaFile.author.includes(term) ||
        mediaFile.categoryName.includes(term)
      );
    });
  }

  setMediaTypeFilter(mediaType: MediaType) {
    this.selectedMediaType = mediaType;
    this.applyFilter();
  }

  clearMediaTypeFilter() {
    this.selectedMediaType = undefined; 
    this.applyFilter(); 
  }

  applyFilter() {
    if (this.selectedMediaType) {
      this.filteredMediaFiles = this.tablemediaFiles.filter(mediaFile => mediaFile.mediaType === this.selectedMediaType);
    } else {
      this.filteredMediaFiles = this.tablemediaFiles; 
    }
    this.page = 1;
  }

  getMediaTypeName(mediaType: number): string {
    return MediaType[mediaType];
  }
}



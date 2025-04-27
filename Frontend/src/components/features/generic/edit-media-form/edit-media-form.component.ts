import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AudioUpdate } from '../../../../core/interfaces/mediafiles/audio-update.model';
import { ImageUpdate } from '../../../../core/interfaces/mediafiles/image-update.model';
import { VideoUpdate } from '../../../../core/interfaces/mediafiles/video-update.model';
import { EbookUpdate } from '../../../../core/interfaces/mediafiles/ebook-update.model';
import { CreateCategoryDto } from '../../../../core/interfaces/mediafiles/create-category-dto';
import { CategoryDto } from '../../../../core/interfaces/mediafiles/category-dto';
import { MediaType } from '../../../../core/enums/media-type';
import { EbookService } from '../../../../core/api/services/ebook.service';
import { AudioService } from '../../../../core/api/services/audio.service';
import { ImageService } from '../../../../core/api/services/image.service';
import { VideoService } from '../../../../core/api/services/video.service';
import { CategoryService } from '../../../../core/api/services/category.service';

@Component({
  selector: 'app-edit-media-form',
  imports: [FormsModule],
  templateUrl: './edit-media-form.component.html',
  styleUrls: ['./edit-media-form.component.css']
})
export class EditMediaFormComponent implements OnInit {
  @Input() set mediaType(mediaType: string) {
    this.selectedMediaType = parseInt(mediaType);
  }
  @Input() id?: number;

  audioModel: AudioUpdate;
  imageModel: ImageUpdate;
  videoModel: VideoUpdate;
  ebookModel: EbookUpdate;

  title?: string = undefined;
  author?: string = undefined;
  format?: string = undefined;
  duration?: number = undefined;
  customCategory: string = "";
  categoryModel: CreateCategoryDto;

  categoryList: CategoryDto[] = []

  mediaTypes = MediaType;
  selectedMediaType?: MediaType;

  constructor(private toastr: ToastrService,
              private audioService: AudioService,
              private ebookService: EbookService,
              private imageService: ImageService,
              private videoService: VideoService,
              private categoryService: CategoryService,
              private router: Router,
              private modalService: NgbModal) {
    this.audioModel ={
      artist: undefined,
      title: undefined,
      format: undefined,
      duration: undefined,
      categoryId: undefined
    }
    this.imageModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      categoryId: undefined
    }
    this.videoModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      duration: undefined,
      categoryId: undefined
    }
    this.ebookModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      pageCount: undefined,
      categoryId: undefined
    }
    this.categoryModel ={
      categoryName: undefined
    }
  }

  ngOnInit() {
    this.categoryService.getCategory()
    .subscribe(response => {
      this.categoryList = response;
    })
    switch(this.selectedMediaType){
      case MediaType.Audio:
        this.audioService.getAudioByid(this.id!)
          .subscribe(response => {
            this.title = response.title;
            this.format = response.format;
            this.duration = response.duration;
            this.customCategory = response.categoryName;
            this.audioModel = {
              artist: response.artist,
              title: response.title,
              format: response.format,
              duration: response.duration,
              categoryId: response.categoryId
            };
          });
        break;

      case MediaType.Image:
        this.imageService.getImageByid(this.id!)
          .subscribe(response =>{
            this.title = response.title;
            this.author = response.author;
            this.format = response.format;
            this.customCategory = response.categoryName;
            this.imageModel = {
              author: response.author,
              title: response.title,
              format: response.format,
              categoryId: response.categoryId
            };
          })
        break;

      case MediaType.Video:
        this.videoService.getVideoByid(this.id!)
          .subscribe(response =>{
            this.title = response.title;
            this.author = response.author;
            this.format = response.format;
            this.duration = response.duration;
            this.customCategory = response.categoryName;
            this.videoModel = {
              author: response.author,
              title: response.title,
              format: response.format,
              duration: response.duration,
              categoryId: response.categoryId
            };
          })
        break;

      case MediaType.Ebook:
        this.ebookService.getEbookByid(this.id!)
          .subscribe(response => {
            this.title = response.title;
            this.author = response.author;
            this.format = response.format;
            this.customCategory = response.categoryName;
            this.ebookModel = {
              author: response.author,
              title: response.title,
              format: response.format,
              pageCount: response.pageCount,
              categoryId: response.categoryId
            };
          })
        break;
    }
  }

  updateMediaFile(mediaType: MediaType){
    switch(mediaType){
      case this.mediaTypes.Audio:
        this.audioModel.duration = this.duration;
        this.audioModel.format = this.format;
        this.audioModel.title = this.title;
        this.getCategoryId().subscribe(response => {
          this.audioModel.categoryId = response;
          this.audioService.putAudio(this.id!, this.audioModel)
          .subscribe(response => {
            this.toastr.success("Audio was updated");
            this.goBack();
          });
        });
        break;
      case  this.mediaTypes.Video:
        this.videoModel.author = this.author;
        this.videoModel.format = this.format;
        this.videoModel.duration = this.duration;
        this.getCategoryId().subscribe(response => {
          this.videoModel.categoryId = response;
          this.videoService.putVideo(this.id!, this.videoModel)
          .subscribe(response => {
            this.toastr.success("Video was updated");
            this.goBack();
          });
        });
        break;
      case this.mediaTypes.Ebook:
        this.ebookModel.author = this.author;
        this.ebookModel.format = this.format;
        this.ebookModel.title = this.title;
        this.getCategoryId().subscribe(response => {
          this.ebookModel.categoryId = response;
          this.ebookService.putEbook(this.id!, this.ebookModel)
          .subscribe(response => {
            this.toastr.success("Ebook was updated");
            this.goBack();
          });
        });
        break;
      case this.mediaTypes.Image:
        this.imageModel.author = this.author;
        this.imageModel.format = this.format;
        this.imageModel.title = this.title;
        this.getCategoryId().subscribe(response => {
          this.imageModel.categoryId = response;
          this.imageService.putImage(this.id!, this.imageModel)
          .subscribe(response => {
            this.toastr.success("Image was updated");
            this.goBack();
          });
        });
        break;
    }
  }

  goBack(){
    this.router.navigateByUrl("");
  }

  getCategoryId(): Observable<number> {
    let category = this.categoryList.find(c => c.categoryName === this.customCategory)
    
    if(!category){
        return this.createCategory();
    }
    
    return of(category!.id);
  }

  createCategory(): Observable<number>{
    this.categoryModel.categoryName = this.customCategory;
    return this.categoryService.postCategory(this.categoryModel);
  }

  open(content: TemplateRef<any>, mediaType: MediaType) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then( result =>{
          if(result === "Confirm click"){
            this.updateMediaFile(mediaType);
          }
        }
      );
    }
}

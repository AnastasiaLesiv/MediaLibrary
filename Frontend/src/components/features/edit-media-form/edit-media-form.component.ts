import { Component, computed, input, Input, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MediaType } from '../../../enums/media-type';
import { AudioEdit } from '../../../interfaces/edition-models/audio-edit';
import { ImageEdit } from '../../../interfaces/edition-models/image-edit';
import { EbookEdit } from '../../../interfaces/edition-models/ebook-edit';
import { VideoEdit } from '../../../interfaces/edition-models/video-edit';
import { AudioService } from '../../../services/audio.service';
import { CategoryDto } from '../../../interfaces/creation-dtos/category-dto';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { EbookService } from '../../../services/ebook.service';
import { VideoService } from '../../../services/video.service';
import { ImageService } from '../../../services/image.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { CreateCategoryDto } from '../../../interfaces/creation-dtos/create-category-dto';

@Component({
  selector: 'app-edit-media-form',
  imports: [FormsModule],
  templateUrl: './edit-media-form.component.html',
  styleUrls: ['./edit-media-form.component.css']
})
export class EditMediaFormComponent implements OnInit {
  @Input() mediaType?: MediaType;
  @Input() id?: number;

  audioModel: AudioEdit;
  imageModel: ImageEdit;
  videoModel: VideoEdit;
  ebookModel: EbookEdit;

  title?: string = undefined;
  author?: string = undefined;
  format?: string = undefined;
  duration?: number = undefined;
  customCategory: string = "";
  categoryModel: CreateCategoryDto;

  categoryList: CategoryDto[] = []

  mediaTypes = MediaType;

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
    switch(this.mediaType!){
      case MediaType.Audio:
        this.audioService.getAudioByid(this.id!)
          .subscribe(response => {
            this.title = response.title;
            this.format = response.format;
            this.duration = response.duration;
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

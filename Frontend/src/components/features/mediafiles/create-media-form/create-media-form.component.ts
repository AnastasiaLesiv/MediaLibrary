import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CreateCategoryDto } from '../../../../core/interfaces/mediafiles/create-category-dto';
import { CategoryDto } from '../../../../core/interfaces/mediafiles/category-dto';
import { MediaType } from '../../../../core/enums/media-type';
import { AppGlobalConstants } from '../../../../core/global/global-variables';
import { CategoryService } from '../../../../core/api/services/category.service';
import { ImageService } from '../../../../core/api/services/image.service';
import { AudioService } from '../../../../core/api/services/audio.service';
import { VideoService } from '../../../../core/api/services/video.service';
import { EbookService } from '../../../../core/api/services/ebook.service';
import { CreateVideo } from '../../../../core/interfaces/mediafiles/create-video,model';
import { CreateEbook } from '../../../../core/interfaces/mediafiles/create-ebook.model';
import { CreateAudio } from '../../../../core/interfaces/mediafiles/create-audio.model';
import { CreateImage } from '../../../../core/interfaces/mediafiles/create-image.model';

@Component({
  selector: 'app-create-media-form',
  imports:[FormsModule],
  templateUrl: './create-media-form.component.html',
  styleUrls: ['./create-media-form.component.css']
})
export class CreateMediaFormComponent implements OnInit {
  audioModel: CreateAudio;
  imageModel: CreateImage;
  videoModel: CreateVideo;
  ebookModel: CreateEbook;
  categoryModel: CreateCategoryDto;

  categoryList: CategoryDto[] = []
  selectedCategoryId: number = 0;
  mediaTypeSelected?: MediaType = undefined;
  customCategory: string = "";
  title?: string = undefined;
  author?: string = undefined;
  format?: string = undefined;
  duration?: number = undefined;

  mediaTypes = MediaType;

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;

  constructor(private categoryService: CategoryService,
              private audioService: AudioService,
              private imageService: ImageService,
              private videoService: VideoService,
              private ebookService: EbookService,
              private router: Router) {
    this.audioModel ={
      artist: undefined,
      title: undefined,
      format: undefined,
      duration: undefined,
      userId: this.userId,
      categoryId: undefined,
      uploadDate: new Date(Date.now())
    }
    this.imageModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      userId: this.userId,
      categoryId: undefined,
      uploadDate: new Date(Date.now())
    }
    this.videoModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      duration: undefined,
      userId: this.userId,
      categoryId: undefined,
      uploadDate: new Date(Date.now())
    }
    this.ebookModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      pageCount: undefined,
      userId: this.userId,
      categoryId: undefined,
      uploadDate: new Date(Date.now())
    }
    this.categoryModel ={
      categoryName: undefined
    }
   }  

  ngOnInit(): void {
    this.categoryService.getCategory()
      .subscribe(response => {
        this.categoryList = response;
      })
  }

  chooseType(mediaType: MediaType){
    this.mediaTypeSelected = mediaType;
  }

  goBack(){
    this.router.navigateByUrl("");
  }

  saveMediaFile(mediaType: MediaType): void{
    switch(mediaType){
      case this.mediaTypes.Audio:
        this.audioModel.title = this.title;
        this.audioModel.duration = this.duration;
        this.audioModel.format = this.format;
        this.getCategoryId().subscribe(response => {
          this.audioModel.categoryId = response;
          this.audioService.postAudio(this.audioModel).subscribe(response => this.goBack());
        });
        break;
      case this.mediaTypes.Image:
        this.imageModel.title = this.title;
        this.imageModel.author = this.author;
        this.imageModel.format = this.format;
        this.getCategoryId().subscribe(response => {
          this.imageModel.categoryId = response;
          this.imageService.postImage(this.imageModel).subscribe(response => this.goBack());
        });
        break;
      case this.mediaTypes.Video:
        this.videoModel.title = this.title;
        this.videoModel.author = this.author;
        this.videoModel.duration = this.duration;
        this.videoModel.format = this.format;
        this.getCategoryId().subscribe(response => {
          this.videoModel.categoryId = response;
          this.videoService.postVideo(this.videoModel).subscribe(response => this.goBack());
        });
        break;
      case this.mediaTypes.Ebook:
        this.ebookModel.title = this.title;
        this.ebookModel.author = this.author;
        this.ebookModel.format = this.format;
        this.getCategoryId().subscribe(response=>{
          this.ebookModel.categoryId = response;
          this.ebookService.postEbook(this.ebookModel).subscribe(response => this.goBack());
        });
        break;
    }
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
}



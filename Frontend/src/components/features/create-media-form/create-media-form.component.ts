import { Component, OnInit } from '@angular/core';
import { Audio } from '../../../interfaces/creation-models/audio';
import { Image } from '../../../interfaces/creation-models/image';
import { Video } from '../../../interfaces/creation-models/video';
import { Ebook } from '../../../interfaces/creation-models/ebook';
import { FormsModule } from '@angular/forms';
import { CategoryDto } from '../../../interfaces/creation-dtos/category-dto';
import { CategoryService } from '../../../services/category.service';
import { MediaType } from '../../../enums/media-type';
import { ImageService } from '../../../services/image.service';
import { VideoService } from '../../../services/video.service';
import { EbookService } from '../../../services/ebook.service';
import { AudioService } from '../../../services/audio.service';
import { Router } from '@angular/router';
import { CreateCategoryDto } from '../../../interfaces/creation-dtos/create-category-dto';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-media-form',
  imports:[FormsModule],
  templateUrl: './create-media-form.component.html',
  styleUrls: ['./create-media-form.component.css']
})
export class CreateMediaFormComponent implements OnInit {
  audioModel: Audio;
  imageModel: Image;
  videoModel: Video;
  ebookModel: Ebook;
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
      userId: 'EF9B9230-51B7-4270-513D-08DD80D8D7F1', //If we have login, it would be logged in User id
      categoryId: undefined,
      uploadDate: new Date(Date.now())
    }
    this.imageModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      userId: 'EF9B9230-51B7-4270-513D-08DD80D8D7F1', //If we have login, it would be logged in User id
      categoryId: undefined,
      uploadDate: new Date(Date.now())
    }
    this.videoModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      duration: undefined,
      userId: 'EF9B9230-51B7-4270-513D-08DD80D8D7F1', //If we have login, it would be logged in User id
      categoryId: undefined,
      uploadDate: new Date(Date.now())
    }
    this.ebookModel ={
      author: undefined,
      title: undefined,
      format: undefined,
      pageCount: undefined,
      userId: 'EF9B9230-51B7-4270-513D-08DD80D8D7F1', //If we have login, it would be logged in User id
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
      case this.mediaTypes.Ebook:
        this.imageModel.title = this.title;
        this.imageModel.author = this.author;
        this.imageModel.format = this.format;
        this.getCategoryId().subscribe(response => {
          this.imageModel.categoryId = response;
          this.imageService.postImage(this.imageModel).subscribe(response => this.goBack());
        });
        break;
      case this.mediaTypes.Image:
        this.videoModel.title = this.title;
        this.videoModel.author = this.author;
        this.videoModel.duration = this.duration;
        this.videoModel.format = this.format;
        this.getCategoryId().subscribe(response => {
          this.videoModel.categoryId = response;
          this.videoService.postVideo(this.videoModel).subscribe(response => this.goBack());
        });
        break;
      case this.mediaTypes.Video:
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



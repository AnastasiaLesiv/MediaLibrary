import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FoldersListComponent } from "../../features/folders-list/folders-list.component";
import { WildcardComponent } from "../wildcard/wildcard.component";
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UsersService } from '../../../services/users.service';
import { UserDto } from '../../../interfaces/response-dtos/user-dto';
import { MediaFile } from '../../../interfaces/creation-dtos/media-file';
import { AppGlobalConstants } from '../../../core/global/global-variables';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EditFormService } from '../../../component-services/edit-form.service';
import { ReloadFoldersListService } from '../../../component-services/reload-folders-list.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [FoldersListComponent, WildcardComponent, NavBarComponent, CommonModule]
})
export class MainLayoutComponent implements OnInit{
  userData?: UserDto;
  mediaFiles: MediaFile[] = [];

  isEditFormVisible?: boolean = false;

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;

  constructor(private usersService: UsersService,
              private editFormService: EditFormService,
              private reloadFoldersList: ReloadFoldersListService) {
   }

  ngOnInit() {
    this.userData = {
      id: undefined,
      userName: undefined,
      fullName: undefined,
      email: undefined,
      registrationDate: undefined,
      folders: undefined,
      audios: undefined,
      ebooks: undefined,
      images: undefined,
      videos: undefined

    }

    this.editFormService.isFormVisible$.subscribe(isVisible => {
      this.isEditFormVisible = isVisible;
    });

    this.reloadFoldersList.reloadFolders$.subscribe(reloadFoldes => {
      if(reloadFoldes) this.getUserData();
    })

    this.getUserData();
  }

  getUserData(){
    this.usersService.getUserById(this.userId).subscribe(response => {
      this.userData = response;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { WildcardComponent } from "../wildcard/wildcard.component";
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UsersService } from '../../../core/api/services/users.service';
import { User } from '../../../core/interfaces/auth/user.model';
import { MediaFile } from '../../../core/interfaces/mediafiles/media-file.model';
import { AppGlobalConstants } from '../../../core/global/global-variables';
import { CommonModule } from '@angular/common';
import { HideShowFoldersListService } from '../../../core/services/component-behaviours/hide-show-folders-list.service';
import { ReloadFoldersListService } from '../../../core/services/component-behaviours/reload-folders-list.service';
import { FoldersListComponent } from '../../features/folders/folders-list/folders-list.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [FoldersListComponent, WildcardComponent, NavBarComponent, CommonModule]
})
export class MainLayoutComponent implements OnInit{
  userData?: User;
  mediaFiles: MediaFile[] = [];

  isFoldersListVisible?: boolean = true;

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;

  constructor(private usersService: UsersService,
              private hideShowFoldersList: HideShowFoldersListService,
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

    this.hideShowFoldersList.isFoldersListVisible$.subscribe(isVisible => {
      this.isFoldersListVisible = isVisible;
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

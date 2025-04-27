import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/api/services/users.service';
import { Router } from '@angular/router';
import { UserUpdate } from '../../../../core/interfaces/auth/user-update.model';
import { AppGlobalConstants } from '../../../../core/global/global-variables';
import { HideShowFoldersListService } from '../../../../core/services/component-behaviours/hide-show-folders-list.service';

@Component({
  selector: 'app-edit-user-profile',
  imports: [FormsModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  userModel: UserUpdate;

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;

  constructor(private router: Router, 
              private userService: UsersService,
              private editFormService: HideShowFoldersListService) {
    this.userModel ={
      userName: undefined,
      fullName: undefined,
      email: undefined,
      password: undefined
    }
  }

  ngOnInit() {
    this.getUserData()
    this.editFormService.hideFoldersList();
  }

  getUserData(){
    this.userService.getOwnData().subscribe(response => {
      this.userModel ={
        userName: response.userName,
        fullName: response.fullName,
        email: response.email,
      }
    });
  }

  close(){
    this.editFormService.showFoldersList();
    this.router.navigateByUrl("");
  }

  updateProfile(){
    this.userService.putUser(this.userId, this.userModel).subscribe(responde => {
      this.close();
    })
  }
}

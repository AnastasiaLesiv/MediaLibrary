import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { UserEdit } from '../../../../interfaces/edition-models/user-edit';
import { AppGlobalConstants } from '../../../../core/global/global-variables';
import { EditFormService } from '../../../../component-services/edit-form.service';

@Component({
  selector: 'app-edit-user-profile',
  imports: [FormsModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  userModel: UserEdit;

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;

  constructor(private router: Router, 
              private userService: UsersService,
              private editFormService: EditFormService) {
    this.userModel ={
      userName: undefined,
      fullName: undefined,
      email: undefined,
      password: undefined
    }
  }

  ngOnInit() {
    this.getUserData()
    this.editFormService.showForm();
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
    this.editFormService.hideForm();
    this.router.navigateByUrl("");
  }

  updateProfile(){
    this.userService.putUser(this.userId, this.userModel).subscribe(responde => {
      this.close();
    })
  }
}

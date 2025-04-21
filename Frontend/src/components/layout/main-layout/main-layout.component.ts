import { Component, OnInit } from '@angular/core';
import { FoldersListComponent } from "../../features/folders-list/folders-list.component";
import { WildcardComponent } from "../wildcard/wildcard.component";
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UsersService } from '../../../services/users.service';
import { UserDto } from '../../../interfaces/response-dtos/user-dto';
import { MediaFile } from '../../../interfaces/creation-dtos/media-file';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [FoldersListComponent, WildcardComponent, NavBarComponent]
})
export class MainLayoutComponent implements OnInit {
  userData?: UserDto;
  mediaFiles: MediaFile[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.userData = {
      id: undefined,
      name: undefined,
      email: undefined,
      registrationDate: undefined,
      folders: undefined,
      audios: undefined,
      ebooks: undefined,
      images: undefined,
      videos: undefined

    }
   this.getUserData();
  }

  getUserData(){
    this.usersService.getUserById('EF9B9230-51B7-4270-513D-08DD80D8D7F1').subscribe(response => {
      this.userData = response;
    });
  }
}

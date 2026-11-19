import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AppGlobalConstants } from '../../../core/global/global-variables';
import { UsersService } from '../../../core/api/services/users.service';
import { HideShowFoldersListService } from '../../../core/services/component-behaviours/hide-show-folders-list.service';
import { UpdateFullNameService } from '../../../core/services/component-behaviours/update-full-name.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() fullName?: string;

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;
  
  constructor(private router: Router, 
              private usersServise: UsersService, 
              private updateNameService: UpdateFullNameService,
              private hideShowFoldersList: HideShowFoldersListService) { }

  ngOnInit() {
    this.updateNameService.updatedFullName$.subscribe(response => this.fullName = response)
  }

  logOut(){
    sessionStorage.removeItem(AppGlobalConstants.sessionStorageAcessToken);
    sessionStorage.removeItem(AppGlobalConstants.sessionStorageUserId);
    sessionStorage.setItem(AppGlobalConstants.sessionStorageIsAuthenticated, "false");
    this.hideShowFoldersList.showFoldersList();
    this.router.navigateByUrl("/login");
  }

  deleteProfile(){
    this.usersServise.deleteUser(this.userId).subscribe(response => {
      sessionStorage.removeItem(AppGlobalConstants.sessionStorageAcessToken);
      sessionStorage.removeItem(AppGlobalConstants.sessionStorageUserId);
      sessionStorage.setItem(AppGlobalConstants.sessionStorageIsAuthenticated, "false");
      this.hideShowFoldersList.showFoldersList();
      this.router.navigateByUrl("/register")})
  }

  goHome(){
    this.hideShowFoldersList.showFoldersList();
    this.router.navigateByUrl("");
  }
}

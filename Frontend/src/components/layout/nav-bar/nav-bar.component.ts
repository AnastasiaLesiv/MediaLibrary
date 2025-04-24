import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AppGlobalConstants } from '../../../core/global/global-variables';
import { UsersService } from '../../../services/users.service';
import { EditFormService } from '../../../component-services/edit-form.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() fullName?: string;

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;
  
  constructor(private router: Router, private usersServise: UsersService, private editFormService: EditFormService) { }

  ngOnInit() {
  }

  logOut(){
    sessionStorage.removeItem(AppGlobalConstants.sessionStorageAcessToken);
    sessionStorage.removeItem(AppGlobalConstants.sessionStorageUserId);
    sessionStorage.setItem(AppGlobalConstants.sessionStorageIsAuthenticated, "false");
    this.editFormService.hideForm();
    this.router.navigateByUrl("/login");
  }

  deleteProfile(){
    this.usersServise.deleteUser(this.userId).subscribe(response => {
      sessionStorage.removeItem(AppGlobalConstants.sessionStorageAcessToken);
      sessionStorage.removeItem(AppGlobalConstants.sessionStorageUserId);
      sessionStorage.setItem(AppGlobalConstants.sessionStorageIsAuthenticated, "false");
      this.editFormService.hideForm();
      this.router.navigateByUrl("/register")})
  }
}

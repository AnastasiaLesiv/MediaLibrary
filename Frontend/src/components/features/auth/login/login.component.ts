import { Component, OnInit } from '@angular/core';
import { Login } from '../../../../core/interfaces/auth/login.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/api/services/auth.service';
import { AppGlobalConstants } from '../../../../core/global/global-variables';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports:[FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: Login;

  constructor(private authService: AuthService, private router: Router) { 
    this.loginModel={
      userName: undefined,
      password: undefined
    }
  }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.loginModel).subscribe(response => {
      sessionStorage.setItem(AppGlobalConstants.sessionStorageAcessToken, response.accessToken);
      sessionStorage.setItem(AppGlobalConstants.sessionStorageIsAuthenticated, "true");

      var decodedToken = jwtDecode<JwtPayload>(response.accessToken);
      sessionStorage.setItem(AppGlobalConstants.sessionStorageUserId, decodedToken.sub!);

      this.router.navigateByUrl("");
    });
  }
}

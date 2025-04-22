import { Component, OnInit } from '@angular/core';
import { LoginDto } from '../../../../interfaces/auth/login-dto';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { AppGlobalConstants } from '../../../../core/global/global-variables';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginDto;

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

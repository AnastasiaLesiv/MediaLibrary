import { Component, OnInit } from '@angular/core';
import { Login } from '../../../../core/interfaces/auth/login.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/api/services/auth.service';
import { AppGlobalConstants } from '../../../../core/global/global-variables';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports:[FormsModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup ({
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit() {
  }

  login(){

     this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value as Login).subscribe(response => {
        sessionStorage.setItem(AppGlobalConstants.sessionStorageAcessToken, response.accessToken);
        sessionStorage.setItem(AppGlobalConstants.sessionStorageIsAuthenticated, "true");
  
        var decodedToken = jwtDecode<JwtPayload>(response.accessToken);
        sessionStorage.setItem(AppGlobalConstants.sessionStorageUserId, decodedToken.sub!);
  
        this.router.navigateByUrl("");
      });
   }
  }

  showPasswordMandatory() {
    const passwordInput = this.loginForm.get('password');
    return passwordInput?.invalid && passwordInput.touched
  }

  showUserNameMandatory() {
    const userNameInput = this.loginForm.get('userName');
    return userNameInput?.invalid && userNameInput.touched
  }
}

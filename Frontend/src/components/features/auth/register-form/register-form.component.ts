import { Component, OnInit } from '@angular/core';
import { CreateUser } from '../../../../core/interfaces/auth/register.model';
import { AuthService } from '../../../../core/api/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports:[FormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerModel: CreateUser;

  constructor(private authService: AuthService, private router: Router) { 
    this.registerModel ={
      userName: undefined,
      fullName: undefined,
      email: undefined,
      password: undefined
    }
  }

  ngOnInit() {
  }

  createUser(){
    this.authService.createUser(this.registerModel).subscribe(response => {
          this.router.navigateByUrl("login");
        });
  }

  goBack(){
    this.router.navigateByUrl("");
  }

}

import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(private router: Router, private authService: AuthenticationService,//another service
  ) {

  }
  login(): void {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: ()=>{
        // save the token
        this.router.navigate(['books']);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
  register(): void {
    this.router.navigate(['register']);
  }
}

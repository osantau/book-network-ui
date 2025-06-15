import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { Token } from '../../services/token/token';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(private router: Router, private authService: AuthenticationService,private tokenService:Token
  ) {

  }
  login(): void {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res)=>{        
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err)=>{
                
        if(err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }
  register(): void {
    this.router.navigate(['register']);
  }
}

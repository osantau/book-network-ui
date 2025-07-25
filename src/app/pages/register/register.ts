import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerRequest: RegistrationRequest = { email: '', firstName: '', lastName: '', password: '' };
  errorMsg: Array<string> = [];
  
  constructor(private router: Router, private authService: AuthenticationService) { }

  register(): void {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: ()=>{
        this.router.navigate(['activate-account']);
      },
      error: (err) =>{
        this.errorMsg = err.error.validationErrors;
      }
    })
  }

  login(): void {
   this.router.navigate(['login']);
  }
}

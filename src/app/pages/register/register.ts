import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { regsiter, Regsiter$Params } from '../../services/fn/authentication/regsiter';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerRequest: RegistrationRequest = { email: '', firstName: '', lastName: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(private router: Router, private config: ApiConfiguration, private http: HttpClient) { }
  register() {
    this.errorMsg = [];
    const registerParams: Regsiter$Params = { body: this.registerRequest };
    regsiter(this.http, this.config.rootUrl, registerParams).subscribe({
      next: (response) => {
        this.router.navigate(['activate-account']);
      }, error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push('Registration failed. Please check your credentials and try again.');
        }

      }
    });
  }
  login() {
    this.router.navigate(['login']);
  }
}

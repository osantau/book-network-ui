import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { authenticate, Authenticate$Params } from '../../services/fn/authentication/authenticate';
import { ApiConfiguration } from '../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/token/token-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(private router: Router, private config: ApiConfiguration, private http: HttpClient, private tokenService: TokenService) { }

  login() {
    this.errorMsg = [];
    const loginParams: Authenticate$Params = { body: this.authRequest };
    authenticate(this.http, this.config.rootUrl, loginParams).subscribe({
      next: (response) => {
        //todo save the token
        this.tokenService.token = response.body?.token as string;
        this.router.navigate(['books']);
      }, error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push('Login failed. Please check your credentials and try again.');
        }

      }
    });
  }
  register() {
    this.router.navigate(['register']);
  }
}

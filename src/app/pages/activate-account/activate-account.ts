import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { confirm, Confirm$Params } from '../../services/fn/authentication/confirm';
import { ApiConfiguration } from '../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { CodeInputModule } from 'angular-code-input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activate-account',
  imports: [FormsModule, CodeInputModule, CommonModule],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount {
  message: string = '';
  isOk: boolean = true;
  submitted: boolean = false;
  constructor(private router: Router, private config: ApiConfiguration, private http: HttpClient) { }
  onCodeCompleted(token: string) {
    const params: Confirm$Params = {
      token: token
    };
    confirm(this.http, this.config.rootUrl, params).subscribe({
      next: () => {
        this.isOk = true;
        this.message = 'Account activated successfully!\nNow you can log in to your account.';
        this.submitted = true;
      },
      error: (err) => {
        this.isOk = false;
        if (err.status === 400) {
          this.message = 'Invalid activation token or expired.';
        } else {
          this.message = 'An error occurred while activating the account. Please try again later.';
        }
        this.submitted = true;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}

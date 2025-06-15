import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [CodeInputModule],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss'
})
export class ActivateAccount {
  redirectToLogin() {
    this.router.navigate(['login']);
  }
  message: string = '';
  isOk: boolean = true;
  submitted: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) { }

  onCodeCompleted(token: string): void {
    this.confirmAccount(token);
  }
  confirmAccount(token: string): void {
    this.authService.confirm({
      token
    }).subscribe({
      next: (): void => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.submitted = true;
        this.isOk = true;
      },
      error: (): void => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOk = false;
      }
    });

      ;
  }

}


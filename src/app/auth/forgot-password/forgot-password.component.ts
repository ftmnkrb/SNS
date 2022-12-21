import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateService } from 'src/app/shared/services/state.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {


  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private authService: AuthService, private alertService: AlertService, private stateService: StateService) { }

  get email() { return this.forgotPasswordForm.get('email') }

  resetPassword() {
    this.stateService.setLoading(true)
    this.authService.resetPassword(this.email?.value).subscribe({
      next: (res) => {
        this.alertService.success("A password reset email has been sent. Please also check your spam box.");
      },
      error: (err) => {
        this.alertService.error(err)
        this.stateService.setLoading(false)
      },
      complete: () => this.stateService.setLoading(false)
    })
  }
}

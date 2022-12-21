import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateService } from 'src/app/shared/services/state.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../auth.service';
import { UserDto } from '../models/UserDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  constructor(private authService: AuthService, private alertService: AlertService, private stateService: StateService, private userService: UserService) { }

  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get repassword() { return this.registerForm.get('repassword') }

  register() {
    if (this.password?.value != this.repassword?.value) {
      this.alertService.error('Passwords do not match!')
      return
    }

    this.stateService.setLoading(true);
    this.authService.signUp(this.email?.value, this.password?.value).subscribe({
      next: (user) => {
        let newUser: UserDto = {
          localId: user.localId,
          university: null,
          description: null,
          department: null,
          class: null,
          name: null,
          photoUrl: null,
          verified: false,
          email: null
        }

        this.userService.newUser(newUser).subscribe(res=>{
          this.authService.login(user.email, this.password?.value).subscribe(res=>{
            this.stateService.setLoading(false)
          });
        });
       
      },
      error: (err) => {
        this.alertService.error(err)
        this.stateService.setLoading(false);
      },
      complete: () => this.stateService.setLoading(false)
    })
  }
}

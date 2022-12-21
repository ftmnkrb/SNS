import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDto } from 'src/app/auth/models/UserDto';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: UserDto | null = null;

  constructor(private userService: UserService, private authService: AuthService) {
    this.userService.user.subscribe(userDto => {
      this.user = userDto
      console.log(this.user);
    })
  }

  getProfileInfoText(name: string): string {
    return name.slice(0, 1).toUpperCase();
  }

  logout() {
    this.authService.logout();
  }
}

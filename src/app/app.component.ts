import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') className = '';
  loading = false;
  isDarkMode = true;

  constructor(private stateService: StateService, private authService: AuthService, private overlay: OverlayContainer) { }

  ngOnInit(): void {
    this.authService.autoLogin();

    this.stateService._loading.subscribe(state => {
      this.loading = state;
    })

    this.stateService.darkMode.subscribe(isDarkMode => {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      this.isDarkMode = isDarkMode;
      this.setTheme(isDarkMode);
    })

  }

  title = 'snss';

  setTheme(isDarkMode: boolean) {
    const darkClassName = 'darkMode';
    this.className = isDarkMode ? darkClassName : '';
    if (isDarkMode) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  }

  changeTheme(darkMode: boolean) {
    this.stateService.darkMode.next(darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }

  logout(){
    
  }
}

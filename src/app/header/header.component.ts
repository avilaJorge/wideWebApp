import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  userPhoto = '';
  navigation = [
    { link: 'home', label: 'Home' },
    { link: 'mapmywalk', label: 'MapMyWalk' },
    { link: 'getitdone-sd', label: 'Get It Done SD' },
    { link: 'meetup', label: 'Meetup' }
  ];
  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService) {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe((authStatus) => {
        this.userIsAuthenticated = authStatus;
        if (authStatus) {
          const userInfo = this.authService.getUserInfo();
          if (userInfo.userPhoto) {
            this.userPhoto = userInfo.userPhoto;
          } else {
            this.userPhoto = '';
          }
        }
      });
  }


  ngOnInit() {
    const user = this.authService.getUserInfo();
    this.userIsAuthenticated = user.isAuthenticated;
    if (this.userIsAuthenticated) {
      this.userPhoto = user.userPhoto;
    }
  }

  ngOnDestroy() {
    console.log('On Destroy called in header component');
    this.authStatusSub.unsubscribe();
  }

  onLogout() {
    this.userIsAuthenticated = false;
    this.userPhoto = '';
    this.authService.signOut();
  }
}

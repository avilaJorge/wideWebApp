import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
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
        console.log(authStatus);
        this.userIsAuthenticated = authStatus;
      });
  }


  ngOnInit() {

  }


  onLogout() {
    this.authService.signOut();
  }
}

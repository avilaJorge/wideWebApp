import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

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
    private authService: AuthService,
    private dcRef: ChangeDetectorRef) {
    console.log('Header Component constructor was called and auth is ' + this.userIsAuthenticated);
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe((authStatus) => {
        console.log(authStatus);
        this.userIsAuthenticated = authStatus;
        const currentUser = this.authService.getActiveUser();
        if (currentUser && currentUser.photoURL) {
          this.userPhoto = currentUser.photoURL;
        } else {
          this.userPhoto = '';
        }
        this.dcRef.detectChanges();
      });
  }


  ngOnInit() {
    console.log('ngOnInit called in header component');
    this.userIsAuthenticated = this.authService.getIsAuth();
  }

  ngOnDestroy() {
    console.log('On Destroy called in header component');
    this.authStatusSub.unsubscribe();
  }

  onLogout() {
    this.authService.signOut();
  }
}

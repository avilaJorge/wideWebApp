import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private userId: string;
  private isAuthenticated = false;
  private userPhoto: string;
  private currentlyLoggedInUser: firebase.User;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router) {

    fireAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          this.token = token;
          localStorage.setItem('token', token);
        });
        this.userId = user.uid;
        this.isAuthenticated = true;
        this.userPhoto = user.photoURL;
        this.currentlyLoggedInUser = user;
        this.authStatusListener.next(true);
        localStorage.setItem('userId', this.userId);
        localStorage.setItem('userPhoto', this.userPhoto);
      } else {
        this.token = '';
        this.userId = '';
        this.isAuthenticated = false;
        this.userPhoto = '';
        this.currentlyLoggedInUser = null;
        this.authStatusListener.next(false);
        this.clearAuthData();
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) { return; }
    this.token = authInformation.token;
    this.userPhoto = authInformation.userPhoto;
    this.userId = authInformation.userId;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  signUpEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    // TODO: Need to finish writing this code.
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInEmail(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        // @ts-ignore
        const token = res.credential.accessToken;
        this.token = token;
        if (token) {
          this.currentlyLoggedInUser = res.user;
          this.isAuthenticated = true;
          this.userId = res.user.uid;
          this.userPhoto = res.user.photoURL;
          this.authStatusListener.next(true);
          this.saveAuthData(token, this.userPhoto, this.userId);
          this.router.navigate(['/']);
        }
      }).catch((err) => {
      console.log('Error occurred while logging in user');
      console.log(err);
    });
  }

  signInGoogle() {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
      .then((res) => {
        // @ts-ignore
        const token = res.credential.idToken;
        this.token = token;
        if (token) {
          this.currentlyLoggedInUser = res.user;
          this.isAuthenticated = true;
          this.userId = res.user.uid;
          this.userPhoto = res.user.photoURL;
          this.authStatusListener.next(true);
          this.saveAuthData(token, this.userPhoto, this.userId);
          this.router.navigate(['/']);
        }
      }).catch((err) => {
        console.log('Error occurred while logging in user');
        console.log(err);
    });
  }

  getUserInfo() {
    return {
      isAuthenticated: this.isAuthenticated,
      token: this.token,
      userId: this.userId,
      userPhoto: this.userPhoto,
      currentUser: this.currentlyLoggedInUser
    };
  }

  signOut() {
    this.fireAuth.auth.signOut();
    this.token = null;
    this.isAuthenticated = false;
    this.userId = '';
    this.currentlyLoggedInUser = null;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);

  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private saveAuthData(token: string, userPhoto: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userPhoto', userPhoto);
    localStorage.setItem('userId', userId);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userPhoto = localStorage.getItem('userPhoto');
    const userId = localStorage.getItem('userId');
    if (!token) { return; }
    return {
      token: token,
      userPhoto: userPhoto,
      userId: userId
    };
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('userId');
  }
}

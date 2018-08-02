import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private currentlyLoggedInUser: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private fireAuth: AngularFireAuth) {
    fireAuth.auth.onAuthStateChanged((user) => {
      console.log('Auth state has changed');
      console.log(user);
      if (user) {
        this.isAuthenticated = true;
        this.currentlyLoggedInUser = this.getActiveUser().uid;
        this.authStatusListener.next(true);
      } else {
        this.currentlyLoggedInUser = '';
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
      }
    });
  }

  signUpEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInGoogle() {
    return this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }

  signOut(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }

  getActiveUser() {
    return this.fireAuth.auth.currentUser;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  checkUserAuth() {
    if (this.fireAuth.auth.currentUser) {
      console.log('Were good!');
      this.isAuthenticated = true;
    }
  }
}

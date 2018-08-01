import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MapMyWalkComponent} from './map-my-walk/map-my-walk.component';
import {GetItDoneComponent} from './get-it-done/get-it-done.component';
import {MeetupComponent} from './meetup/meetup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent },
  {path: 'mapmywalk', component: MapMyWalkComponent},
  {path: 'getitdone-sd', component: GetItDoneComponent},
  {path: 'meetup', component: MeetupComponent},
  {path: 'auth/login', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // , { enableTracing: true }) ],
  exports: [ RouterModule ],
  // providers: [ AuthGuard ]
})
export class AppRoutingModule {}

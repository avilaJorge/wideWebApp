import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import { MeetupApiService } from '../services/meetup-api/meetup-api.service';
import {Meetup} from '../models/meetup.model';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.css']
})
export class MeetupComponent implements OnInit {

  private location = '92092';
  private totalMeetups = 5;
  private nearbyMeetupsSubscription: Subscription;
  nearbyMeetups: Meetup[] = [];
  nearbyMeetup: Meetup[] = [];
  private indexCounter = 0;

  constructor(private meetupApi: MeetupApiService) { }

  ngOnInit() {
    console.log('Meetup ngOnInit was called!');
    this.nearbyMeetupsSubscription = this.meetupApi.getNearbyMeetupsListener()
      .subscribe((meetups) => {
        this.nearbyMeetups = meetups;
        if (this.nearbyMeetup.length < 1) {
          this.nearbyMeetup.push(this.nearbyMeetups[this.indexCounter]);
        }
        console.log(this.nearbyMeetups);
      }, (error) => {
        console.log('Error getting meetups data in listener');
      });
    this.nearbyMeetups = this.meetupApi.getMeetups();
    if (this.nearbyMeetups.length > 0) {
      this.nearbyMeetup.push(this.nearbyMeetups[this.indexCounter]);
    }
  }

  onSwitchLeft() {
    if (--this.indexCounter < 0) {
      this.indexCounter = this.totalMeetups + (this.indexCounter % this.totalMeetups);
    } else {
      this.indexCounter %= this.totalMeetups;
    }
    console.log(this.indexCounter);
    this.nearbyMeetup[0] = this.nearbyMeetups[this.indexCounter];
  }

  onSwitchRight() {
    this.indexCounter = ++this.indexCounter % this.totalMeetups;
    console.log(this.indexCounter);
    this.nearbyMeetup[0] = this.nearbyMeetups[this.indexCounter];
  }

  onMeetupLogin() {
    this.meetupApi.meetupLogin();
  }
}

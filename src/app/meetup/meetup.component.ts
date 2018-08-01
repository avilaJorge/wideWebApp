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
  private nearbyMeetupsSubscription: Subscription;
  nearbyMeetups: Meetup[];

  constructor(private meetupApi: MeetupApiService) { }

  ngOnInit() {

    this.nearbyMeetupsSubscription = this.meetupApi.getNearbyMeetupsListener()
      .subscribe((meetups) => {
        this.nearbyMeetups = meetups;
        console.log(this.nearbyMeetups);
      }, (error) => {
        console.log('Error getting meetups data in listener');
      });
    this.meetupApi.getNearbyMeetups(this.location);
  }

}

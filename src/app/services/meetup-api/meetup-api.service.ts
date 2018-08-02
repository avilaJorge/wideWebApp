import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {Meetup} from '../../models/meetup.model';


@Injectable({
  providedIn: 'root'
})
export class MeetupApiService {

  private url = 'https://api.meetup.com/';
  private location = '92092';

  private params = new HttpParams()
    .set('sign', 'true')
    .set('photo-host', 'public')
    .set('zip', '92092')
    .set('fallback_suggestions', 'true')
    .set('text', 'walking')
    .set('radius', '25')
    .set('category', '9')
    .set('order', 'most_active')
    .set('page', '5')
    .set('key', environment.meetupConfig.apiKey);

  private nearbyMeetups: Meetup[] = [];
  private nearbyMeetupsSubject = new Subject<Meetup[]>();


  constructor(
    private httpClient: HttpClient) {

    this.getNearbyMeetups(this.location);
  }

  getNearbyMeetupsListener(): Observable<Meetup[]> {
    return this.nearbyMeetupsSubject.asObservable();
  }

  getNearbyMeetups(location: string) {
    const options = {params: this.params.set('zip', location)};
    this.httpClient.jsonp<{ meta: string, data: Meetup[] }>(this.url + 'find/groups?' + options.params.toString(), 'callback')
      .pipe(map((meetupData) => {
        console.log(typeof(meetupData));
        console.log(meetupData);
        return meetupData.data.map((meetup) => {
          return new Meetup(meetup);
        });
      }))
      .subscribe((transformedData) => {
        this.nearbyMeetups = transformedData;
        this.nearbyMeetupsSubject.next(transformedData);
      }, (error) => {
        console.log('Error: Meetup API');
        console.log(error);
      });
  }

  getMeetups(): Meetup[] {
    return [...this.nearbyMeetups];
  }

  meetupLogin() {
    window.open(environment.meetupConfig.meetupOAuthURL);
  }

}

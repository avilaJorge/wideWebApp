import { TestBed, inject } from '@angular/core/testing';

import { MeetupApiService } from './meetup-api.service';

describe('MeetupApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetupApiService]
    });
  });

  it('should be created', inject([MeetupApiService], (service: MeetupApiService) => {
    expect(service).toBeTruthy();
  }));
});

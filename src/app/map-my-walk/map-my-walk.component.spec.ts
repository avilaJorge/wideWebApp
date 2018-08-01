import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMyWalkComponent } from './map-my-walk.component';

describe('MapMyWalkComponent', () => {
  let component: MapMyWalkComponent;
  let fixture: ComponentFixture<MapMyWalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMyWalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMyWalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

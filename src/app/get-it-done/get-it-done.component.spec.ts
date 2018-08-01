import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItDoneComponent } from './get-it-done.component';

describe('GetItDoneComponent', () => {
  let component: GetItDoneComponent;
  let fixture: ComponentFixture<GetItDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetItDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetItDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

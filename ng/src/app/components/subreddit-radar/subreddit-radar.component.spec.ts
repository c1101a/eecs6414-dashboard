import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditRadarComponent } from './subreddit-radar.component';

describe('SubredditRadarComponent', () => {
  let component: SubredditRadarComponent;
  let fixture: ComponentFixture<SubredditRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubredditRadarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

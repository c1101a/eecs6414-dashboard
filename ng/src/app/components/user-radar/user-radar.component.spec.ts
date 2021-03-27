import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRadarComponent } from './user-radar.component';

describe('UserRadarComponent', () => {
  let component: UserRadarComponent;
  let fixture: ComponentFixture<UserRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRadarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

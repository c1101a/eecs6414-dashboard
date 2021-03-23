import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionRadarComponent } from './emotion-radar.component';

describe('EmotionRadarComponent', () => {
  let component: EmotionRadarComponent;
  let fixture: ComponentFixture<EmotionRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotionRadarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarRaceComponent } from './bar-race.component';

describe('BarRaceComponent', () => {
  let component: BarRaceComponent;
  let fixture: ComponentFixture<BarRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

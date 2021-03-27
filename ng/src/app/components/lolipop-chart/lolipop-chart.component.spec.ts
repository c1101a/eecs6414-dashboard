import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolipopChartComponent } from './lolipop-chart.component';

describe('LolipopChartComponent', () => {
  let component: LolipopChartComponent;
  let fixture: ComponentFixture<LolipopChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LolipopChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LolipopChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

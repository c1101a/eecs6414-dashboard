import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedGeneralComponent } from './stacked-general.component';

describe('StackedGeneralComponent', () => {
  let component: StackedGeneralComponent;
  let fixture: ComponentFixture<StackedGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

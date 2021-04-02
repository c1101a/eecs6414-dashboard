import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStackedBarComponent } from './users-stacked-bar.component';

describe('UsersStackedBarComponent', () => {
  let component: UsersStackedBarComponent;
  let fixture: ComponentFixture<UsersStackedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersStackedBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStackedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

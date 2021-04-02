import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicScatterComponent } from './topic-scatter.component';

describe('TopicScatterComponent', () => {
  let component: TopicScatterComponent;
  let fixture: ComponentFixture<TopicScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

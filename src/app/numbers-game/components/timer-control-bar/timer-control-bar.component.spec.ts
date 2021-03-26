import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerControlBarComponent } from './timer-control-bar.component';

describe('TimerControlBarComponent', () => {
  let component: TimerControlBarComponent;
  let fixture: ComponentFixture<TimerControlBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerControlBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

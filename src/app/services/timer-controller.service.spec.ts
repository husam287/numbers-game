import { TestBed } from '@angular/core/testing';

import { TimerControllerService } from './timer-controller.service';

describe('TimerControllerService', () => {
  let service: TimerControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

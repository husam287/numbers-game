import { TestBed } from '@angular/core/testing';

import { NumbersControllerService } from './numbers-controller.service';

describe('NumbersControllerService', () => {
  let service: NumbersControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumbersControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

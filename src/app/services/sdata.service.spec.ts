import { TestBed } from '@angular/core/testing';

import { SDataService } from './sdata.service';

describe('SDataService', () => {
  let service: SDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

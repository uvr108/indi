import { TestBed } from '@angular/core/testing';

import { RethinkService } from './rethink.service';

describe('RethinkService', () => {
  let service: RethinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RethinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

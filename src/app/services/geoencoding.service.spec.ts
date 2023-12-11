import { TestBed } from '@angular/core/testing';

import { GeoencodingService } from './geoencoding.service';

describe('GeoencodingService', () => {
  let service: GeoencodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoencodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

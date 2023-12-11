import { TestBed } from '@angular/core/testing';

import { PathFinderService } from './path-finder.service';

describe('PathFinderService', () => {
  let service: PathFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FetchAppDataService } from './fetch-app-data.service';

describe('FetchAppDataService', () => {
  let service: FetchAppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAppDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TwitterDaoService } from './twitter-dao.service';

describe('TwitterDaoService', () => {
  let service: TwitterDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

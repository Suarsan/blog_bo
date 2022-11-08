import { TestBed } from '@angular/core/testing';

import { PostDaoService } from './post-dao.service';

describe('PostDaoService', () => {
  let service: PostDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { RrssService } from './rrss-service.service';

describe('RrssService', () => {
  let service: RrssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RrssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

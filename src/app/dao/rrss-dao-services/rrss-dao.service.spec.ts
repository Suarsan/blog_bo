import { TestBed } from '@angular/core/testing';
import { RrssDaoService } from './rrss-dao.service';

describe('RrssDaoService', () => {
  let service: RrssDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RrssDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

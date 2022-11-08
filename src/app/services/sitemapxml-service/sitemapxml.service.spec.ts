import { TestBed } from '@angular/core/testing';

import { SitemapxmlService } from './sitemapxml.service';

describe('SitemapxmlService', () => {
  let service: SitemapxmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitemapxmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

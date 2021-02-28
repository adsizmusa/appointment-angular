import { TestBed } from '@angular/core/testing';

import { SmstemplateService } from './smstemplate.service';

describe('SmstemplateService', () => {
  let service: SmstemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmstemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

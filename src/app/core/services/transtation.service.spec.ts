import { TestBed } from '@angular/core/testing';

import { TranstationService } from './transtation.service';

describe('TranstationService', () => {
  let service: TranstationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranstationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CouleursAppService } from './couleurs-app.service';

describe('CouleursAppService', () => {
  let service: CouleursAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouleursAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

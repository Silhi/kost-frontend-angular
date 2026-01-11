import { TestBed } from '@angular/core/testing';

import { KosService } from './kos.service';

describe('KosService', () => {
  let service: KosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

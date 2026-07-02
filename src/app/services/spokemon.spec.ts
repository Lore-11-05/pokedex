import { TestBed } from '@angular/core/testing';

import { Spokemon } from './spokemon';

describe('Spokemon', () => {
  let service: Spokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Spokemon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

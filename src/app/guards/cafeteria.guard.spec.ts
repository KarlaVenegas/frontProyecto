import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cafeteriaGuard } from './cafeteria.guard';

describe('cafeteriaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cafeteriaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

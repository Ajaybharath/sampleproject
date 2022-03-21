import { TestBed, async, inject } from '@angular/core/testing';

import { LoginAccessGuard } from './login-access.guard';

describe('LoginAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginAccessGuard]
    });
  });

  it('should ...', inject([LoginAccessGuard], (guard: LoginAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});

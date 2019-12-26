import { TestBed } from '@angular/core/testing';

import { GroupHttpService } from './group-http.service';

describe('GroupHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupHttpService = TestBed.get(GroupHttpService);
    expect(service).toBeTruthy();
  });
});

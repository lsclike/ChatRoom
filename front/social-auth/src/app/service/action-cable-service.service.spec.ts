import { TestBed } from '@angular/core/testing';

import { ActionCableServiceService } from './action-cable-service.service';

describe('ActionCableServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionCableServiceService = TestBed.get(ActionCableServiceService);
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { StatisticalService } from './statistical.service';

describe('StatisticalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatisticalService]
    });
  });

  it('should be created', inject([StatisticalService], (service: StatisticalService) => {
    expect(service).toBeTruthy();
  }));
});

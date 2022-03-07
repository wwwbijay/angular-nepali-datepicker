import { TestBed } from '@angular/core/testing';

import { NpDatePickerService } from './np-datepicker.service';

describe('NpxNpDatepickerService', () => {
  let service: NpDatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpDatePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

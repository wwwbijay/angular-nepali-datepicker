import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpDatePickerComponent } from './np-datepicker.component';

describe('NpxNpDatepickerComponent', () => {
  let component: NpDatePickerComponent;
  let fixture: ComponentFixture<NpDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpxNpDatepickerComponent } from './npx-np-datepicker.component';

describe('NpxNpDatepickerComponent', () => {
  let component: NpxNpDatepickerComponent;
  let fixture: ComponentFixture<NpxNpDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpxNpDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpxNpDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

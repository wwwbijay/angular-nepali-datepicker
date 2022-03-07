import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Input,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { NpDatePickerService } from './np-datepicker.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  NepaliDate,
  MonthData,
  DaysMapping,
  MonthMapping,
  DateFormatter,
} from './types';
import { daysMapping, monthsMapping } from './mapping';

@Component({
  selector: 'np-datepicker',
  templateUrl: './np-date-picker.component.html',
  styleUrls: ['./np-date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpDatePickerComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class NpDatePickerComponent implements OnInit, ControlValueAccessor {
  nepaliDateToday: NepaliDate = { day: 0, month: 0, year: 0 };
  currentNepaliDate: NepaliDate = { day: 0, month: 0, year: 0 };
  selectedDate!: NepaliDate;
  formattedDate = '';
  currentDate: any;

  displayDate!: string;

  years: number[] = [];

  currentMonthData!: any;

  daysMapping: DaysMapping = daysMapping;

  monthsMapping: MonthMapping = monthsMapping;

  isOpen = false;

  hideInput = false;

  alwaysVisible = false;

  inputClass!: string;

  @Input()
  language: 'en' | 'ne' = 'ne';
  @Input()
  monthDisplayType: 'default' | 'modern' | 'short' = 'modern';
  
  dayDisplayType: 'default' | 'short' = 'short';

  dateFormatter: DateFormatter = (selectedDate: NepaliDate) => {
    const dd =
      selectedDate.day < 10 ? '0' + selectedDate.day : selectedDate.day;
    const mm =
      selectedDate.month < 10 ? '0' + selectedDate.month : selectedDate.month;
    return `${dd}/${mm}/${this.selectedDate.year}`;
  };

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor(
    public _nepaliDate: NpDatePickerService,
    private eRef: ElementRef
  ) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.nepaliDateToday = this._nepaliDate.setCurrentNepaliDate();
    this.setCurrentDate();
    this.populateYears();
    this.setCurrentMonthData();
    this.selectDate(this.currentNepaliDate.day);
  }

  populateYears() {
    for (let i = 2001; i <= 2099; i++) {
      this.years.push(i);
    }
  }
  selectYear(e: any) {
    this.currentNepaliDate.year = e.target.value;

    const newDate = {
      day: this.currentNepaliDate.day,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };

    this.currentDate = this._nepaliDate.nepToEngDate(
      newDate.day,
      newDate.month + 1,
      newDate.year
    );
    this.setCurrentMonthData();
  }

  selectMonth(e: any) {
    let month = e.target.value;

    let temp_nep_month =
      this.monthsMapping[this.language][this.monthDisplayType]?.indexOf(
        month
      ) ?? 0;

    this.currentNepaliDate.month = temp_nep_month;

    const newDate = {
      day: this.currentNepaliDate.day,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };
    this.currentDate = this._nepaliDate.nepToEngDate(
      newDate.day,
      newDate.month + 1,
      newDate.year
    );
    this.setCurrentMonthData();
  }

  resetCurrentMonthData() {
    this.currentMonthData = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
  }

  formatValue() {
    if (this.selectedDate) {
      this.formattedDate = this.dateFormatter(this.selectedDate);
    }
  }

  propagateChange = (_: any) => {};

  propagateTouch = (_: any) => {};

  writeValue(value: any) {
    if (value) {
      this.selectedDate = value;
      this.currentNepaliDate = value;
      this.formatValue();
    }
  }

  registerOnTouched() {}

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  setCurrentDate() {
    if (!this.selectedDate) {
      this.currentNepaliDate = this._nepaliDate.engToNepDate(
        this.currentDate.getDate(),
        this.currentDate.getMonth(),
        this.currentDate.getFullYear()
      );
    } else {
      const { day, month, year } = this.selectedDate;
      this.currentNepaliDate = this._nepaliDate.engToNepDate(day, month, year);
      this.currentDate = this._nepaliDate.nepToEngDate(
        this.selectedDate.year,
        this.selectedDate.month,
        this.selectedDate.day
      );
    }
  }

  setCurrentMonthData() {
    this.resetCurrentMonthData();

    // fill the currentMonthData with current date
    let day = this.currentDate.getDay();

    this.currentMonthData[day] = [this.currentNepaliDate.day];

    // fill the currentMonthData with day before the current date
    this.setMonthDataBefore(day - 1, this.currentNepaliDate.day - 1);

    var currentMonthMaxValue =
      this._nepaliDate.nepaliMonths[this.currentNepaliDate.year - 2000][
        this.currentNepaliDate.month
      ];

    // fill the currentMonthData with day after the current date
    this.setMonthDataAfter(
      day + 1,
      this.currentNepaliDate.day + 1,
      currentMonthMaxValue
    );

    // we need some empty spaces in place so that the dates are shown in correct order
    // eg if the 1st day starts on monday then we need 1 empty space for non existingn date on Sunday
    this.createEmptySpaces();
  }

  setMonthDataBefore(day: any, date: any) {
    if (date >= 1) {
      if (day < 0) {
        day = 6;
      }
      this.currentMonthData[day] = [date, ...this.currentMonthData[day]];
      this.setMonthDataBefore(--day, --date);
    }
  }

  setMonthDataAfter(day: any, date: any, currentMonthMaxValue: any) {
    const nepaliDate = {
      day: date,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };

    //  only add the data if the current month matches
    if (date <= currentMonthMaxValue) {
      if (day > 6) {
        day = 0;
      }
      this.currentMonthData[day] = [...this.currentMonthData[day], date];
      this.setMonthDataAfter(++day, ++date, currentMonthMaxValue);
    }
  }

  createEmptySpaces() {
    // first find out which day has the 1st
    //  if its a Sunday, then don't do anything else add 1 space on each previous day
    let dayIndex = 0;
    let value: any;
    Object.values(this.currentMonthData).map((item, index) => {
      value = item;
      if (value.includes(1)) {
        dayIndex = index;
      }
      return value.includes(1);
    });

    if (dayIndex) {
      for (dayIndex; dayIndex > 0; dayIndex--) {
        const monthData = this.currentMonthData[dayIndex - 1];
        this.currentMonthData[dayIndex - 1] = [null, ...monthData];
      }
    }
  }

  selectDate(day: number) {
    this.selectedDate = { ...this.currentNepaliDate, day };
    this.formatValue();
    this.close();
    this.propagateChange(this.selectedDate);
  }

  toggleOpen() {
    if (!this.alwaysVisible) {
      this.isOpen = !this.isOpen;
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    //this.setCurrentDate();
  }
}
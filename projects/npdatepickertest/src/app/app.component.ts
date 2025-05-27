import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NpDatePickerService } from 'projects/npx-np-datepicker/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'npdatepickertest';

  nepaliDate1: any;

  dateForm = new FormGroup({
    nepaliDate2: new FormControl(),
  });

  nepaliDate3: any;

  constructor(public _nepaliDate: NpDatePickerService) {}

  get nepaliDate2() {
    return this.dateForm.get('nepaliDate2');
  }

  ngOnInit() {
    const today = new Date();
    const formatted =
      today.getFullYear() +
      '-' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(today.getDate()).padStart(2, '0');

      console.log(formatted, "formatted...");

      this.nepaliDate3 = this._nepaliDate.engStringToNepDate(formatted);

      
      
  }
  dateChanged() {
    console.log(this.nepaliDate1);
  }

  date2Changed() {
    console.log(this.nepaliDate2?.value);
  }

  monthChanged() {
    console.log('Selected date:', this.dateForm.value);
  }

  onSubmit() {
    console.log('Selected date:', this.dateForm.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NpDatePickerService } from 'projects/npx-np-datepicker/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'npdatepickertest';

  nepaliDate1: any;

  dateForm = new FormGroup({
    nepaliDate2: new FormControl()
  });

  constructor(
    public _nepaliDate: NpDatePickerService,
  ) { }

  get nepaliDate2() {
    return this.dateForm.get('nepaliDate2');
  }

  ngOnInit() {

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

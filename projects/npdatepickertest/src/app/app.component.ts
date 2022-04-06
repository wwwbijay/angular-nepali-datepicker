import { Component, OnInit } from '@angular/core';
import { NpDatePickerService } from 'projects/npx-np-datepicker/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'npdatepickertest';

  nepaliDate1:any;
  nepaliDate2:any;

  constructor(
    public _nepaliDate: NpDatePickerService,
  ){}
  ngOnInit(){
    
  }
  dateChanged(){
    console.log(this.nepaliDate1);
  }

  monthChanged(){
    console.log(this.nepaliDate2);
  }
  
  
}

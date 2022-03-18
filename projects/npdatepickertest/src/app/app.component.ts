import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'npdatepickertest';
  nepaliDate1:any;

  constructor(){
    console.log(this.nepaliDate1);    
  }
}

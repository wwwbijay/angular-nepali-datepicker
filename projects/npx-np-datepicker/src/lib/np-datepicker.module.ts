import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NpDatePickerComponent } from './np-datepicker.component';
import { ToNpPipe } from './to-np.pipe';

@NgModule({
  declarations: [
    ToNpPipe,
    NpDatePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    NpDatePickerComponent
  ]
})
export class NepaliDatepickerModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NpDatePickerComponent } from './np-datepicker.component';
import { ToNpPipe } from './to-np.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ToNpPipe,
    NpDatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NpDatePickerComponent
  ]
})
export class NepaliDatepickerModule { }

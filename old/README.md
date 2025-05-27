# Angular Nepali Datepicker

`ngx-np-datepicker` is an Angular datepicker component that supports the Nepali calendar (Bikram Sambat). 
It allows users to pick Nepali dates easily, supports form integrations, and is ideal for applications needing a native Nepali date experience.

### Demo

<a href="https://wwwbijay.github.io/angular-nepali-datepicker/" target="_blank">Click here to check demo.</a>

## Installation

```
npm install ngx-np-datepicker
```

## Usage

Import the `NepaliDatepickerModule` in your app.module.ts

```
import { NepaliDatepickerModule } from 'angular-nepali-datepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NepaliDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

then use `<np-datepicker [(ngModel)]="nepaliDate"></np-datepicker>` in your template

```
<np-datepicker></np-datepicker>
```

### Date Conversion Service
Inject service:
```
constructor(private _nepaliDate: NpDatePickerService){}
```
Use conversion methods
```
//string_date = 2025-05-27 
const nepaliDate1 = this._nepaliDate.engStringToNepDate(string_date);
const nepalidate2 = this._nepaliDate.engToNepDate(day, month, year);
const englishdate = this._nepaliDate.nepToEngDate(day, month, year);
```

### Date Selected Event
dateSelected
```
 <np-datepicker
                  [(ngModel)]="nepaliDate"
                  (dateSelected)="changeStartDate($event)"
                ></np-datepicker>
```			
### Format

The supported date format is dd-mm-yyyy

### License

MIT License

### 🔍 Key Fixes:

- Fixed date issues related to BS 2081 and 2082.
- Module import bug fixed.
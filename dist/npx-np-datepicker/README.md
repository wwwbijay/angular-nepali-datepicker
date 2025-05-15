# Angular Nepali Datepicker

A configurable Nepali Date Picker(Bikram Sambat) built for angular applications. Supports latest (Angular 19) version.

### Key Fixes:

- Fixed date issues related to BS 2081 and 2082.

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

### Note

This package has no dependency.

### Format

The supported date format is dd-mm-yyyy

### License

MIT License

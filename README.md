# Angular Nepali Datepicker

A simple Nepali Date Picker(Bikram Sambat) library in angular with no dependancy.

# Installation

```
npm install ngx-np-datepicker

```

# Demo

https://github.com/wwwbijay/angular-nepali-datepicker

# Note

This package has no dependancy.

# Usage

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
then use `<np-datepicker></np-datepicker>` in your template
```
<np-datepicker></np-datepicker>
```


# Format

The supported date format is dd-mm-yyyy

# Keywords

['Angular', 'Typescript', 'Javascript', 'Nepali Datepicker']


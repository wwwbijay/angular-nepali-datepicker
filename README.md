# Angular Nepali Datepicker
A simple Nepali Date Picker(Bikram Sambat) library in angular with no dependancy.

## Installation
```
npm install ngx-np-datepicker
```

### Demo
<a href="https://wwwbijay.github.io/angular-nepali-datepicker/" target="_blank">Click here to check demo.</a>



### Note
This package has no dependancy.

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


### Format
The supported date format is dd-mm-yyyy

### License
MIT License


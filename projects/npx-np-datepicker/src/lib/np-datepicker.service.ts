import { Injectable } from '@angular/core';
import { NP_DATE } from './dateconst';

@Injectable({
  providedIn: 'root',
})
export class NpDatePickerService {
  englishMonths = NP_DATE.englishMonths;
  englishLeapMonths = NP_DATE.englishLeapMonths;
  nepaliMonths = NP_DATE.nepaliMonths;

  englishYear: any;
  englishMonth: any;
  englishDate: any;

  nepaliYear: any;
  nepaliMonth: any;
  nepaliDate: any;

  weekDay: any;
  format = '.';

  private setCurrentNepaliDate() {
    var d = new Date();
    return this.engToNepDate(d.getDate(), d.getMonth(), d.getFullYear());
  }

  //English to Nepali date conversion
  engToNepDate(date: any, month: any, year: any) {
    if (!this.isEnglishRange(date, month, year))
      console.log('Invalid date format.');

    this.englishYear = year;
    this.englishMonth = month + 1;
    this.englishDate = date;

    //Setting nepali reference to 2000/1/1 with english date 1943/4/14
    this.nepaliYear = 2000;
    this.nepaliMonth = 1;
    this.nepaliDate = 1;

    var difference = this.getEnglishDateDifference(1943, 4, 14);

    //Getting nepali year untill the difference remains less than 365
    var index = 0;
    while (difference >= this.nepaliYearDays(index)) {
      this.nepaliYear++;
      difference = difference - this.nepaliYearDays(index);
      index++;
      //console.log('Difference:'+difference+ 'nepaliYearDays:'+this.nepaliYearDays(index));
    }

    //console.log("nepaliMonths="+this.nepaliMonths[index][0]+"difference:"+difference);
    //Getting nepali month untill the difference remains less than 31
    var i = 0;
    while (difference >= this.nepaliMonths[index][i]) {
      difference = difference - this.nepaliMonths[index][i];
      this.nepaliMonth++;
      i++;
      //console.log("nepaliMonths="+this.nepaliMonths[index][i]+"difference:"+difference);
    }
    this.nepaliMonth--;
    //console.log(difference);

    //Remaning days is the date;
    this.nepaliDate = this.nepaliDate + difference;
    this.getDay();

    return {
      day: this.nepaliDate,
      month: this.nepaliMonth,
      year: this.nepaliYear,
    };
  }

  //ISO format English string date (YYYY-MM-DD) to Nepali date conversion
  engStringToNepDate(engDate: string) {
    const [year, month, day] = engDate.split('-').map(Number);

    if (!this.isEnglishRange(day, month, year))
      console.log('Invalid date format.');

    this.englishYear = year;
    this.englishMonth = month + 1;
    this.englishDate = day;

    //Setting nepali reference to 2000/1/1 with english date 1943/4/14
    this.nepaliYear = 2000;
    this.nepaliMonth = 1;
    this.nepaliDate = 1;

    var difference = this.getEnglishDateDifference(1943, 4, 14);

    //Getting nepali year untill the difference remains less than 365
    var index = 0;
    while (difference >= this.nepaliYearDays(index)) {
      this.nepaliYear++;
      difference = difference - this.nepaliYearDays(index);
      index++;
      //console.log('Difference:'+difference+ 'nepaliYearDays:'+this.nepaliYearDays(index));
    }

    //console.log("nepaliMonths="+this.nepaliMonths[index][0]+"difference:"+difference);
    //Getting nepali month untill the difference remains less than 31
    var i = 0;
    while (difference >= this.nepaliMonths[index][i]) {
      difference = difference - this.nepaliMonths[index][i];
      this.nepaliMonth++;
      i++;
      //console.log("nepaliMonths="+this.nepaliMonths[index][i]+"difference:"+difference);
    }
    this.nepaliMonth--;
    //console.log(difference);

    //Remaning days is the date;
    this.nepaliDate = this.nepaliDate + difference;
    this.getDay();

    return {
      day: this.nepaliDate,
      month: this.nepaliMonth,
      year: this.nepaliYear,
    };
  }

  private toEnglishString(format: any) {
    if (typeof format === 'undefined') format = '-';
    return (
      this.englishYear + format + this.englishMonth + format + this.englishDate
    );
  }

  private getEnglishDateDifference(year: any, month: any, date: any) {
    //Getting difference from the current date with the date provided
    var difference =
      this.countTotalEnglishDays(
        this.englishYear,
        this.englishMonth,
        this.englishDate
      ) - this.countTotalEnglishDays(year, month, date);
    return difference < 0 ? -difference : difference;
  }

  private countTotalEnglishDays(year: any, month: any, date: any) {
    var totalDays = year * 365 + date;

    for (var i = 0; i < month - 1; i++)
      totalDays = totalDays + this.englishMonths[i];

    totalDays = totalDays + this.countleap(year, month);
    return totalDays;
  }

  private countleap(year: any, month: any) {
    if (month <= 2) year--;

    return (
      Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)
    );
  }

  private isEnglishRange(date: any, month: any, year: any) {
    if (year < 1944 || year > 2042) return false;
    if (month < 1 || month > 12) return false;
    if (date < 1 || date > 31) return false;

    return true;
  }

  private isLeapYear(year: any) {
    if (year % 4 === 0) {
      return year % 100 === 0 ? year % 400 === 0 : true;
    } else return false;
  }

  //Nepali to English conversion
  nepToEngDate(date: any, month: any, year: any) {
    if (!this.isNepaliRange(date, month, year)) {
      console.log('Invalid Date Format');
      // throw new Exception("Invalid date format.");
      return;
    }

    this.nepaliYear = year;
    this.nepaliMonth = month + 1;
    this.nepaliDate = date;

    //Setting english reference to 1944/1/1 with nepali date 2000/9/17
    this.englishYear = 1944;
    this.englishMonth = 1;
    this.englishDate = 1;

    var difference = this.getNepaliDateDifference(2000, 9, 17);

    //Getting english year untill the difference remains less than 365
    while (difference >= (this.isLeapYear(this.englishYear) ? 366 : 365)) {
      difference = difference - (this.isLeapYear(this.englishYear) ? 366 : 365);
      this.englishYear++;
    }

    //Getting english month untill the difference remains less than 31
    var monthDays = this.isLeapYear(this.englishYear)
      ? this.englishLeapMonths
      : this.englishMonths;
    var i = 0;
    while (difference >= monthDays[i]) {
      this.englishMonth++;
      difference = difference - monthDays[i];
      i++;
    }

    //Remaning days is the date;
    this.englishDate = this.englishDate + difference;
    this.getDay();

    return new Date(
      this.englishYear + '-' + this.englishMonth + '-' + this.englishDate
    );
  }

  private toNepaliString(format: any) {
    if (typeof format === 'undefined') format = '-';
    return (
      this.nepaliYear + format + this.nepaliMonth + format + this.nepaliDate
    );
  }

  private getNepaliDateDifference(year: any, month: any, date: any) {
    //Getting difference from the current date with the date provided
    var difference =
      this.countTotalNepaliDays(
        this.nepaliYear,
        this.nepaliMonth,
        this.nepaliDate
      ) - this.countTotalNepaliDays(year, month, date);
    return difference < 0 ? -difference : difference;
  }

  private countTotalNepaliDays(year: any, month: any, date: any) {
    var total = 0;
    if (year < 2000) return 0;

    total = total + (date - 1);

    var yearIndex = year - 2000;
    for (var i = 0; i < month - 1; i++)
      total = total + this.nepaliMonths[yearIndex][i];

    for (var i = 0; i < yearIndex; i++) total = total + this.nepaliYearDays(i);

    return total;
  }

  private nepaliYearDays(index: any) {
    var total = 0;
    for (var i = 0; i < 12; i++) total += this.nepaliMonths[index][i];
    return total;
  }

  private isNepaliRange(date: any, month: any, year: any) {
    if (year < 2000 || year > 2099) return false;

    if (month < 0 || month > 11) return false;

    if (date < 1 || date > this.nepaliMonths[year - 2000][month - 1])
      return false;

    return true;
  }

  //Class Regular methods

  private getDay() {
    //Reference date 1943/4/14 Wednesday
    var difference = this.getEnglishDateDifference(1943, 4, 14);
    this.weekDay = ((3 + (difference % 7)) % 7) + 1;
    return this.weekDay;
  }

  private getEnglishYear() {
    return this.englishYear;
  }

  private getEnglishMonth() {
    return this.englishMonth;
  }

  private getEnglishDate() {
    return this.englishDate;
  }

  private getNepaliYear() {
    return this.nepaliYear;
  }
  private getNepaliMonth() {
    return this.nepaliMonth;
  }

  private getNepaliDate() {
    return this.nepaliDate;
  }
}

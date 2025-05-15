import * as i0 from '@angular/core';
import { Injectable, Pipe, forwardRef, Component, ViewEncapsulation, Input, HostListener, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i2 from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

class NpDatePickerService {
    constructor() {
        this.englishMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.englishLeapMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.nepaliMonths = [
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
            [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
            [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
            [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31],
            [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30], //2099
        ];
        this.format = '.';
        var d = new Date();
    }
    setCurrentNepaliDate() {
        var d = new Date();
        return this.engToNepDate(d.getDate(), d.getMonth(), d.getFullYear());
    }
    //English to Nepali date conversion
    engToNepDate(date, month, year) {
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
            year: this.nepaliYear
        };
    }
    toEnglishString(format) {
        if (typeof format === 'undefined')
            format = '-';
        return (this.englishYear + format + this.englishMonth + format + this.englishDate);
    }
    getEnglishDateDifference(year, month, date) {
        //Getting difference from the current date with the date provided
        var difference = this.countTotalEnglishDays(this.englishYear, this.englishMonth, this.englishDate) - this.countTotalEnglishDays(year, month, date);
        return difference < 0 ? -difference : difference;
    }
    countTotalEnglishDays(year, month, date) {
        var totalDays = year * 365 + date;
        for (var i = 0; i < month - 1; i++)
            totalDays = totalDays + this.englishMonths[i];
        totalDays = totalDays + this.countleap(year, month);
        return totalDays;
    }
    countleap(year, month) {
        if (month <= 2)
            year--;
        return (Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400));
    }
    isEnglishRange(date, month, year) {
        if (year < 1944 || year > 2042)
            return false;
        if (month < 1 || month > 12)
            return false;
        if (date < 1 || date > 31)
            return false;
        return true;
    }
    isLeapYear(year) {
        if (year % 4 === 0) {
            return year % 100 === 0 ? year % 400 === 0 : true;
        }
        else
            return false;
    }
    //Nepali to English conversion
    nepToEngDate(date, month, year) {
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
        return new Date(this.englishYear + '-' + this.englishMonth + '-' + this.englishDate);
    }
    toNepaliString(format) {
        if (typeof format === 'undefined')
            format = '-';
        return (this.nepaliYear + format + this.nepaliMonth + format + this.nepaliDate);
    }
    getNepaliDateDifference(year, month, date) {
        //Getting difference from the current date with the date provided
        var difference = this.countTotalNepaliDays(this.nepaliYear, this.nepaliMonth, this.nepaliDate) - this.countTotalNepaliDays(year, month, date);
        return difference < 0 ? -difference : difference;
    }
    countTotalNepaliDays(year, month, date) {
        var total = 0;
        if (year < 2000)
            return 0;
        total = total + (date - 1);
        var yearIndex = year - 2000;
        for (var i = 0; i < month - 1; i++)
            total = total + this.nepaliMonths[yearIndex][i];
        for (var i = 0; i < yearIndex; i++)
            total = total + this.nepaliYearDays(i);
        return total;
    }
    nepaliYearDays(index) {
        var total = 0;
        for (var i = 0; i < 12; i++)
            total += this.nepaliMonths[index][i];
        return total;
    }
    isNepaliRange(date, month, year) {
        if (year < 2000 || year > 2099)
            return false;
        if (month < 0 || month > 11)
            return false;
        if (date < 1 || date > this.nepaliMonths[year - 2000][month - 1])
            return false;
        return true;
    }
    //Class Regular methods
    getDay() {
        //Reference date 1943/4/14 Wednesday
        var difference = this.getEnglishDateDifference(1943, 4, 14);
        this.weekDay = ((3 + (difference % 7)) % 7) + 1;
        return this.weekDay;
    }
    getEnglishYear() {
        return this.englishYear;
    }
    getEnglishMonth() {
        return this.englishMonth;
    }
    getEnglishDate() {
        return this.englishDate;
    }
    getNepaliYear() {
        return this.nepaliYear;
    }
    getNepaliMonth() {
        return this.nepaliMonth;
    }
    getNepaliDate() {
        return this.nepaliDate;
    }
}
NpDatePickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NpDatePickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NpDatePickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NpDatePickerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NpDatePickerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

const numberMapping = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const wordsMapping = {
    year: 'साल',
    month: 'महिना'
};
const daysMapping = {
    en: {
        default: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    },
    ne: {
        default: ['आइत', 'सोम', 'मंगल्', 'बुध', 'बिही', 'शुक्र', 'शनि'],
        short: ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श']
    }
};
const monthsMapping = {
    en: {
        default: [
            'Baisakh', 'Jestha', 'Asadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Marga', 'Falgun', 'Chaitra'
        ],
        modern: [
            'Baisakh', 'Jeth', 'Asaar', 'Saawn', 'Bhadau', 'Aashoj', 'Kartik', 'Mangsir', 'Push', 'Magh', 'Fagun', 'Chait'
        ],
        short: [
            'Bai', 'Jes', 'Asa', 'Shr', 'Bha', 'Ash', 'Kar', 'Man', 'Pou', 'Mar', 'Fal', 'Cha'
        ]
    },
    ne: {
        default: [
            'बैशाख', 'जेष्ठ', 'आषाढ', 'श्रवण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'मार्ग', 'फाल्गुन', 'चैत्र'
        ],
        modern: [
            'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'अशोज', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
        ],
        short: [
            'बै', 'जे', 'अ', 'श्रा', 'भा', 'आ', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'
        ]
    }
};

class ToNpPipe {
    transform(value, language = 'ne', type = 'number') {
        if (value) {
            if (language === 'ne') {
                switch (type) {
                    case 'number':
                        const split = value.toString().split('');
                        return split
                            .map((n) => {
                            if (n === ' ') {
                                return ' ';
                            }
                            return numberMapping[+n] ? numberMapping[+n] : n;
                        })
                            .join('');
                    case 'word':
                        let wrd = value.toString().toLowerCase();
                        if (wrd === 'month') {
                            return wordsMapping['month'];
                        }
                        else if (wrd === 'year') {
                            return wordsMapping['year'];
                        }
                        else {
                            return wrd;
                        }
                    default:
                }
            }
            else {
                return value;
            }
        }
        else {
            return '';
        }
    }
}
ToNpPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ToNpPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ToNpPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ToNpPipe, name: "toNp" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ToNpPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toNp',
                }]
        }] });

class NpDatePickerComponent {
    constructor(_nepaliDate, eRef) {
        this._nepaliDate = _nepaliDate;
        this.eRef = eRef;
        this.nepaliDateToday = { day: 0, month: 0, year: 0 };
        this.currentNepaliDate = { day: 0, month: 0, year: 0 };
        this.formattedDate = '';
        this.years = [];
        this.daysMapping = daysMapping;
        this.monthsMapping = monthsMapping;
        this.isOpen = false;
        this.hideInput = false;
        this.alwaysVisible = false;
        this.language = 'ne';
        this.hasFuture = true;
        this.format = 'yy-mm-dd';
        this.monthDisplayType = 'default';
        this.dayDisplayType = 'short';
        this.dateFormatter = (selectedDate) => {
            const dd = selectedDate.day < 10 ? '0' + selectedDate.day : selectedDate.day;
            const mm = selectedDate.month < 10
                ? '0' + (selectedDate.month + 1)
                : selectedDate.month + 1;
            switch (this.format) {
                case 'dd-mm-yy':
                    return `${dd}/${mm}/${this.selectedDate.year}`;
                default:
                    return `${this.selectedDate.year}/${mm}/${dd}`;
            }
        };
        this.initialized = false;
        this.propagateChange = (_) => { };
        this.propagateTouch = (_) => { };
        this.currentDate = new Date();
        this.nepaliDateToday = _nepaliDate.engToNepDate(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear());
    }
    clickout(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }
    ngOnInit() {
        this.setCurrentDate();
        //this.selectDate(this.currentNepaliDate.day);
        this.populateYears();
        this.setCurrentMonthData();
        // console.log(this.currentMonthData);
    }
    populateYears() {
        for (let i = 2001; i <= 2099; i++) {
            this.years.push(i);
        }
    }
    selectYear(e) {
        this.currentNepaliDate.year = parseInt(e.target.value);
        const newDate = {
            day: this.currentNepaliDate.day,
            month: this.currentNepaliDate.month,
            year: this.currentNepaliDate.year,
        };
        this.currentDate = this._nepaliDate.nepToEngDate(newDate.day, newDate.month, newDate.year);
        this.setCurrentMonthData();
    }
    selectMonth(e) {
        let month = e.target.value;
        let nep_month_index = this.monthsMapping[this.language][this.monthDisplayType]?.indexOf(month) ?? 0;
        this.currentNepaliDate.month = nep_month_index;
        const newNepaliDate = {
            day: this.currentNepaliDate.day,
            month: this.currentNepaliDate.month,
            year: this.currentNepaliDate.year,
        };
        this.currentDate = this._nepaliDate.nepToEngDate(newNepaliDate.day, newNepaliDate.month, newNepaliDate.year);
        // console.log(this.currentDate);
        this.setCurrentMonthData();
    }
    resetCurrentMonthData() {
        this.currentMonthData = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
        };
    }
    formatValue() {
        if (this.selectedDate) {
            this.formattedDate = this.dateFormatter(this.selectedDate);
        }
    }
    writeValue(value) {
        this.propagateChange(this.selectedDate);
        if (value) {
            this.selectedDate = value;
            this.currentNepaliDate = value;
            this.formatValue();
        }
    }
    registerOnTouched() { }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    setCurrentDate() {
        if (!this.selectedDate) {
            this.currentNepaliDate = this._nepaliDate.engToNepDate(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear());
        }
        else {
            const { day, month, year } = this.selectedDate;
            this.currentNepaliDate = this._nepaliDate.engToNepDate(day, month, year);
            this.currentDate = this._nepaliDate.nepToEngDate(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day);
        }
    }
    setCurrentMonthData() {
        this.resetCurrentMonthData();
        // fill the currentMonthData with current date
        let day = this.currentDate.getDay();
        this.currentMonthData[day] = [this.currentNepaliDate.day];
        // fill the currentMonthData with day before the current date
        this.setMonthDataBefore(day - 1, this.currentNepaliDate.day - 1);
        var currentMonthMaxValue = this._nepaliDate.nepaliMonths[this.currentNepaliDate.year - 2000][this.currentNepaliDate.month];
        // fill the currentMonthData with day after the current date
        this.setMonthDataAfter(day + 1, this.currentNepaliDate.day + 1, currentMonthMaxValue);
        // we need some empty spaces in place so that the dates are shown in correct order
        // eg if the 1st day starts on monday then we need 1 empty space for non existingn date on Sunday
        this.createEmptySpaces();
    }
    setMonthDataBefore(day, date) {
        if (date >= 1) {
            if (day < 0) {
                day = 6;
            }
            this.currentMonthData[day] = [date, ...this.currentMonthData[day]];
            this.setMonthDataBefore(--day, --date);
        }
    }
    setMonthDataAfter(day, date, currentMonthMaxValue) {
        const nepaliDate = {
            day: date,
            month: this.currentNepaliDate.month,
            year: this.currentNepaliDate.year,
        };
        //  only add the data if the current month matches
        if (date <= currentMonthMaxValue) {
            if (day > 6) {
                day = 0;
            }
            this.currentMonthData[day] = [...this.currentMonthData[day], date];
            this.setMonthDataAfter(++day, ++date, currentMonthMaxValue);
        }
    }
    createEmptySpaces() {
        // first find out which day has the 1st
        //  if its a Sunday, then don't do anything else add 1 space on each previous day
        let dayIndex = 0;
        let value;
        Object.values(this.currentMonthData).map((item, index) => {
            value = item;
            if (value.includes(1)) {
                dayIndex = index;
            }
            return value.includes(1);
        });
        if (dayIndex) {
            for (dayIndex; dayIndex > 0; dayIndex--) {
                const monthData = this.currentMonthData[dayIndex - 1];
                this.currentMonthData[dayIndex - 1] = [null, ...monthData];
            }
        }
    }
    selectDate(day) {
        this.selectedDate = { ...this.currentNepaliDate, day };
        this.formatValue();
        this.close();
        this.propagateChange(this.selectedDate);
    }
    prevMonth() {
        if (this.currentNepaliDate.month <= 0) {
            this.currentNepaliDate.month = 11;
            this.currentNepaliDate.year--;
        }
        else {
            this.currentNepaliDate.month--;
        }
        const newNepaliDate = {
            day: this.currentNepaliDate.day,
            month: this.currentNepaliDate.month,
            year: this.currentNepaliDate.year,
        };
        this.currentDate = this._nepaliDate.nepToEngDate(newNepaliDate.day, newNepaliDate.month, newNepaliDate.year);
        this.setCurrentMonthData();
    }
    nextMonth() {
        if (this.currentNepaliDate.month >= 11) {
            this.currentNepaliDate.month = 0;
            this.currentNepaliDate.year++;
        }
        else {
            this.currentNepaliDate.month++;
        }
        const newDate = {
            day: this.currentNepaliDate.day,
            month: this.currentNepaliDate.month,
            year: this.currentNepaliDate.year,
        };
        this.currentDate = this._nepaliDate.nepToEngDate(newDate.day, newDate.month, newDate.year);
        this.setCurrentMonthData();
    }
    toggleOpen() {
        if (!this.alwaysVisible) {
            this.isOpen = !this.isOpen;
        }
    }
    open() {
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
        //this.setCurrentDate();
    }
}
NpDatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NpDatePickerComponent, deps: [{ token: NpDatePickerService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NpDatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: NpDatePickerComponent, selector: "np-datepicker", inputs: { theme: "theme", language: "language", hasFuture: "hasFuture", format: "format" }, host: { listeners: { "document:click": "clickout($event)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NpDatePickerComponent),
            multi: true,
        },
    ], ngImport: i0, template: "<div class=\"nepali-date-picker\" [ngClass]=\"theme\">\r\n  <input\r\n    class=\"np_datepicker_input\"\r\n    type=\"text\"\r\n    [value]=\"formattedDate\"\r\n    (focus)=\"open()\"\r\n    (keydown)=\"$event.preventDefault()\"\r\n    aria-hidden=\"true\"\r\n    placeholder=\"yyyy/mm/dd\"\r\n  />\r\n  <a\r\n    class=\"form-icon\"\r\n    (click)=\"toggleOpen()\"\r\n    [ngClass]=\"isOpen ? 'active' : ''\"\r\n  >\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\">\r\n      <path\r\n        d=\"M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z\"\r\n      />\r\n    </svg>\r\n  </a>\r\n  <ng-container [ngTemplateOutlet]=\"dp\" *ngIf=\"isOpen\"></ng-container>\r\n</div>\r\n<!--.nepali-date-picker-->\r\n\r\n<ng-template #dp>\r\n  <div class=\"datepicker__container\">\r\n    <div class=\"datepicker__options-container\">\r\n      <a class=\"prev-month\" (click)=\"prevMonth()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\">\r\n          <path\r\n            d=\"M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z\"\r\n          />\r\n        </svg>\r\n      </a>\r\n      <span class=\"datepicker__options-month-container\">\r\n        \r\n        <select (change)=\"selectMonth($event)\">\r\n          <option\r\n            *ngFor=\"\r\n              let month of monthsMapping[language][monthDisplayType];\r\n              index as i\r\n            \"\r\n            [value]=\"month\"\r\n            [selected]=\"i === currentNepaliDate?.month\"\r\n          >\r\n            {{ month }}\r\n          </option>\r\n        </select>\r\n      </span>\r\n      <span class=\"datepicker__options-year-container\">\r\n        \r\n        <select (change)=\"selectYear($event)\">\r\n          <option\r\n            *ngFor=\"let year of years; index as i\"\r\n            [value]=\"year\"\r\n            [selected]=\"year == currentNepaliDate?.year\"\r\n          >\r\n            {{ year | toNp: language:\"number\" }}\r\n          </option>\r\n        </select>\r\n      </span>\r\n      \r\n      <a class=\"next-month\" (click)=\"nextMonth()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\">\r\n          <path\r\n            d=\"M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z\"\r\n          />\r\n        </svg>\r\n      </a>\r\n    </div>\r\n    <div class=\"datepicker__days-container\">\r\n      <div\r\n        class=\"datepicker__days\"\r\n        *ngFor=\"let day of daysMapping[language][dayDisplayType]; index as i\"\r\n      >\r\n        <div class=\"datepicker__weekday\">{{ day }}</div>\r\n        <div\r\n          class=\"datepicker__date-container\"\r\n          *ngFor=\"let date of currentMonthData[i]\"\r\n        >\r\n          <div *ngIf=\"hasFuture; else noFutureDate\">\r\n            <div\r\n              *ngIf=\"date\"\r\n              class=\"datepicker__date\"\r\n              [class.datepicker__date--active]=\"\r\n                date === selectedDate?.day &&\r\n                currentNepaliDate.month === selectedDate?.month &&\r\n                currentNepaliDate.year === selectedDate?.year\r\n              \"\r\n              [class.datepicker__date--current-day]=\"\r\n                date === nepaliDateToday.day &&\r\n                currentNepaliDate.month === nepaliDateToday.month &&\r\n                currentNepaliDate.year === nepaliDateToday.year\r\n              \"\r\n              (click)=\"selectDate(date)\"\r\n            >\r\n              {{ date | toNp: language:\"number\" }}\r\n            </div>\r\n            <div *ngIf=\"!date\" class=\"datepicker__date--disabled\">\r\n              <span>&nbsp;</span>\r\n            </div>\r\n          </div>\r\n\r\n          <ng-template #noFutureDate>\r\n            <div\r\n              *ngIf=\"\r\n                date &&\r\n                  this.currentNepaliDate.year * 365 +\r\n                    this.currentNepaliDate.month * 30 +\r\n                    date <=\r\n                    nepaliDateToday.day +\r\n                      nepaliDateToday.month * 30 +\r\n                      nepaliDateToday.year * 365;\r\n                else disabledDates\r\n              \"\r\n              class=\"datepicker__date\"\r\n              [class.datepicker__date--active]=\"\r\n                date === selectedDate?.day &&\r\n                currentNepaliDate.month === selectedDate?.month &&\r\n                currentNepaliDate.year === selectedDate?.year\r\n              \"\r\n              [class.datepicker__date--current-day]=\"\r\n                date === nepaliDateToday.day &&\r\n                currentNepaliDate.month === nepaliDateToday.month &&\r\n                currentNepaliDate.year === nepaliDateToday.year\r\n              \"\r\n              (click)=\"selectDate(date)\"\r\n            >\r\n              {{ date | toNp: language:\"number\" }}\r\n            </div>\r\n\r\n            <ng-template #disabledDates>\r\n              <div class=\"datepicker__date datepicker__date--disabled\">\r\n                {{ date | toNp: language:\"number\" }}\r\n              </div>\r\n            </ng-template>\r\n\r\n            <div *ngIf=\"!date\" class=\"datepicker__date--disabled\">\r\n              <span>&nbsp;</span>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n        <!--.datepicker__date-container ends-->\r\n      </div>\r\n      <!--.datepicker__days ends-->\r\n    </div>\r\n    <!--.datepicker__days-container ends-->\r\n  </div>\r\n  <!--.datepicker__container ends-->\r\n</ng-template>\r\n", styles: [".nepali-date-picker.nepali-date-picker{position:relative;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:1em}.nepali-date-picker a.active svg{fill:#e45415;opacity:.9}.nepali-date-picker .form-icon svg{width:14px;opacity:.3;position:absolute;right:8px;top:12px;cursor:pointer}.datepicker__container{border:1px solid #eee;background:#fff;width:294px;box-shadow:#0a0a0f33 0 7px 29px;position:absolute;z-index:99999}.datepicker__options-container{padding:12px 5px;border-bottom:1px solid #eee;display:flex;justify-content:space-evenly;background-color:#e45415;color:#fff;line-height:25px;font-size:1em}.datepicker__days-container{display:flex;justify-content:center;color:#777}.datepicker__days{text-align:center;padding-bottom:10px}.datepicker__weekday{padding:8px;font-weight:700;border-bottom:1px solid #eee;margin-bottom:14px}.datepicker__date-container{width:40px;height:40px;line-height:40px;margin:8px 0}.datepicker__date-container>div{height:100%}.datepicker__date{cursor:pointer;border-radius:50%}.datepicker__date:hover{background-color:#eee}.datepicker__date.datepicker__date--disabled{background:#f3f3f3;border-radius:0}.datepicker__date.datepicker__date--disabled:hover{background:#f3f3f3}.datepicker__date--active.datepicker__date--active{background-color:#e45415;color:#fff}select:focus,select:focus-visible{outline:1px solid #fff}.datepicker__container select{border:none;color:#fff;background:none;font-size:inherit}select option{color:#333}.np_datepicker_input{border:1px solid #eee;padding:10px;font-size:16px;color:#777}.np_datepicker_input:focus-visible{outline:2px solid #e45415}.prev-month,.next-month{padding:0;width:25px;height:25px;display:block;opacity:.5;border-radius:50%;background:#f3f3f3;cursor:pointer;text-align:center;line-height:23px}.next-month:hover,.prev-month:hover{background:#ccc}.prev-month svg,.next-month svg{max-width:8px;height:auto}.dark.nepali-date-picker a.active svg{fill:#000}.dark .datepicker__options-container{border-bottom:1px solid #000;background-color:#000;color:#fff}.dark .datepicker__container{background:#333}.dark select{color:#fff}.datepicker__date--current-day{border:2px solid rgba(0,0,0,.2);position:relative;z-index:999;height:100%}.dark .datepicker__date--active.datepicker__date--active{background-color:#000;color:#fff}.dark .np_datepicker_input:focus-visible{outline:2px solid #000}.dark .datepicker__days{background-color:#333}.dark .datepicker__date:hover{background-color:#222;color:#fff}.dark .datepicker__days-container{color:#aaa}.dark .datepicker__weekday{border-bottom:1px solid #555}.dark .datepicker__date--current-day{background:#555;border:none}.light.nepali-date-picker a.active svg{fill:#777}.light .datepicker__options-container{border-bottom:none;background-color:#fff;color:#777}.light select{color:#777}.light .datepicker__date--active.datepicker__date--active{background-color:#aaa;color:#fff}.light .np_datepicker_input:focus-visible{outline:1px solid #ddd}.lightblue.nepali-date-picker a.active svg{fill:#38c5f0da}.lightblue .datepicker__options-container{background-color:#38c5f0da;color:#fff}.lightblue select{color:#fff}.lightblue .datepicker__date--active.datepicker__date--active{background-color:#38c5f0da;color:#fff}.lightblue .np_datepicker_input:focus-visible{outline:2px solid #38c5f0da}.lightblue .np_datepicker_input:focus-visible{outline:1px solid #38c5f0da}\n"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }], pipes: { "toNp": ToNpPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NpDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'np-datepicker', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NpDatePickerComponent),
                            multi: true,
                        },
                    ], encapsulation: ViewEncapsulation.None, template: "<div class=\"nepali-date-picker\" [ngClass]=\"theme\">\r\n  <input\r\n    class=\"np_datepicker_input\"\r\n    type=\"text\"\r\n    [value]=\"formattedDate\"\r\n    (focus)=\"open()\"\r\n    (keydown)=\"$event.preventDefault()\"\r\n    aria-hidden=\"true\"\r\n    placeholder=\"yyyy/mm/dd\"\r\n  />\r\n  <a\r\n    class=\"form-icon\"\r\n    (click)=\"toggleOpen()\"\r\n    [ngClass]=\"isOpen ? 'active' : ''\"\r\n  >\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\">\r\n      <path\r\n        d=\"M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z\"\r\n      />\r\n    </svg>\r\n  </a>\r\n  <ng-container [ngTemplateOutlet]=\"dp\" *ngIf=\"isOpen\"></ng-container>\r\n</div>\r\n<!--.nepali-date-picker-->\r\n\r\n<ng-template #dp>\r\n  <div class=\"datepicker__container\">\r\n    <div class=\"datepicker__options-container\">\r\n      <a class=\"prev-month\" (click)=\"prevMonth()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\">\r\n          <path\r\n            d=\"M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z\"\r\n          />\r\n        </svg>\r\n      </a>\r\n      <span class=\"datepicker__options-month-container\">\r\n        \r\n        <select (change)=\"selectMonth($event)\">\r\n          <option\r\n            *ngFor=\"\r\n              let month of monthsMapping[language][monthDisplayType];\r\n              index as i\r\n            \"\r\n            [value]=\"month\"\r\n            [selected]=\"i === currentNepaliDate?.month\"\r\n          >\r\n            {{ month }}\r\n          </option>\r\n        </select>\r\n      </span>\r\n      <span class=\"datepicker__options-year-container\">\r\n        \r\n        <select (change)=\"selectYear($event)\">\r\n          <option\r\n            *ngFor=\"let year of years; index as i\"\r\n            [value]=\"year\"\r\n            [selected]=\"year == currentNepaliDate?.year\"\r\n          >\r\n            {{ year | toNp: language:\"number\" }}\r\n          </option>\r\n        </select>\r\n      </span>\r\n      \r\n      <a class=\"next-month\" (click)=\"nextMonth()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\">\r\n          <path\r\n            d=\"M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z\"\r\n          />\r\n        </svg>\r\n      </a>\r\n    </div>\r\n    <div class=\"datepicker__days-container\">\r\n      <div\r\n        class=\"datepicker__days\"\r\n        *ngFor=\"let day of daysMapping[language][dayDisplayType]; index as i\"\r\n      >\r\n        <div class=\"datepicker__weekday\">{{ day }}</div>\r\n        <div\r\n          class=\"datepicker__date-container\"\r\n          *ngFor=\"let date of currentMonthData[i]\"\r\n        >\r\n          <div *ngIf=\"hasFuture; else noFutureDate\">\r\n            <div\r\n              *ngIf=\"date\"\r\n              class=\"datepicker__date\"\r\n              [class.datepicker__date--active]=\"\r\n                date === selectedDate?.day &&\r\n                currentNepaliDate.month === selectedDate?.month &&\r\n                currentNepaliDate.year === selectedDate?.year\r\n              \"\r\n              [class.datepicker__date--current-day]=\"\r\n                date === nepaliDateToday.day &&\r\n                currentNepaliDate.month === nepaliDateToday.month &&\r\n                currentNepaliDate.year === nepaliDateToday.year\r\n              \"\r\n              (click)=\"selectDate(date)\"\r\n            >\r\n              {{ date | toNp: language:\"number\" }}\r\n            </div>\r\n            <div *ngIf=\"!date\" class=\"datepicker__date--disabled\">\r\n              <span>&nbsp;</span>\r\n            </div>\r\n          </div>\r\n\r\n          <ng-template #noFutureDate>\r\n            <div\r\n              *ngIf=\"\r\n                date &&\r\n                  this.currentNepaliDate.year * 365 +\r\n                    this.currentNepaliDate.month * 30 +\r\n                    date <=\r\n                    nepaliDateToday.day +\r\n                      nepaliDateToday.month * 30 +\r\n                      nepaliDateToday.year * 365;\r\n                else disabledDates\r\n              \"\r\n              class=\"datepicker__date\"\r\n              [class.datepicker__date--active]=\"\r\n                date === selectedDate?.day &&\r\n                currentNepaliDate.month === selectedDate?.month &&\r\n                currentNepaliDate.year === selectedDate?.year\r\n              \"\r\n              [class.datepicker__date--current-day]=\"\r\n                date === nepaliDateToday.day &&\r\n                currentNepaliDate.month === nepaliDateToday.month &&\r\n                currentNepaliDate.year === nepaliDateToday.year\r\n              \"\r\n              (click)=\"selectDate(date)\"\r\n            >\r\n              {{ date | toNp: language:\"number\" }}\r\n            </div>\r\n\r\n            <ng-template #disabledDates>\r\n              <div class=\"datepicker__date datepicker__date--disabled\">\r\n                {{ date | toNp: language:\"number\" }}\r\n              </div>\r\n            </ng-template>\r\n\r\n            <div *ngIf=\"!date\" class=\"datepicker__date--disabled\">\r\n              <span>&nbsp;</span>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n        <!--.datepicker__date-container ends-->\r\n      </div>\r\n      <!--.datepicker__days ends-->\r\n    </div>\r\n    <!--.datepicker__days-container ends-->\r\n  </div>\r\n  <!--.datepicker__container ends-->\r\n</ng-template>\r\n", styles: [".nepali-date-picker.nepali-date-picker{position:relative;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:1em}.nepali-date-picker a.active svg{fill:#e45415;opacity:.9}.nepali-date-picker .form-icon svg{width:14px;opacity:.3;position:absolute;right:8px;top:12px;cursor:pointer}.datepicker__container{border:1px solid #eee;background:#fff;width:294px;box-shadow:#0a0a0f33 0 7px 29px;position:absolute;z-index:99999}.datepicker__options-container{padding:12px 5px;border-bottom:1px solid #eee;display:flex;justify-content:space-evenly;background-color:#e45415;color:#fff;line-height:25px;font-size:1em}.datepicker__days-container{display:flex;justify-content:center;color:#777}.datepicker__days{text-align:center;padding-bottom:10px}.datepicker__weekday{padding:8px;font-weight:700;border-bottom:1px solid #eee;margin-bottom:14px}.datepicker__date-container{width:40px;height:40px;line-height:40px;margin:8px 0}.datepicker__date-container>div{height:100%}.datepicker__date{cursor:pointer;border-radius:50%}.datepicker__date:hover{background-color:#eee}.datepicker__date.datepicker__date--disabled{background:#f3f3f3;border-radius:0}.datepicker__date.datepicker__date--disabled:hover{background:#f3f3f3}.datepicker__date--active.datepicker__date--active{background-color:#e45415;color:#fff}select:focus,select:focus-visible{outline:1px solid #fff}.datepicker__container select{border:none;color:#fff;background:none;font-size:inherit}select option{color:#333}.np_datepicker_input{border:1px solid #eee;padding:10px;font-size:16px;color:#777}.np_datepicker_input:focus-visible{outline:2px solid #e45415}.prev-month,.next-month{padding:0;width:25px;height:25px;display:block;opacity:.5;border-radius:50%;background:#f3f3f3;cursor:pointer;text-align:center;line-height:23px}.next-month:hover,.prev-month:hover{background:#ccc}.prev-month svg,.next-month svg{max-width:8px;height:auto}.dark.nepali-date-picker a.active svg{fill:#000}.dark .datepicker__options-container{border-bottom:1px solid #000;background-color:#000;color:#fff}.dark .datepicker__container{background:#333}.dark select{color:#fff}.datepicker__date--current-day{border:2px solid rgba(0,0,0,.2);position:relative;z-index:999;height:100%}.dark .datepicker__date--active.datepicker__date--active{background-color:#000;color:#fff}.dark .np_datepicker_input:focus-visible{outline:2px solid #000}.dark .datepicker__days{background-color:#333}.dark .datepicker__date:hover{background-color:#222;color:#fff}.dark .datepicker__days-container{color:#aaa}.dark .datepicker__weekday{border-bottom:1px solid #555}.dark .datepicker__date--current-day{background:#555;border:none}.light.nepali-date-picker a.active svg{fill:#777}.light .datepicker__options-container{border-bottom:none;background-color:#fff;color:#777}.light select{color:#777}.light .datepicker__date--active.datepicker__date--active{background-color:#aaa;color:#fff}.light .np_datepicker_input:focus-visible{outline:1px solid #ddd}.lightblue.nepali-date-picker a.active svg{fill:#38c5f0da}.lightblue .datepicker__options-container{background-color:#38c5f0da;color:#fff}.lightblue select{color:#fff}.lightblue .datepicker__date--active.datepicker__date--active{background-color:#38c5f0da;color:#fff}.lightblue .np_datepicker_input:focus-visible{outline:2px solid #38c5f0da}.lightblue .np_datepicker_input:focus-visible{outline:1px solid #38c5f0da}\n"] }]
        }], ctorParameters: function () { return [{ type: NpDatePickerService }, { type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], language: [{
                type: Input
            }], hasFuture: [{
                type: Input
            }], format: [{
                type: Input
            }], clickout: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class NepaliDatepickerModule {
}
NepaliDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NepaliDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NepaliDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NepaliDatepickerModule, declarations: [ToNpPipe,
        NpDatePickerComponent], imports: [BrowserModule,
        FormsModule], exports: [NpDatePickerComponent] });
NepaliDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NepaliDatepickerModule, imports: [[
            BrowserModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NepaliDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });

/*
 * Public API Surface of npx-np-datepicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NepaliDatepickerModule, NpDatePickerComponent, NpDatePickerService };
//# sourceMappingURL=ngx-np-datepicker.mjs.map

import * as i0 from "@angular/core";
export declare class NpDatePickerService {
    englishMonths: number[];
    englishLeapMonths: number[];
    nepaliMonths: number[][];
    englishYear: any;
    englishMonth: any;
    englishDate: any;
    nepaliYear: any;
    nepaliMonth: any;
    nepaliDate: any;
    weekDay: any;
    format: string;
    constructor();
    setCurrentNepaliDate(): {
        day: any;
        month: any;
        year: any;
    };
    engToNepDate(date: any, month: any, year: any): {
        day: any;
        month: any;
        year: any;
    };
    toEnglishString(format: any): any;
    getEnglishDateDifference(year: any, month: any, date: any): number;
    countTotalEnglishDays(year: any, month: any, date: any): any;
    countleap(year: any, month: any): number;
    isEnglishRange(date: any, month: any, year: any): boolean;
    isLeapYear(year: any): boolean;
    nepToEngDate(date: any, month: any, year: any): Date | undefined;
    toNepaliString(format: any): any;
    getNepaliDateDifference(year: any, month: any, date: any): number;
    countTotalNepaliDays(year: any, month: any, date: any): number;
    nepaliYearDays(index: any): number;
    isNepaliRange(date: any, month: any, year: any): boolean;
    getDay(): any;
    getEnglishYear(): any;
    getEnglishMonth(): any;
    getEnglishDate(): any;
    getNepaliYear(): any;
    getNepaliMonth(): any;
    getNepaliDate(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NpDatePickerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NpDatePickerService>;
}

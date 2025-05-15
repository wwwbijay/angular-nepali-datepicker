import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbDate } from './ngb-date';
import { toInteger } from '../util/util';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class NgbDatepickerNavigationSelect {
    constructor(i18n, _renderer) {
        this.i18n = i18n;
        this._renderer = _renderer;
        this.select = new EventEmitter();
        this._month = -1;
        this._year = -1;
    }
    changeMonth(month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); }
    changeYear(year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); }
    ngAfterViewChecked() {
        if (this.date) {
            if (this.date.month !== this._month) {
                this._month = this.date.month;
                this._renderer.setProperty(this.monthSelect.nativeElement, 'value', this._month);
            }
            if (this.date.year !== this._year) {
                this._year = this.date.year;
                this._renderer.setProperty(this.yearSelect.nativeElement, 'value', this._year);
            }
        }
    }
}
NgbDatepickerNavigationSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerNavigationSelect, deps: [{ token: i1.NgbDatepickerI18n }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NgbDatepickerNavigationSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbDatepickerNavigationSelect, selector: "ngb-datepicker-navigation-select", inputs: { date: "date", disabled: "disabled", months: "months", years: "years" }, outputs: { select: "select" }, viewQueries: [{ propertyName: "monthSelect", first: true, predicate: ["month"], descendants: true, read: ElementRef, static: true }, { propertyName: "yearSelect", first: true, predicate: ["year"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: `
    <select #month
      [disabled]="disabled"
      class="form-select"
      i18n-aria-label="@@ngb.datepicker.select-month" aria-label="Select month"
      i18n-title="@@ngb.datepicker.select-month" title="Select month"
      (change)="changeMonth($any($event).target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select #year
      [disabled]="disabled"
      class="form-select"
      i18n-aria-label="@@ngb.datepicker.select-year" aria-label="Select year"
      i18n-title="@@ngb.datepicker.select-year" title="Select year"
      (change)="changeYear($any($event).target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `, isInline: true, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerNavigationSelect, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation-select', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `
    <select #month
      [disabled]="disabled"
      class="form-select"
      i18n-aria-label="@@ngb.datepicker.select-month" aria-label="Select month"
      i18n-title="@@ngb.datepicker.select-month" title="Select month"
      (change)="changeMonth($any($event).target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select #year
      [disabled]="disabled"
      class="form-select"
      i18n-aria-label="@@ngb.datepicker.select-year" aria-label="Select year"
      i18n-title="@@ngb.datepicker.select-year" title="Select year"
      (change)="changeYear($any($event).target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }, { type: i0.Renderer2 }]; }, propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], years: [{
                type: Input
            }], select: [{
                type: Output
            }], monthSelect: [{
                type: ViewChild,
                args: ['month', { static: true, read: ElementRef }]
            }], yearSelect: [{
                type: ViewChild,
                args: ['year', { static: true, read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLFNBQVMsRUFDVCxVQUFVLEVBRVgsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7OztBQTJCdkMsTUFBTSxPQUFPLDZCQUE2QjtJQWN4QyxZQUFtQixJQUF1QixFQUFVLFNBQW9CO1FBQXJELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVI5RCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUt2QyxXQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDWixVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFd0QsQ0FBQztJQUU1RSxXQUFXLENBQUMsS0FBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRyxVQUFVLENBQUMsSUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoRyxrQkFBa0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2xGO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hGO1NBQ0Y7SUFDSCxDQUFDOzswSEEvQlUsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsMFFBUUMsVUFBVSwyR0FDWCxVQUFVLDJDQTVCeEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUOzJGQUVVLDZCQUE2QjtrQkF4QnpDLFNBQVM7K0JBQ0Usa0NBQWtDLG1CQUMzQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFlBRTNCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtnSUFHUSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFFK0MsV0FBVztzQkFBaEUsU0FBUzt1QkFBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7Z0JBQ0MsVUFBVTtzQkFBOUQsU0FBUzt1QkFBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIEFmdGVyVmlld0NoZWNrZWQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7dG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3Quc2NzcyddLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c2VsZWN0ICNtb250aFxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICBjbGFzcz1cImZvcm0tc2VsZWN0XCJcclxuICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QtbW9udGhcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IG1vbnRoXCJcclxuICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LW1vbnRoXCIgdGl0bGU9XCJTZWxlY3QgbW9udGhcIlxyXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZU1vbnRoKCRhbnkoJGV2ZW50KS50YXJnZXQudmFsdWUpXCI+XHJcbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbSBvZiBtb250aHNcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImkxOG4uZ2V0TW9udGhGdWxsTmFtZShtLCBkYXRlPy55ZWFyKVwiXHJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwibVwiPnt7IGkxOG4uZ2V0TW9udGhTaG9ydE5hbWUobSwgZGF0ZT8ueWVhcikgfX08L29wdGlvbj5cclxuICAgIDwvc2VsZWN0PjxzZWxlY3QgI3llYXJcclxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgY2xhc3M9XCJmb3JtLXNlbGVjdFwiXHJcbiAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LXllYXJcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IHllYXJcIlxyXG4gICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QteWVhclwiIHRpdGxlPVwiU2VsZWN0IHllYXJcIlxyXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZVllYXIoJGFueSgkZXZlbnQpLnRhcmdldC52YWx1ZSlcIj5cclxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB5IG9mIHllYXJzXCIgW3ZhbHVlXT1cInlcIj57eyBpMThuLmdldFllYXJOdW1lcmFscyh5KSB9fTwvb3B0aW9uPlxyXG4gICAgPC9zZWxlY3Q+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3QgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkIHtcclxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1vbnRoczogbnVtYmVyW107XHJcbiAgQElucHV0KCkgeWVhcnM6IG51bWJlcltdO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xyXG5cclxuICBAVmlld0NoaWxkKCdtb250aCcsIHtzdGF0aWM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWZ9KSBtb250aFNlbGVjdDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCd5ZWFyJywge3N0YXRpYzogdHJ1ZSwgcmVhZDogRWxlbWVudFJlZn0pIHllYXJTZWxlY3Q6IEVsZW1lbnRSZWY7XHJcblxyXG4gIHByaXZhdGUgX21vbnRoID0gLTE7XHJcbiAgcHJpdmF0ZSBfeWVhciA9IC0xO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcblxyXG4gIGNoYW5nZU1vbnRoKG1vbnRoOiBzdHJpbmcpIHsgdGhpcy5zZWxlY3QuZW1pdChuZXcgTmdiRGF0ZSh0aGlzLmRhdGUueWVhciwgdG9JbnRlZ2VyKG1vbnRoKSwgMSkpOyB9XHJcblxyXG4gIGNoYW5nZVllYXIoeWVhcjogc3RyaW5nKSB7IHRoaXMuc2VsZWN0LmVtaXQobmV3IE5nYkRhdGUodG9JbnRlZ2VyKHllYXIpLCB0aGlzLmRhdGUubW9udGgsIDEpKTsgfVxyXG5cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XHJcbiAgICBpZiAodGhpcy5kYXRlKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGUubW9udGggIT09IHRoaXMuX21vbnRoKSB7XHJcbiAgICAgICAgdGhpcy5fbW9udGggPSB0aGlzLmRhdGUubW9udGg7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5tb250aFNlbGVjdC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB0aGlzLl9tb250aCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZGF0ZS55ZWFyICE9PSB0aGlzLl95ZWFyKSB7XHJcbiAgICAgICAgdGhpcy5feWVhciA9IHRoaXMuZGF0ZS55ZWFyO1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMueWVhclNlbGVjdC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB0aGlzLl95ZWFyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
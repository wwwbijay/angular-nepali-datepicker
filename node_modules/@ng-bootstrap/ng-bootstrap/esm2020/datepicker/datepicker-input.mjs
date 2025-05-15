import { Directive, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ngbAutoClose } from '../util/autoclose';
import { ngbFocusTrap } from '../util/focus-trap';
import { ngbPositioning } from '../util/positioning';
import { NgbDatepicker } from './datepicker';
import { NgbDate } from './ngb-date';
import { NgbInputDatepickerConfig } from './datepicker-input-config';
import { NgbDatepickerConfig } from './datepicker-config';
import { isString } from '../util/util';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./ngb-date-parser-formatter";
import * as i2 from "./ngb-calendar";
import * as i3 from "./adapters/ngb-date-adapter";
import * as i4 from "./datepicker-input-config";
/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
export class NgbInputDatepicker {
    constructor(_parserFormatter, _elRef, _vcRef, _renderer, _ngZone, _calendar, _dateAdapter, _document, _changeDetector, config) {
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._document = _document;
        this._changeDetector = _changeDetector;
        this._cRef = null;
        this._disabled = false;
        this._elWithFocus = null;
        this._model = null;
        this._positioning = ngbPositioning();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * Event emitted right after the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired after closing datepicker window.
         *
         * @since 4.2.0
         */
        this.closed = new EventEmitter();
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this._validatorChange = () => { };
        ['autoClose', 'container', 'positionTarget', 'placement'].forEach(input => this[input] = config[input]);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => this._positioning.update());
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this._cRef.instance.setDisabledState(this._disabled);
        }
    }
    registerOnChange(fn) { this._onChange = fn; }
    registerOnTouched(fn) { this._onTouched = fn; }
    registerOnValidatorChange(fn) { this._validatorChange = fn; }
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    validate(c) {
        const { value } = c;
        if (value != null) {
            const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
            if (!ngbDate) {
                return { 'ngbDate': { invalid: value } };
            }
            if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
                return { 'ngbDate': { minDate: { minDate: this.minDate, actual: value } } };
            }
            if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
                return { 'ngbDate': { maxDate: { maxDate: this.maxDate, actual: value } } };
            }
        }
        return null;
    }
    writeValue(value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    }
    manualDateChange(value, updateView = false) {
        const inputValueChanged = value !== this._inputValue;
        if (inputValueChanged) {
            this._inputValue = value;
            this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        }
        if (inputValueChanged || !updateView) {
            this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
        }
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    }
    isOpen() { return !!this._cRef; }
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     */
    open() {
        if (!this.isOpen()) {
            this._cRef = this._vcRef.createComponent(NgbDatepicker);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef.instance);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange((selectedDate) => {
                this.writeValue(selectedDate);
                this._onChange(selectedDate);
                this._onTouched();
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            this._elWithFocus = this._document.activeElement;
            ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
            this._cRef.instance.focus();
            let hostElement;
            if (isString(this.positionTarget)) {
                hostElement = this._document.querySelector(this.positionTarget);
            }
            else if (this.positionTarget instanceof HTMLElement) {
                hostElement = this.positionTarget;
            }
            else {
                hostElement = this._elRef.nativeElement;
            }
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                if (this._cRef) {
                    this._positioning.createPopper({
                        hostElement,
                        targetElement: this._cRef.location.nativeElement,
                        placement: this.placement,
                        appendToBody: this.container === 'body',
                    });
                }
            });
            if (this.positionTarget && !hostElement) {
                throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
            }
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.closed, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
        }
    }
    /**
     * Closes the datepicker popup.
     */
    close() {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
            this.closed.emit();
            this._changeDetector.markForCheck();
            // restore focus
            let elementToFocus = this._elWithFocus;
            if (isString(this.restoreFocus)) {
                elementToFocus = this._document.querySelector(this.restoreFocus);
            }
            else if (this.restoreFocus !== undefined) {
                elementToFocus = this.restoreFocus;
            }
            // in IE document.activeElement can contain an object without 'focus()' sometimes
            if (elementToFocus && elementToFocus['focus']) {
                elementToFocus.focus();
            }
            else {
                this._document.body.focus();
            }
            this._positioning.destroy();
        }
    }
    /**
     * Toggles the datepicker popup.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    }
    onBlur() { this._onTouched(); }
    onFocus() { this._elWithFocus = this._elRef.nativeElement; }
    ngOnChanges(changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
            if (this.isOpen()) {
                if (changes['minDate']) {
                    this._cRef.instance.minDate = this.minDate;
                }
                if (changes['maxDate']) {
                    this._cRef.instance.maxDate = this.maxDate;
                }
                this._cRef.instance.ngOnChanges(changes);
            }
        }
        if (changes['datepickerClass']) {
            const { currentValue, previousValue } = changes['datepickerClass'];
            this._applyPopupClass(currentValue, previousValue);
        }
    }
    ngOnDestroy() {
        this.close();
        this._zoneSubscription.unsubscribe();
    }
    _applyDatepickerInputs(datepickerInstance) {
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showNavigation', 'showWeekNumbers', 'weekdays']
            .forEach((optionName) => {
            if (this[optionName] !== undefined) {
                datepickerInstance[optionName] = this[optionName];
            }
        });
        datepickerInstance.startDate = this.startDate || this._model;
    }
    _applyPopupClass(newClass, oldClass) {
        const popupEl = this._cRef?.location.nativeElement;
        if (popupEl) {
            if (newClass) {
                this._renderer.addClass(popupEl, newClass);
            }
            if (oldClass) {
                this._renderer.removeClass(popupEl, oldClass);
            }
        }
    }
    _applyPopupStyling(nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.addClass(nativeElement, 'show');
        if (this.container === 'body') {
            this._renderer.addClass(nativeElement, 'ngb-dp-body');
        }
        this._applyPopupClass(this.datepickerClass);
    }
    _subscribeForDatepickerOutputs(datepickerInstance) {
        datepickerInstance.navigate.subscribe(navigateEvent => this.navigate.emit(navigateEvent));
        datepickerInstance.dateSelect.subscribe(date => {
            this.dateSelect.emit(date);
            if (this.autoClose === true || this.autoClose === 'inside') {
                this.close();
            }
        });
    }
    _writeModelValue(model) {
        const value = this._parserFormatter.format(model);
        this._inputValue = value;
        this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    }
    _fromDateStruct(date) {
        const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    }
}
NgbInputDatepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbInputDatepicker, deps: [{ token: i1.NgbDateParserFormatter }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i2.NgbCalendar }, { token: i3.NgbDateAdapter }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i4.NgbInputDatepickerConfig }], target: i0.ɵɵFactoryTarget.Directive });
NgbInputDatepicker.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: { autoClose: "autoClose", datepickerClass: "datepickerClass", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", minDate: "minDate", maxDate: "maxDate", navigation: "navigation", outsideDays: "outsideDays", placement: "placement", restoreFocus: "restoreFocus", showWeekNumbers: "showWeekNumbers", startDate: "startDate", container: "container", positionTarget: "positionTarget", weekdays: "weekdays", disabled: "disabled" }, outputs: { dateSelect: "dateSelect", navigate: "navigate", closed: "closed" }, host: { listeners: { "input": "manualDateChange($event.target.value)", "change": "manualDateChange($event.target.value, true)", "focus": "onFocus()", "blur": "onBlur()" }, properties: { "disabled": "disabled" } }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
        { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig }
    ], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbInputDatepicker, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbDatepicker]',
                    exportAs: 'ngbDatepicker',
                    host: {
                        '(input)': 'manualDateChange($event.target.value)',
                        '(change)': 'manualDateChange($event.target.value, true)',
                        '(focus)': 'onFocus()',
                        '(blur)': 'onBlur()',
                        '[disabled]': 'disabled'
                    },
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig }
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbDateParserFormatter }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i2.NgbCalendar }, { type: i3.NgbDateAdapter }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i4.NgbInputDatepickerConfig }]; }, propDecorators: { autoClose: [{
                type: Input
            }], datepickerClass: [{
                type: Input
            }], dayTemplate: [{
                type: Input
            }], dayTemplateData: [{
                type: Input
            }], displayMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], markDisabled: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], placement: [{
                type: Input
            }], restoreFocus: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], container: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], dateSelect: [{
                type: Output
            }], navigate: [{
                type: Output
            }], closed: [{
                type: Output
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBSUwsTUFBTSxFQUtQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQW1CLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBaUIsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHbkUsT0FBTyxFQUFDLGFBQWEsRUFBNkIsTUFBTSxjQUFjLENBQUM7QUFHdkUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUduQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBRXBDOzs7O0dBSUc7QUFpQkgsTUFBTSxPQUFPLGtCQUFrQjtJQXlON0IsWUFDWSxnQkFBd0MsRUFBVSxNQUFvQyxFQUN0RixNQUF3QixFQUFVLFNBQW9CLEVBQVUsT0FBZSxFQUMvRSxTQUFzQixFQUFVLFlBQWlDLEVBQy9DLFNBQWMsRUFBVSxlQUFrQyxFQUNwRixNQUFnQztRQUp4QixxQkFBZ0IsR0FBaEIs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d0JBQzVGLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7d0JBQ3hGLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSx3QkFBd0IsRUFBQztxQkFDdEU7aUJBQ0Y7OzBCQThOTSxNQUFNOzJCQUFDLFFBQVE7bUhBbk1YLFNBQVM7c0JBQWpCLEtBQUs7Z0JBT0csZUFBZTtzQkFBdkIsS0FBSztnQkFTRyxXQUFXO3NCQUFuQixLQUFLO2dCQVVHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFPRyxjQUFjO3NCQUF0QixLQUFLO2dCQU9HLGNBQWM7c0JBQXRCLEtBQUs7Z0JBU0csWUFBWTtzQkFBcEIsS0FBSztnQkFPRyxPQUFPO3NCQUFmLEtBQUs7Z0JBT0csT0FBTztzQkFBZixLQUFLO2dCQVNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBV0csV0FBVztzQkFBbkIsS0FBSztnQkFTRyxTQUFTO3NCQUFqQixLQUFLO2dCQVVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBS0csZUFBZTtzQkFBdkIsS0FBSztnQkFVRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9HLFNBQVM7c0JBQWpCLEtBQUs7Z0JBU0csY0FBYztzQkFBdEIsS0FBSztnQkFXRyxRQUFRO3NCQUFoQixLQUFLO2dCQVNJLFVBQVU7c0JBQW5CLE1BQU07Z0JBT0csUUFBUTtzQkFBakIsTUFBTTtnQkFPRyxNQUFNO3NCQUFmLE1BQU07Z0JBR0gsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlQsIFRyYW5zbGF0aW9uV2lkdGh9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQWJzdHJhY3RDb250cm9sLFxyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIE5HX1ZBTElEQVRPUlMsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgVmFsaWRhdGlvbkVycm9ycyxcclxuICBWYWxpZGF0b3JcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge25nYkF1dG9DbG9zZX0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xyXG5pbXBvcnQge25nYkZvY3VzVHJhcH0gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcclxuaW1wb3J0IHtQbGFjZW1lbnRBcnJheSwgbmdiUG9zaXRpb25pbmd9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyLCBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudH0gZnJvbSAnLi9kYXRlcGlja2VyJztcclxuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtOZ2JJbnB1dERhdGVwaWNrZXJDb25maWd9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC1jb25maWcnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJDb25maWd9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25maWcnO1xyXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IGFsbG93cyB0byBzdGljayBhIGRhdGVwaWNrZXIgcG9wdXAgdG8gYW4gaW5wdXQgZmllbGQuXHJcbiAqXHJcbiAqIE1hbmFnZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgaW5wdXQgZmllbGQgaXRzZWxmLCBkb2VzIHZhbHVlIGZvcm1hdHRpbmcgYW5kIHByb3ZpZGVzIGZvcm1zIGludGVncmF0aW9uLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ2JEYXRlcGlja2VyXScsXHJcbiAgZXhwb3J0QXM6ICduZ2JEYXRlcGlja2VyJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGlucHV0KSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICcoY2hhbmdlKSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUsIHRydWUpJyxcclxuICAgICcoZm9jdXMpJzogJ29uRm9jdXMoKScsXHJcbiAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcclxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYklucHV0RGF0ZXBpY2tlciksIG11bHRpOiB0cnVlfSxcclxuICAgIHtwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLCBtdWx0aTogdHJ1ZX0sXHJcbiAgICB7cHJvdmlkZTogTmdiRGF0ZXBpY2tlckNvbmZpZywgdXNlRXhpc3Rpbmc6IE5nYklucHV0RGF0ZXBpY2tlckNvbmZpZ31cclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiSW5wdXREYXRlcGlja2VyIGltcGxlbWVudHMgT25DaGFuZ2VzLFxyXG4gICAgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogYm9vbGVhbiB8ICcnO1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uYXZpZ2F0aW9uOiBzdHJpbmc7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX291dHNpZGVEYXlzOiBzdHJpbmc7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3dlZWtkYXlzOiBib29sZWFuIHwgbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIF9jUmVmOiBDb21wb25lbnRSZWY8TmdiRGF0ZXBpY2tlcj58IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZWxXaXRoRm9jdXM6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfbW9kZWw6IE5nYkRhdGUgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF9pbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xyXG4gIHByaXZhdGUgX3Bvc2l0aW9uaW5nID0gbmdiUG9zaXRpb25pbmcoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIGRhdGUgc2VsZWN0aW9uIC8gb3V0c2lkZSBjbGljayBvciBub3QuXHJcbiAgICpcclxuICAgKiAqIGB0cnVlYCAtIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9uIGJvdGggZGF0ZSBzZWxlY3Rpb24gYW5kIG91dHNpZGUgY2xpY2suXHJcbiAgICogKiBgZmFsc2VgIC0gdGhlIHBvcHVwIGNhbiBvbmx5IGJlIGNsb3NlZCBtYW51YWxseSB2aWEgYGNsb3NlKClgIG9yIGB0b2dnbGUoKWAgbWV0aG9kcy5cclxuICAgKiAqIGBcImluc2lkZVwiYCAtIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9uIGRhdGUgc2VsZWN0aW9uLCBidXQgbm90IG91dHNpZGUgY2xpY2tzLlxyXG4gICAqICogYFwib3V0c2lkZVwiYCAtIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2sgYW5kIG5vdCBvbiBkYXRlIHNlbGVjdGlvbi9pbnNpZGUgY2xpY2tzLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gdGhlIGRhdGVwaWNrZXIgcG9wdXAgZWxlbWVudC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA5LjEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGVwaWNrZXJDbGFzczogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIGEgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZGF5LlxyXG4gICAqXHJcbiAgICogQWxsb3dzIHRvIGNvbXBsZXRlbHkgb3ZlcnJpZGUgdGhlIHdheSBhIGRheSAnY2VsbCcgaW4gdGhlIGNhbGVuZGFyIGlzIGRpc3BsYXllZC5cclxuICAgKlxyXG4gICAqIFNlZSBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpIGZvciB0aGUgZGF0YSB5b3UgZ2V0IGluc2lkZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNhbGxiYWNrIHRvIHBhc3MgYW55IGFyYml0cmFyeSBkYXRhIHRvIHRoZSB0ZW1wbGF0ZSBjZWxsIHZpYSB0aGVcclxuICAgKiBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpJ3MgYGRhdGFgIHBhcmFtZXRlci5cclxuICAgKlxyXG4gICAqIGBjdXJyZW50YCBpcyB0aGUgbW9udGggdGhhdCBpcyBjdXJyZW50bHkgZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMy4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudD86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2YgbW9udGhzIHRvIGRpc3BsYXkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzcGxheU1vbnRoczogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAqXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1bi5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXRlcGlja2VyIGZvb3Rlci5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjMuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY2FsbGJhY2sgdG8gbWFyayBzb21lIGRhdGVzIGFzIGRpc2FibGVkLlxyXG4gICAqXHJcbiAgICogSXQgaXMgY2FsbGVkIGZvciBlYWNoIG5ldyBkYXRlIHdoZW4gbmF2aWdhdGluZyB0byBhIGRpZmZlcmVudCBtb250aC5cclxuICAgKlxyXG4gICAqIGBjdXJyZW50YCBpcyB0aGUgbW9udGggdGhhdCBpcyBjdXJyZW50bHkgZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ/OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGVhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIG9yIHNlbGVjdGVkLiBBbHNvIHVzZWQgZm9yIGZvcm0gdmFsaWRhdGlvbi5cclxuICAgKlxyXG4gICAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGJlZm9yZSB0aGUgY3VycmVudCBtb250aC5cclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbGF0ZXN0IGRhdGUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIG9yIHNlbGVjdGVkLiBBbHNvIHVzZWQgZm9yIGZvcm0gdmFsaWRhdGlvbi5cclxuICAgKlxyXG4gICAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGFmdGVyIHRoZSBjdXJyZW50IG1vbnRoLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRpb24gdHlwZS5cclxuICAgKlxyXG4gICAqICogYFwic2VsZWN0XCJgIC0gc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgbmF2aWdhdGlvbiBhcnJvd3NcclxuICAgKiAqIGBcImFycm93c1wiYCAtIG9ubHkgbmF2aWdhdGlvbiBhcnJvd3NcclxuICAgKiAqIGBcIm5vbmVcImAgLSBubyBuYXZpZ2F0aW9uIHZpc2libGUgYXQgYWxsXHJcbiAgICovXHJcbiAgQElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHdheSBvZiBkaXNwbGF5aW5nIGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgbW9udGguXHJcbiAgICpcclxuICAgKiAqIGBcInZpc2libGVcImAgLSBkYXlzIGFyZSB2aXNpYmxlXHJcbiAgICogKiBgXCJoaWRkZW5cImAgLSBkYXlzIGFyZSBoaWRkZW4sIHdoaXRlIHNwYWNlIHByZXNlcnZlZFxyXG4gICAqICogYFwiY29sbGFwc2VkXCJgIC0gZGF5cyBhcmUgY29sbGFwc2VkLCBzbyB0aGUgZGF0ZXBpY2tlciBoZWlnaHQgbWlnaHQgY2hhbmdlIGJldHdlZW4gbW9udGhzXHJcbiAgICpcclxuICAgKiBGb3IgdGhlIDIrIG1vbnRocyB2aWV3LCBkYXlzIGluIGJldHdlZW4gbW9udGhzIGFyZSBuZXZlciBzaG93bi5cclxuICAgKi9cclxuICBASW5wdXQoKSBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIGRhdGVwaWNrZXIgcG9wdXAsIGFtb25nIHRoZSBbcG9zc2libGUgdmFsdWVzXSgjL2d1aWRlcy9wb3NpdGlvbmluZyNhcGkpLlxyXG4gICAqXHJcbiAgICogVGhlIGRlZmF1bHQgb3JkZXIgb2YgcHJlZmVyZW5jZSBpcyBgXCJib3R0b20tc3RhcnQgYm90dG9tLWVuZCB0b3Atc3RhcnQgdG9wLWVuZFwiYFxyXG4gICAqXHJcbiAgICogUGxlYXNlIHNlZSB0aGUgW3Bvc2l0aW9uaW5nIG92ZXJ2aWV3XSgjL3Bvc2l0aW9uaW5nKSBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgd2hlbiBjbG9zaW5nIGRhdGVwaWNrZXIgd2lsbCBmb2N1cyBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIGRhdGVwaWNrZXIgd2FzIG9wZW5lZC5cclxuICAgKlxyXG4gICAqIEFsdGVybmF0aXZlbHkgeW91IGNvdWxkIHByb3ZpZGUgYSBzZWxlY3RvciBvciBhbiBgSFRNTEVsZW1lbnRgIHRvIGZvY3VzLiBJZiB0aGUgZWxlbWVudCBkb2Vzbid0IGV4aXN0IG9yIGludmFsaWQsXHJcbiAgICogd2UnbGwgZmFsbGJhY2sgdG8gZm9jdXMgZG9jdW1lbnQgYm9keS5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA1LjIuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3RvcmVGb2N1czogdHJ1ZSB8IHN0cmluZyB8IEhUTUxFbGVtZW50O1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHdlZWsgbnVtYmVycyB3aWxsIGJlIGRpc3BsYXllZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXRlIHRvIG9wZW4gY2FsZW5kYXIgd2l0aC5cclxuICAgKlxyXG4gICAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXHJcbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgaXMgcHJvdmlkZWQsIGNhbGVuZGFyIHdpbGwgb3BlbiB3aXRoIGN1cnJlbnQgbW9udGguXHJcbiAgICpcclxuICAgKiBZb3UgY291bGQgdXNlIGBuYXZpZ2F0ZVRvKGRhdGUpYCBtZXRob2QgYXMgYW4gYWx0ZXJuYXRpdmUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9O1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqXHJcbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYFwiYm9keVwiYC5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjc3Mgc2VsZWN0b3Igb3IgaHRtbCBlbGVtZW50IHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIHBvc2l0aW9uZWQgYWdhaW5zdC5cclxuICAgKlxyXG4gICAqIEJ5IGRlZmF1bHQgdGhlIGlucHV0IGlzIHVzZWQgYXMgYSB0YXJnZXQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgNC4yLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBwb3NpdGlvblRhcmdldDogc3RyaW5nIHwgSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3YXkgd2Vla2RheXMgc2hvdWxkIGJlIGRpc3BsYXllZC5cclxuICAgKlxyXG4gICAqICogYHRydWVgIC0gd2Vla2RheXMgYXJlIGRpc3BsYXllZCB1c2luZyBkZWZhdWx0IHdpZHRoXHJcbiAgICogKiBgZmFsc2VgIC0gd2Vla2RheXMgYXJlIG5vdCBkaXNwbGF5ZWRcclxuICAgKiAqIGBUcmFuc2xhdGlvbldpZHRoYCAtIHdlZWtkYXlzIGFyZSBkaXNwbGF5ZWQgdXNpbmcgc3BlY2lmaWVkIHdpZHRoXHJcbiAgICpcclxuICAgKiBAc2luY2UgOS4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSB3ZWVrZGF5czogVHJhbnNsYXRpb25XaWR0aCB8IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBkYXRlIHVzaW5nIGtleWJvYXJkIG9yIG1vdXNlLlxyXG4gICAqXHJcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBgTmdiRGF0ZWAuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjFcclxuICAgKi9cclxuICBAT3V0cHV0KCkgZGF0ZVNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCByaWdodCBhZnRlciB0aGUgbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBkaXNwbGF5ZWQgbW9udGggY2hhbmdlcy5cclxuICAgKlxyXG4gICAqIFNlZSBbYE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50KSBmb3IgdGhlIHBheWxvYWQgaW5mby5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCBhZnRlciBjbG9zaW5nIGRhdGVwaWNrZXIgd2luZG93LlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDQuMi4wXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlID09PSAnJyB8fCAodmFsdWUgJiYgdmFsdWUgIT09ICdmYWxzZScpO1xyXG5cclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYgIS5pbnN0YW5jZS5zZXREaXNhYmxlZFN0YXRlKHRoaXMuX2Rpc2FibGVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XHJcbiAgcHJpdmF0ZSBfdmFsaWRhdG9yQ2hhbmdlID0gKCkgPT4ge307XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfcGFyc2VyRm9ybWF0dGVyOiBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcclxuICAgICAgcHJpdmF0ZSBfdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgICBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHByaXZhdGUgX2RhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LFxyXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgIGNvbmZpZzogTmdiSW5wdXREYXRlcGlja2VyQ29uZmlnKSB7XHJcbiAgICBbJ2F1dG9DbG9zZScsICdjb250YWluZXInLCAncG9zaXRpb25UYXJnZXQnLCAncGxhY2VtZW50J10uZm9yRWFjaChpbnB1dCA9PiB0aGlzW2lucHV0XSA9IGNvbmZpZ1tpbnB1dF0pO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3Bvc2l0aW9uaW5nLnVwZGF0ZSgpKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fdmFsaWRhdG9yQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7IHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XHJcblxyXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcclxuICAgIGNvbnN0IHt2YWx1ZX0gPSBjO1xyXG5cclxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG5nYkRhdGUgPSB0aGlzLl9mcm9tRGF0ZVN0cnVjdCh0aGlzLl9kYXRlQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpKTtcclxuXHJcbiAgICAgIGlmICghbmdiRGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB7J25nYkRhdGUnOiB7aW52YWxpZDogdmFsdWV9fTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiBuZ2JEYXRlLmJlZm9yZShOZ2JEYXRlLmZyb20odGhpcy5taW5EYXRlKSkpIHtcclxuICAgICAgICByZXR1cm4geyduZ2JEYXRlJzoge21pbkRhdGU6IHttaW5EYXRlOiB0aGlzLm1pbkRhdGUsIGFjdHVhbDogdmFsdWV9fX07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgbmdiRGF0ZS5hZnRlcihOZ2JEYXRlLmZyb20odGhpcy5tYXhEYXRlKSkpIHtcclxuICAgICAgICByZXR1cm4geyduZ2JEYXRlJzoge21heERhdGU6IHttYXhEYXRlOiB0aGlzLm1heERhdGUsIGFjdHVhbDogdmFsdWV9fX07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuX21vZGVsID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fZGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XHJcbiAgICB0aGlzLl93cml0ZU1vZGVsVmFsdWUodGhpcy5fbW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgbWFudWFsRGF0ZUNoYW5nZSh2YWx1ZTogc3RyaW5nLCB1cGRhdGVWaWV3ID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGlucHV0VmFsdWVDaGFuZ2VkID0gdmFsdWUgIT09IHRoaXMuX2lucHV0VmFsdWU7XHJcbiAgICBpZiAoaW5wdXRWYWx1ZUNoYW5nZWQpIHtcclxuICAgICAgdGhpcy5faW5wdXRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX3BhcnNlckZvcm1hdHRlci5wYXJzZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlucHV0VmFsdWVDaGFuZ2VkIHx8ICF1cGRhdGVWaWV3KSB7XHJcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuX21vZGVsID8gdGhpcy5fZGF0ZUFkYXB0ZXIudG9Nb2RlbCh0aGlzLl9tb2RlbCkgOiAodmFsdWUgPT09ICcnID8gbnVsbCA6IHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICBpZiAodXBkYXRlVmlldyAmJiB0aGlzLl9tb2RlbCkge1xyXG4gICAgICB0aGlzLl93cml0ZU1vZGVsVmFsdWUodGhpcy5fbW9kZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNPcGVuKCkgeyByZXR1cm4gISF0aGlzLl9jUmVmOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIHJlbGF0ZWQgZm9ybSBjb250cm9sIGNvbnRhaW5zIGEgdmFsaWQgZGF0ZSwgdGhlIGNvcnJlc3BvbmRpbmcgbW9udGggd2lsbCBiZSBvcGVuZWQuXHJcbiAgICovXHJcbiAgb3BlbigpIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLl9jUmVmID0gdGhpcy5fdmNSZWYuY3JlYXRlQ29tcG9uZW50KE5nYkRhdGVwaWNrZXIpO1xyXG5cclxuICAgICAgdGhpcy5fYXBwbHlQb3B1cFN0eWxpbmcodGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgdGhpcy5fYXBwbHlEYXRlcGlja2VySW5wdXRzKHRoaXMuX2NSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpYmVGb3JEYXRlcGlja2VyT3V0cHV0cyh0aGlzLl9jUmVmLmluc3RhbmNlKTtcclxuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5uZ09uSW5pdCgpO1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLndyaXRlVmFsdWUodGhpcy5fZGF0ZUFkYXB0ZXIudG9Nb2RlbCh0aGlzLl9tb2RlbCkpO1xyXG5cclxuICAgICAgLy8gZGF0ZSBzZWxlY3Rpb24gZXZlbnQgaGFuZGxpbmdcclxuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5yZWdpc3Rlck9uQ2hhbmdlKChzZWxlY3RlZERhdGUpID0+IHtcclxuICAgICAgICB0aGlzLndyaXRlVmFsdWUoc2VsZWN0ZWREYXRlKTtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZShzZWxlY3RlZERhdGUpO1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuX2NSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5zZXREaXNhYmxlZFN0YXRlKHRoaXMuZGlzYWJsZWQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBmb2N1cyBoYW5kbGluZ1xyXG4gICAgICB0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIG5nYkZvY3VzVHJhcCh0aGlzLl9uZ1pvbmUsIHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5jbG9zZWQsIHRydWUpO1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLmZvY3VzKCk7XHJcblxyXG4gICAgICBsZXQgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICBpZiAoaXNTdHJpbmcodGhpcy5wb3NpdGlvblRhcmdldCkpIHtcclxuICAgICAgICBob3N0RWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wb3NpdGlvblRhcmdldCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvblRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgaG9zdEVsZW1lbnQgPSB0aGlzLnBvc2l0aW9uVGFyZ2V0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhvc3RFbGVtZW50ID0gdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5fY1JlZikge1xyXG4gICAgICAgICAgdGhpcy5fcG9zaXRpb25pbmcuY3JlYXRlUG9wcGVyKHtcclxuICAgICAgICAgICAgaG9zdEVsZW1lbnQsXHJcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICAgICAgYXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uVGFyZ2V0ICYmICFob3N0RWxlbWVudCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbmdiRGF0ZXBpY2tlciBjb3VsZCBub3QgZmluZCBlbGVtZW50IGRlY2xhcmVkIGluIFtwb3NpdGlvblRhcmdldF0gdG8gcG9zaXRpb24gYWdhaW5zdC4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmdiQXV0b0Nsb3NlKFxyXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5jbG9zZWQsIFtdLFxyXG4gICAgICAgICAgW3RoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxyXG4gICAqL1xyXG4gIGNsb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcclxuICAgICAgdGhpcy5fdmNSZWYucmVtb3ZlKHRoaXMuX3ZjUmVmLmluZGV4T2YodGhpcy5fY1JlZiAhLmhvc3RWaWV3KSk7XHJcbiAgICAgIHRoaXMuX2NSZWYgPSBudWxsO1xyXG4gICAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XHJcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG5cclxuICAgICAgLy8gcmVzdG9yZSBmb2N1c1xyXG4gICAgICBsZXQgZWxlbWVudFRvRm9jdXM6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuX2VsV2l0aEZvY3VzO1xyXG4gICAgICBpZiAoaXNTdHJpbmcodGhpcy5yZXN0b3JlRm9jdXMpKSB7XHJcbiAgICAgICAgZWxlbWVudFRvRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucmVzdG9yZUZvY3VzKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnJlc3RvcmVGb2N1cyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZWxlbWVudFRvRm9jdXMgPSB0aGlzLnJlc3RvcmVGb2N1cyBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaW4gSUUgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gY29udGFpbiBhbiBvYmplY3Qgd2l0aG91dCAnZm9jdXMoKScgc29tZXRpbWVzXHJcbiAgICAgIGlmIChlbGVtZW50VG9Gb2N1cyAmJiBlbGVtZW50VG9Gb2N1c1snZm9jdXMnXSkge1xyXG4gICAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYm9keS5mb2N1cygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9wb3NpdGlvbmluZy5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxyXG4gICAqL1xyXG4gIHRvZ2dsZSgpIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBwcm92aWRlZCBkYXRlLlxyXG4gICAqXHJcbiAgICogV2l0aCB0aGUgZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cclxuICAgKiBJZiBub3RoaW5nIG9yIGludmFsaWQgZGF0ZSBwcm92aWRlZCBjYWxlbmRhciB3aWxsIG9wZW4gY3VycmVudCBtb250aC5cclxuICAgKlxyXG4gICAqIFVzZSB0aGUgYFtzdGFydERhdGVdYCBpbnB1dCBhcyBhbiBhbHRlcm5hdGl2ZS5cclxuICAgKi9cclxuICBuYXZpZ2F0ZVRvKGRhdGU/OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9KSB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLl9jUmVmICEuaW5zdGFuY2UubmF2aWdhdGVUbyhkYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHsgdGhpcy5fb25Ub3VjaGVkKCk7IH1cclxuXHJcbiAgb25Gb2N1cygpIHsgdGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50OyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydtaW5EYXRlJ10gfHwgY2hhbmdlc1snbWF4RGF0ZSddKSB7XHJcbiAgICAgIHRoaXMuX3ZhbGlkYXRvckNoYW5nZSgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1snbWluRGF0ZSddKSB7XHJcbiAgICAgICAgICB0aGlzLl9jUmVmICEuaW5zdGFuY2UubWluRGF0ZSA9IHRoaXMubWluRGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ21heERhdGUnXSkge1xyXG4gICAgICAgICAgdGhpcy5fY1JlZiAhLmluc3RhbmNlLm1heERhdGUgPSB0aGlzLm1heERhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NSZWYgIS5pbnN0YW5jZS5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydkYXRlcGlja2VyQ2xhc3MnXSkge1xyXG4gICAgICBjb25zdCB7Y3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlfSA9IGNoYW5nZXNbJ2RhdGVwaWNrZXJDbGFzcyddO1xyXG4gICAgICB0aGlzLl9hcHBseVBvcHVwQ2xhc3MoY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXBwbHlEYXRlcGlja2VySW5wdXRzKGRhdGVwaWNrZXJJbnN0YW5jZTogTmdiRGF0ZXBpY2tlcik6IHZvaWQge1xyXG4gICAgWydkYXlUZW1wbGF0ZScsICdkYXlUZW1wbGF0ZURhdGEnLCAnZGlzcGxheU1vbnRocycsICdmaXJzdERheU9mV2VlaycsICdmb290ZXJUZW1wbGF0ZScsICdtYXJrRGlzYWJsZWQnLCAnbWluRGF0ZScsXHJcbiAgICAgJ21heERhdGUnLCAnbmF2aWdhdGlvbicsICdvdXRzaWRlRGF5cycsICdzaG93TmF2aWdhdGlvbicsICdzaG93V2Vla051bWJlcnMnLCAnd2Vla2RheXMnXVxyXG4gICAgICAgIC5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzW29wdGlvbk5hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGF0ZXBpY2tlckluc3RhbmNlW29wdGlvbk5hbWVdID0gdGhpc1tvcHRpb25OYW1lXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGRhdGVwaWNrZXJJbnN0YW5jZS5zdGFydERhdGUgPSB0aGlzLnN0YXJ0RGF0ZSB8fCB0aGlzLl9tb2RlbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FwcGx5UG9wdXBDbGFzcyhuZXdDbGFzczogc3RyaW5nLCBvbGRDbGFzcz86IHN0cmluZykge1xyXG4gICAgY29uc3QgcG9wdXBFbCA9IHRoaXMuX2NSZWYgPy5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgaWYgKHBvcHVwRWwpIHtcclxuICAgICAgaWYgKG5ld0NsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MocG9wdXBFbCwgbmV3Q2xhc3MpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvbGRDbGFzcykge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHBvcHVwRWwsIG9sZENsYXNzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXBwbHlQb3B1cFN0eWxpbmcobmF0aXZlRWxlbWVudDogYW55KSB7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnZHJvcGRvd24tbWVudScpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxlbWVudCwgJ3Nob3cnKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnbmdiLWRwLWJvZHknKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9hcHBseVBvcHVwQ2xhc3ModGhpcy5kYXRlcGlja2VyQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKSB7XHJcbiAgICBkYXRlcGlja2VySW5zdGFuY2UubmF2aWdhdGUuc3Vic2NyaWJlKG5hdmlnYXRlRXZlbnQgPT4gdGhpcy5uYXZpZ2F0ZS5lbWl0KG5hdmlnYXRlRXZlbnQpKTtcclxuICAgIGRhdGVwaWNrZXJJbnN0YW5jZS5kYXRlU2VsZWN0LnN1YnNjcmliZShkYXRlID0+IHtcclxuICAgICAgdGhpcy5kYXRlU2VsZWN0LmVtaXQoZGF0ZSk7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfd3JpdGVNb2RlbFZhbHVlKG1vZGVsOiBOZ2JEYXRlIHwgbnVsbCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl9wYXJzZXJGb3JtYXR0ZXIuZm9ybWF0KG1vZGVsKTtcclxuICAgIHRoaXMuX2lucHV0VmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYgIS5pbnN0YW5jZS53cml0ZVZhbHVlKHRoaXMuX2RhdGVBZGFwdGVyLnRvTW9kZWwobW9kZWwpKTtcclxuICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9mcm9tRGF0ZVN0cnVjdChkYXRlOiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IE5nYkRhdGUgfCBudWxsIHtcclxuICAgIGNvbnN0IG5nYkRhdGUgPSBkYXRlID8gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSkgOiBudWxsO1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmlzVmFsaWQobmdiRGF0ZSkgPyBuZ2JEYXRlIDogbnVsbDtcclxuICB9XHJcbn1cclxuIl19
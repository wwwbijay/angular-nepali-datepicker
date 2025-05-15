import { Directive, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, of, Subject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { PopupService } from '../util/popup';
import { ngbPositioning } from '../util/positioning';
import { isDefined, toString } from '../util/util';
import { NgbTypeaheadWindow } from './typeahead-window';
import * as i0 from "@angular/core";
import * as i1 from "./typeahead-config";
import * as i2 from "../util/accessibility/live";
let nextWindowId = 0;
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
export class NgbTypeahead {
    constructor(_elementRef, viewContainerRef, _renderer, injector, config, ngZone, _live, _document, _ngZone, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._live = _live;
        this._document = _document;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this._subscription = null;
        this._closed$ = new Subject();
        this._inputValueBackup = null;
        this._windowRef = null;
        this._positioning = ngbPositioning();
        /**
         * The value for the `autocomplete` attribute for the `<input>` element.
         *
         * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
         *
         * @since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * The preferred placement of the typeahead, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = 'bottom-start';
        /**
         * An event emitted right before an item is selected from the result list.
         *
         * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
         */
        this.selectItem = new EventEmitter();
        this.activeDescendant = null;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map($event => $event.target.value));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
        this._zoneSubscription = ngZone.onStable.subscribe(() => { this._positioning.update(); });
    }
    ngOnInit() { this._subscribeToUserInput(); }
    ngOnChanges({ ngbTypeahead }) {
        if (ngbTypeahead && !ngbTypeahead.firstChange) {
            this._unsubscribeFromUserInput();
            this._subscribeToUserInput();
        }
    }
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    }
    registerOnChange(fn) { this._onChange = fn; }
    registerOnTouched(fn) { this._onTouched = fn; }
    writeValue(value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    }
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * Dismisses typeahead popup window
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen() { return this._windowRef != null; }
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    handleKeyDown(event) {
        if (!this.isPopupOpen()) {
            return;
        }
        /* eslint-disable-next-line deprecation/deprecation */
        switch (event.which) {
            case Key.ArrowDown:
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case Key.ArrowUp:
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case Key.Enter:
            case Key.Tab: {
                const result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
            }
        }
    }
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            const { windowRef } = this._popupService.open();
            this._windowRef = windowRef;
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => this.activeDescendant = activeId);
            this._windowRef.instance.popupClass = this.popupClass;
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            // Schedule positioning on stable, to avoid several positioning updates.
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                if (this._windowRef) {
                    this._positioning.createPopper({
                        hostElement: this._elementRef.nativeElement,
                        targetElement: this._windowRef.location.nativeElement,
                        placement: this.placement,
                        appendToBody: this.container === 'body',
                    });
                }
            });
            ngbAutoClose(this._ngZone, this._document, 'outside', () => this.dismissPopup(), this._closed$, [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
        }
    }
    _closePopup() {
        this._popupService.close().subscribe(() => {
            this._positioning.destroy();
            this._closed$.next();
            this._windowRef = null;
            this.activeDescendant = null;
        });
    }
    _selectResult(result) {
        let defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: () => { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    _showHint() {
        if (this.showHint && this._windowRef?.instance.hasActive() && this._inputValueBackup != null) {
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    }
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    _subscribeToUserInput() {
        const results$ = this._valueChanges.pipe(tap(value => {
            this._inputValueBackup = this.showHint ? value : null;
            this._onChange(this.editable ? value : undefined);
        }), this.ngbTypeahead ? this.ngbTypeahead : () => of([]));
        this._subscription = this._resubscribeTypeahead.pipe(switchMap(() => results$)).subscribe(results => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                this._openPopup();
                this._windowRef.instance.focusFirst = this.focusFirst;
                this._windowRef.instance.results = results;
                this._windowRef.instance.term = this._elementRef.nativeElement.value;
                if (this.resultFormatter) {
                    this._windowRef.instance.formatter = this.resultFormatter;
                }
                if (this.resultTemplate) {
                    this._windowRef.instance.resultTemplate = this.resultTemplate;
                }
                this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                this._windowRef.changeDetectorRef.detectChanges();
                this._showHint();
            }
            // live announcer
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
}
NgbTypeahead.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTypeahead, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i1.NgbTypeaheadConfig }, { token: i0.NgZone }, { token: i2.Live }, { token: DOCUMENT }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbTypeahead.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbTypeahead, selector: "input[ngbTypeahead]", inputs: { autocomplete: "autocomplete", container: "container", editable: "editable", focusFirst: "focusFirst", inputFormatter: "inputFormatter", ngbTypeahead: "ngbTypeahead", resultFormatter: "resultFormatter", resultTemplate: "resultTemplate", showHint: "showHint", placement: "placement", popupClass: "popupClass" }, outputs: { selectItem: "selectItem" }, host: { attributes: { "autocapitalize": "off", "autocorrect": "off", "role": "combobox", "aria-multiline": "false" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)" }, properties: { "class.open": "isPopupOpen()", "autocomplete": "autocomplete", "attr.aria-autocomplete": "showHint ? \"both\" : \"list\"", "attr.aria-activedescendant": "activeDescendant", "attr.aria-owns": "isPopupOpen() ? popupId : null", "attr.aria-expanded": "isPopupOpen()" } }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }], exportAs: ["ngbTypeahead"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTypeahead, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        'autocapitalize': 'off',
                        'autocorrect': 'off',
                        'role': 'combobox',
                        'aria-multiline': 'false',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()'
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i1.NgbTypeaheadConfig }, { type: i0.NgZone }, { type: i2.Live }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { autocomplete: [{
                type: Input
            }], container: [{
                type: Input
            }], editable: [{
                type: Input
            }], focusFirst: [{
                type: Input
            }], inputFormatter: [{
                type: Input
            }], ngbTypeahead: [{
                type: Input
            }], resultFormatter: [{
                type: Input
            }], resultTemplate: [{
                type: Input
            }], showHint: [{
                type: Input
            }], placement: [{
                type: Input
            }], popupClass: [{
                type: Input
            }], selectItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFFTixLQUFLLEVBSUwsTUFBTSxFQU9QLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQWMsRUFBRSxFQUFvQixPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDekcsT0FBTyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFpQixjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUdqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFpQjdFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7R0FFRztBQW9CSCxNQUFNLE9BQU8sWUFBWTtJQW1IdkIsWUFDWSxXQUF5QyxFQUFFLGdCQUFrQyxFQUM3RSxTQUFvQixFQUFFLFFBQWtCLEVBQUUsTUFBMEIsRUFBRSxNQUFjLEVBQVUsS0FBVyxFQUN2RixTQUFjLEVBQVUsT0FBZSxFQUFVLGVBQWtD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QkFBbEIsS0FBSztnQkFRRyxjQUFjO3NCQUF0QixLQUFLO2dCQWFHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBU0csZUFBZTtzQkFBdkIsS0FBSztnQkFTRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBU0csU0FBUztzQkFBakIsS0FBSztnQkFXRyxVQUFVO3NCQUFsQixLQUFLO2dCQU9JLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0b3IsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBmcm9tRXZlbnQsIE9ic2VydmFibGUsIG9mLCBPcGVyYXRvckZ1bmN0aW9uLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7TGl2ZX0gZnJvbSAnLi4vdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUnO1xyXG5pbXBvcnQge25nYkF1dG9DbG9zZX0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcbmltcG9ydCB7UGxhY2VtZW50QXJyYXksIG5nYlBvc2l0aW9uaW5nfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHtpc0RlZmluZWQsIHRvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkV2luZG93LCBSZXN1bHRUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XHJcblxyXG4vKipcclxuICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgYW4gaXRlbSBpcyBzZWxlY3RlZCBmcm9tIHRoZSByZXN1bHQgbGlzdC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50PFQgPSBhbnk+IHtcclxuICAvKipcclxuICAgKiBUaGUgaXRlbSBmcm9tIHRoZSByZXN1bHQgbGlzdCBhYm91dCB0byBiZSBzZWxlY3RlZC5cclxuICAgKi9cclxuICBpdGVtOiBUO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBwcmV2ZW50IGl0ZW0gc2VsZWN0aW9uIGZyb20gaGFwcGVuaW5nLlxyXG4gICAqL1xyXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5sZXQgbmV4dFdpbmRvd0lkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSBwcm92aWRpbmcgYSBzaW1wbGUgd2F5IG9mIGNyZWF0aW5nIHBvd2VyZnVsIHR5cGVhaGVhZHMgZnJvbSBhbnkgdGV4dCBpbnB1dC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmdiVHlwZWFoZWFkXScsXHJcbiAgZXhwb3J0QXM6ICduZ2JUeXBlYWhlYWQnLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcclxuICAgICdbY2xhc3Mub3Blbl0nOiAnaXNQb3B1cE9wZW4oKScsXHJcbiAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleURvd24oJGV2ZW50KScsXHJcbiAgICAnW2F1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlJyxcclxuICAgICdhdXRvY2FwaXRhbGl6ZSc6ICdvZmYnLFxyXG4gICAgJ2F1dG9jb3JyZWN0JzogJ29mZicsXHJcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXHJcbiAgICAnYXJpYS1tdWx0aWxpbmUnOiAnZmFsc2UnLFxyXG4gICAgJ1thdHRyLmFyaWEtYXV0b2NvbXBsZXRlXSc6ICdzaG93SGludCA/IFwiYm90aFwiIDogXCJsaXN0XCInLFxyXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXHJcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdpc1BvcHVwT3BlbigpID8gcG9wdXBJZCA6IG51bGwnLFxyXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzUG9wdXBPcGVuKCknXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlR5cGVhaGVhZCksIG11bHRpOiB0cnVlfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gICAgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiVHlwZWFoZWFkV2luZG93PjtcclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIHByaXZhdGUgX2lucHV0VmFsdWVCYWNrdXA6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gIHByaXZhdGUgX3Jlc3Vic2NyaWJlVHlwZWFoZWFkOiBCZWhhdmlvclN1YmplY3Q8YW55PjtcclxuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUeXBlYWhlYWRXaW5kb3c+fCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfcG9zaXRpb25pbmcgPSBuZ2JQb3NpdGlvbmluZygpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmFsdWUgZm9yIHRoZSBgYXV0b2NvbXBsZXRlYCBhdHRyaWJ1dGUgZm9yIHRoZSBgPGlucHV0PmAgZWxlbWVudC5cclxuICAgKlxyXG4gICAqIERlZmF1bHRzIHRvIGBcIm9mZlwiYCB0byBkaXNhYmxlIHRoZSBuYXRpdmUgYnJvd3NlciBhdXRvY29tcGxldGUsIGJ1dCB5b3UgY2FuIG92ZXJyaWRlIGl0IGlmIG5lY2Vzc2FyeS5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9jb21wbGV0ZSA9ICdvZmYnO1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aWxsIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqXHJcbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYFwiYm9keVwiYC5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCBtb2RlbCB2YWx1ZXMgd2lsbCBub3QgYmUgcmVzdHJpY3RlZCBvbmx5IHRvIGl0ZW1zIHNlbGVjdGVkIGZyb20gdGhlIHBvcHVwLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBmaXJzdCBpdGVtIGluIHRoZSByZXN1bHQgbGlzdCB3aWxsIGFsd2F5cyBzdGF5IGZvY3VzZWQgd2hpbGUgdHlwaW5nLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvY3VzRmlyc3Q6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGFuIGl0ZW0gZnJvbSB0aGUgcmVzdWx0IGxpc3QgdG8gYSBgc3RyaW5nYCB0byBkaXNwbGF5IGluIHRoZSBgPGlucHV0PmAgZmllbGQuXHJcbiAgICpcclxuICAgKiBJdCBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIHNvbWV0aGluZyBpbiB0aGUgcG9wdXAgb3IgdGhlIG1vZGVsIHZhbHVlIGNoYW5nZXMsIHNvIHRoZSBpbnB1dCBuZWVkcyB0b1xyXG4gICAqIGJlIHVwZGF0ZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaW5wdXRGb3JtYXR0ZXI6IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgYSBzdHJlYW0gb2YgdGV4dCB2YWx1ZXMgZnJvbSB0aGUgYDxpbnB1dD5gIGVsZW1lbnQgdG8gdGhlIHN0cmVhbSBvZiB0aGUgYXJyYXkgb2YgaXRlbXNcclxuICAgKiB0byBkaXNwbGF5IGluIHRoZSB0eXBlYWhlYWQgcG9wdXAuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgcmVzdWx0aW5nIG9ic2VydmFibGUgZW1pdHMgYSBub24tZW1wdHkgYXJyYXkgLSB0aGUgcG9wdXAgd2lsbCBiZSBzaG93bi4gSWYgaXQgZW1pdHMgYW4gZW1wdHkgYXJyYXkgLSB0aGVcclxuICAgKiBwb3B1cCB3aWxsIGJlIGNsb3NlZC5cclxuICAgKlxyXG4gICAqIFNlZSB0aGUgW2Jhc2ljIGV4YW1wbGVdKCMvY29tcG9uZW50cy90eXBlYWhlYWQvZXhhbXBsZXMjYmFzaWMpIGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICpcclxuICAgKiBOb3RlIHRoYXQgdGhlIGB0aGlzYCBhcmd1bWVudCBpcyBgdW5kZWZpbmVkYCBzbyB5b3UgbmVlZCB0byBleHBsaWNpdGx5IGJpbmQgaXQgdG8gYSBkZXNpcmVkIFwidGhpc1wiIHRhcmdldC5cclxuICAgKi9cclxuICBASW5wdXQoKSBuZ2JUeXBlYWhlYWQ6IE9wZXJhdG9yRnVuY3Rpb248c3RyaW5nLCByZWFkb25seSBhbnlbXT58IG51bGwgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGFuIGl0ZW0gZnJvbSB0aGUgcmVzdWx0IGxpc3QgdG8gYSBgc3RyaW5nYCB0byBkaXNwbGF5IGluIHRoZSBwb3B1cC5cclxuICAgKlxyXG4gICAqIE11c3QgYmUgcHJvdmlkZWQsIGlmIHlvdXIgYG5nYlR5cGVhaGVhZGAgcmV0dXJucyBzb21ldGhpbmcgb3RoZXIgdGhhbiBgT2JzZXJ2YWJsZTxzdHJpbmdbXT5gLlxyXG4gICAqXHJcbiAgICogQWx0ZXJuYXRpdmVseSBmb3IgbW9yZSBjb21wbGV4IG1hcmt1cCBpbiB0aGUgcG9wdXAgeW91IHNob3VsZCB1c2UgYHJlc3VsdFRlbXBsYXRlYC5cclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHRGb3JtYXR0ZXI6IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRlbXBsYXRlIHRvIG92ZXJyaWRlIHRoZSB3YXkgcmVzdWx0aW5nIGl0ZW1zIGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHBvcHVwLlxyXG4gICAqXHJcbiAgICogU2VlIHRoZSBbUmVzdWx0VGVtcGxhdGVDb250ZXh0XSgjL2NvbXBvbmVudHMvdHlwZWFoZWFkL2FwaSNSZXN1bHRUZW1wbGF0ZUNvbnRleHQpIGZvciB0aGUgdGVtcGxhdGUgY29udGV4dC5cclxuICAgKlxyXG4gICAqIEFsc28gc2VlIHRoZSBbdGVtcGxhdGUgZm9yIHJlc3VsdHMgZGVtb10oIy9jb21wb25lbnRzL3R5cGVhaGVhZC9leGFtcGxlcyN0ZW1wbGF0ZSkgZm9yIG1vcmUgZGV0YWlscy5cclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8UmVzdWx0VGVtcGxhdGVDb250ZXh0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCB3aWxsIHNob3cgdGhlIGhpbnQgaW4gdGhlIGA8aW5wdXQ+YCB3aGVuIGFuIGl0ZW0gaW4gdGhlIHJlc3VsdCBsaXN0IG1hdGNoZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd0hpbnQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSB0eXBlYWhlYWQsIGFtb25nIHRoZSBbcG9zc2libGUgdmFsdWVzXSgjL2d1aWRlcy9wb3NpdGlvbmluZyNhcGkpLlxyXG4gICAqXHJcbiAgICogVGhlIGRlZmF1bHQgb3JkZXIgb2YgcHJlZmVyZW5jZSBpcyBgXCJib3R0b20tc3RhcnQgYm90dG9tLWVuZCB0b3Atc3RhcnQgdG9wLWVuZFwiYFxyXG4gICAqXHJcbiAgICogUGxlYXNlIHNlZSB0aGUgW3Bvc2l0aW9uaW5nIG92ZXJ2aWV3XSgjL3Bvc2l0aW9uaW5nKSBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLXN0YXJ0JztcclxuXHJcbiAgLyoqXHJcbiAgKiBBIGN1c3RvbSBjbGFzcyB0byBhcHBlbmQgdG8gdGhlIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3dcclxuICAqXHJcbiAgKiBBY2NlcHRzIGEgc3RyaW5nIGNvbnRhaW5pbmcgQ1NTIGNsYXNzIHRvIGJlIGFwcGxpZWQgb24gdGhlIGBuZ2ItdHlwZWFoZWFkLXdpbmRvd2AuXHJcbiAgKlxyXG4gICogVGhpcyBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGluc3RhbmNlLXNwZWNpZmljIHN0eWxpbmcsIGV4LiB5b3UgY2FuIG92ZXJyaWRlIHBvcHVwIHdpbmRvdyBgei1pbmRleGBcclxuICAqXHJcbiAgKiBAc2luY2UgOS4xLjBcclxuICAqL1xyXG4gIEBJbnB1dCgpIHBvcHVwQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgYW4gaXRlbSBpcyBzZWxlY3RlZCBmcm9tIHRoZSByZXN1bHQgbGlzdC5cclxuICAgKlxyXG4gICAqIEV2ZW50IHBheWxvYWQgaXMgb2YgdHlwZSBbYE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudGBdKCMvY29tcG9uZW50cy90eXBlYWhlYWQvYXBpI05nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCkuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudD4oKTtcclxuXHJcbiAgYWN0aXZlRGVzY2VuZGFudDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgcG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcclxuXHJcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvciwgY29uZmlnOiBOZ2JUeXBlYWhlYWRDb25maWcsIG5nWm9uZTogTmdab25lLCBwcml2YXRlIF9saXZlOiBMaXZlLFxyXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcclxuICAgIHRoaXMuZWRpdGFibGUgPSBjb25maWcuZWRpdGFibGU7XHJcbiAgICB0aGlzLmZvY3VzRmlyc3QgPSBjb25maWcuZm9jdXNGaXJzdDtcclxuICAgIHRoaXMuc2hvd0hpbnQgPSBjb25maWcuc2hvd0hpbnQ7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VzID0gZnJvbUV2ZW50PEV2ZW50PihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgkZXZlbnQgPT4gKCRldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKTtcclxuXHJcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcblxyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxyXG4gICAgICAgIE5nYlR5cGVhaGVhZFdpbmRvdywgaW5qZWN0b3IsIHZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgdGhpcy5fbmdab25lLCBhcHBsaWNhdGlvblJlZik7XHJcblxyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLl9wb3NpdGlvbmluZy51cGRhdGUoKTsgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHsgdGhpcy5fc3Vic2NyaWJlVG9Vc2VySW5wdXQoKTsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyh7bmdiVHlwZWFoZWFkfTogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKG5nYlR5cGVhaGVhZCAmJiAhbmdiVHlwZWFoZWFkLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpYmVUb1VzZXJJbnB1dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICB0aGlzLl91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQodmFsdWUpKTtcclxuICAgIGlmICh0aGlzLnNob3dIaW50KSB7XHJcbiAgICAgIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc21pc3NlcyB0eXBlYWhlYWQgcG9wdXAgd2luZG93XHJcbiAgICovXHJcbiAgZGlzbWlzc1BvcHVwKCkge1xyXG4gICAgaWYgKHRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xyXG4gICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICAgIGlmICh0aGlzLnNob3dIaW50ICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3cgaXMgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgaXNQb3B1cE9wZW4oKSB7IHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDsgfVxyXG5cclxuICBoYW5kbGVCbHVyKCkge1xyXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcclxuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmlzUG9wdXBPcGVuKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvbiAqL1xyXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLnByZXYoKTtcclxuICAgICAgICB0aGlzLl9zaG93SGludCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEtleS5FbnRlcjpcclxuICAgICAgY2FzZSBLZXkuVGFiOiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UuZ2V0QWN0aXZlKCk7XHJcbiAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQpKSB7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9vcGVuUG9wdXAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICBjb25zdCB7d2luZG93UmVmfSA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHdpbmRvd1JlZjtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5wb3B1cElkO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2Uuc2VsZWN0RXZlbnQuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4gdGhpcy5fc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQpKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmFjdGl2ZUNoYW5nZUV2ZW50LnN1YnNjcmliZSgoYWN0aXZlSWQ6IHN0cmluZykgPT4gdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gYWN0aXZlSWQpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucG9wdXBDbGFzcyA9IHRoaXMucG9wdXBDbGFzcztcclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XHJcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuXHJcbiAgICAgIC8vIFNjaGVkdWxlIHBvc2l0aW9uaW5nIG9uIHN0YWJsZSwgdG8gYXZvaWQgc2V2ZXJhbCBwb3NpdGlvbmluZyB1cGRhdGVzLlxyXG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uaW5nLmNyZWF0ZVBvcHBlcih7XHJcbiAgICAgICAgICAgIGhvc3RFbGVtZW50OiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICBhcHBlbmRUb0JvZHk6IHRoaXMuY29udGFpbmVyID09PSAnYm9keScsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmdiQXV0b0Nsb3NlKFxyXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgJ291dHNpZGUnLCAoKSA9PiB0aGlzLmRpc21pc3NQb3B1cCgpLCB0aGlzLl9jbG9zZWQkLFxyXG4gICAgICAgICAgW3RoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Nsb3NlUG9wdXAoKSB7XHJcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbmluZy5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBudWxsO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHQocmVzdWx0OiBhbnkpIHtcclxuICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdEl0ZW0uZW1pdCh7aXRlbTogcmVzdWx0LCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xyXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcclxuXHJcbiAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgdGhpcy53cml0ZVZhbHVlKHJlc3VsdCk7XHJcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XHJcbiAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcclxuICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3dIaW50KCkge1xyXG4gICAgaWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmPy5pbnN0YW5jZS5oYXNBY3RpdmUoKSAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9IG51bGwpIHtcclxuICAgICAgY29uc3QgdXNlcklucHV0TG93ZXJDYXNlID0gdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBmb3JtYXR0ZWRWYWwgPSB0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQodGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpKTtcclxuXHJcbiAgICAgIGlmICh1c2VySW5wdXRMb3dlckNhc2UgPT09IGZvcm1hdHRlZFZhbC5zdWJzdHIoMCwgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCArIGZvcm1hdHRlZFZhbC5zdWJzdHIodGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpKTtcclxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbJ3NldFNlbGVjdGlvblJhbmdlJ10uYXBwbHkoXHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgW3RoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoLCBmb3JtYXR0ZWRWYWwubGVuZ3RoXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKGZvcm1hdHRlZFZhbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Zvcm1hdEl0ZW1Gb3JJbnB1dChpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGl0ZW0gIT0gbnVsbCAmJiB0aGlzLmlucHV0Rm9ybWF0dGVyID8gdGhpcy5pbnB1dEZvcm1hdHRlcihpdGVtKSA6IHRvU3RyaW5nKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfd3JpdGVJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdG9TdHJpbmcodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVXNlcklucHV0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVzdWx0cyQgPSB0aGlzLl92YWx1ZUNoYW5nZXMucGlwZShcclxuICAgICAgICB0YXAodmFsdWUgPT4ge1xyXG4gICAgICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuc2hvd0hpbnQgPyB2YWx1ZSA6IG51bGw7XHJcbiAgICAgICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLmVkaXRhYmxlID8gdmFsdWUgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRoaXMubmdiVHlwZWFoZWFkID8gdGhpcy5uZ2JUeXBlYWhlYWQgOiAoKSA9PiBvZihbXSkpO1xyXG5cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLnBpcGUoc3dpdGNoTWFwKCgpID0+IHJlc3VsdHMkKSkuc3Vic2NyaWJlKHJlc3VsdHMgPT4ge1xyXG4gICAgICBpZiAoIXJlc3VsdHMgfHwgcmVzdWx0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fb3BlblBvcHVwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLmZvY3VzRmlyc3QgPSB0aGlzLmZvY3VzRmlyc3Q7XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UucmVzdWx0cyA9IHJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UudGVybSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5yZXN1bHRGb3JtYXR0ZXIpIHtcclxuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLmZvcm1hdHRlciA9IHRoaXMucmVzdWx0Rm9ybWF0dGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yZXN1bHRUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UucmVzdWx0VGVtcGxhdGUgPSB0aGlzLnJlc3VsdFRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5yZXNldEFjdGl2ZSgpO1xyXG5cclxuICAgICAgICAvLyBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0gd2UgYXJlIHN1YnNjcmliaW5nIHRvIG1pZ2h0IGhhdmUgYXN5bmMgc3RlcHNcclxuICAgICAgICAvLyBhbmQgaWYgYSBjb21wb25lbnQgY29udGFpbmluZyB0eXBlYWhlYWQgaXMgdXNpbmcgdGhlIE9uUHVzaCBzdHJhdGVneVxyXG4gICAgICAgIC8vIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHR1cm4gd291bGRuJ3QgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5LlxyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbGl2ZSBhbm5vdW5jZXJcclxuICAgICAgY29uc3QgY291bnQgPSByZXN1bHRzID8gcmVzdWx0cy5sZW5ndGggOiAwO1xyXG4gICAgICB0aGlzLl9saXZlLnNheShjb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGF2YWlsYWJsZScgOiBgJHtjb3VudH0gcmVzdWx0JHtjb3VudCA9PT0gMSA/ICcnIDogJ3MnfSBhdmFpbGFibGVgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCkge1xyXG4gICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==
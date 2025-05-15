import { Attribute, Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { take } from 'rxjs/operators';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbToastFadeInTransition, ngbToastFadeOutTransition } from './toast-transition';
import * as i0 from "@angular/core";
import * as i1 from "./toast-config";
import * as i2 from "@angular/common";
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
export class NgbToastHeader {
}
NgbToastHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbToastHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NgbToastHeader.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbToastHeader, selector: "[ngbToastHeader]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbToastHeader, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbToastHeader]' }]
        }] });
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
export class NgbToast {
    constructor(ariaLive, config, _zone, _element) {
        this.ariaLive = ariaLive;
        this._zone = _zone;
        this._element = _element;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired after the animation triggered by calling `.show()` method has finished.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event fired after the animation triggered by calling `.hide()` method has finished.
         *
         * It can only occur in 2 different scenarios:
         * - `autohide` timeout fires
         * - user clicks on a closing cross
         *
         * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
         * to the user to take care of that.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        if (this.ariaLive == null) {
            this.ariaLive = config.ariaLive;
        }
        this.delay = config.delay;
        this.autohide = config.autohide;
        this.animation = config.animation;
    }
    ngAfterContentInit() {
        this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            this._init();
            this.show();
        });
    }
    ngOnChanges(changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    }
    /**
     * Triggers toast closing programmatically.
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(hidden)` output
     *
     * @since 8.0.0
     */
    hide() {
        this._clearTimeout();
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeOutTransition, { animation: this.animation, runningTransition: 'stop' });
        transition.subscribe(() => { this.hidden.emit(); });
        return transition;
    }
    /**
     * Triggers toast opening programmatically.
     *
     * The returned observable will emit and be completed once the opening transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(shown)` output
     *
     * @since 8.0.0
     */
    show() {
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeInTransition, {
            animation: this.animation,
            runningTransition: 'continue',
        });
        transition.subscribe(() => { this.shown.emit(); });
        return transition;
    }
    _init() {
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout(() => this.hide(), this.delay);
        }
    }
    _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
}
NgbToast.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbToast, deps: [{ token: 'aria-live', attribute: true }, { token: i1.NgbToastConfig }, { token: i0.NgZone }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NgbToast.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbToast, selector: "ngb-toast", inputs: { animation: "animation", delay: "delay", autohide: "autohide", header: "header" }, outputs: { shown: "shown", hidden: "hidden" }, host: { attributes: { "role": "alert", "aria-atomic": "true" }, properties: { "attr.aria-live": "ariaLive", "class.fade": "animation" }, classAttribute: "toast" }, queries: [{ propertyName: "contentHeaderTpl", first: true, predicate: NgbToastHeader, descendants: true, read: TemplateRef, static: true }], exportAs: ["ngbToast"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #headerTpl>
      <strong class="me-auto">{{header}}</strong>
    </ng-template>
    <ng-template [ngIf]="contentHeaderTpl || header">
      <div class="toast-header">
        <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
        <button type="button" class="btn-close" aria-label="Close" i18n-aria-label="@@ngb.toast.close-aria" (click)="hide()">
        </button>
      </div>
    </ng-template>
    <div class="toast-body">
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbToast, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-toast', exportAs: 'ngbToast', encapsulation: ViewEncapsulation.None, host: {
                        'role': 'alert',
                        '[attr.aria-live]': 'ariaLive',
                        'aria-atomic': 'true',
                        'class': 'toast',
                        '[class.fade]': 'animation',
                    }, template: `
    <ng-template #headerTpl>
      <strong class="me-auto">{{header}}</strong>
    </ng-template>
    <ng-template [ngIf]="contentHeaderTpl || header">
      <div class="toast-header">
        <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
        <button type="button" class="btn-close" aria-label="Close" i18n-aria-label="@@ngb.toast.close-aria" (click)="hide()">
        </button>
      </div>
    </ng-template>
    <div class="toast-body">
      <ng-content></ng-content>
    </div>
  `, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['aria-live']
                }] }, { type: i1.NgbToastConfig }, { type: i0.NgZone }, { type: i0.ElementRef }]; }, propDecorators: { animation: [{
                type: Input
            }], delay: [{
                type: Input
            }], autohide: [{
                type: Input
            }], header: [{
                type: Input
            }], contentHeaderTpl: [{
                type: ContentChild,
                args: [NgbToastHeader, { read: TemplateRef, static: true }]
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdG9hc3QvdG9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFTixXQUFXLEVBQ1gsaUJBQWlCLEdBR2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUd2Rjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOytGQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBQzs7QUFJekM7Ozs7O0dBS0c7QUE2QkgsTUFBTSxPQUFPLFFBQVE7SUEwRG5CLFlBQ21DLFFBQWdCLEVBQUUsTUFBc0IsRUFBVSxLQUFhLEVBQ3RGLFFBQW9CO1FBREcsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFrQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ3RGLGFBQVEsR0FBUixRQUFRLENBQVk7UUE3QmhDOzs7V0FHRztRQUM4RCxxQkFBZ0IsR0FBMkIsSUFBSSxDQUFDO1FBRWpIOzs7O1dBSUc7UUFDTyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUUzQzs7Ozs7Ozs7Ozs7V0FXRztRQUNPLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBSzFDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFD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QyxXQUFXO3VIQWxEakIsU0FBUztzQkFBakIsS0FBSztnQkFRRyxLQUFLO3NCQUFiLEtBQUs7Z0JBTUcsUUFBUTtzQkFBaEIsS0FBSztnQkFNRyxNQUFNO3NCQUFkLEtBQUs7Z0JBTTJELGdCQUFnQjtzQkFBaEYsWUFBWTt1QkFBQyxjQUFjLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBT3JELEtBQUs7c0JBQWQsTUFBTTtnQkFjRyxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQXR0cmlidXRlLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgRWxlbWVudFJlZixcclxuICBOZ1pvbmUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7TmdiVG9hc3RDb25maWd9IGZyb20gJy4vdG9hc3QtY29uZmlnJztcclxuaW1wb3J0IHtuZ2JSdW5UcmFuc2l0aW9ufSBmcm9tICcuLi91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbic7XHJcbmltcG9ydCB7bmdiVG9hc3RGYWRlSW5UcmFuc2l0aW9uLCBuZ2JUb2FzdEZhZGVPdXRUcmFuc2l0aW9ufSBmcm9tICcuL3RvYXN0LXRyYW5zaXRpb24nO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBhbGxvd3MgdGhlIHVzYWdlIG9mIEhUTUwgbWFya3VwIG9yIG90aGVyIGRpcmVjdGl2ZXNcclxuICogaW5zaWRlIG9mIHRoZSB0b2FzdCdzIGhlYWRlci5cclxuICpcclxuICogQHNpbmNlIDUuMC4wXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JUb2FzdEhlYWRlcl0nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRvYXN0SGVhZGVyIHtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvYXN0cyBwcm92aWRlIGZlZWRiYWNrIG1lc3NhZ2VzIGFzIG5vdGlmaWNhdGlvbnMgdG8gdGhlIHVzZXIuXHJcbiAqIEdvYWwgaXMgdG8gbWltaWMgdGhlIHB1c2ggbm90aWZpY2F0aW9ucyBhdmFpbGFibGUgYm90aCBvbiBtb2JpbGUgYW5kIGRlc2t0b3Agb3BlcmF0aW5nIHN5c3RlbXMuXHJcbiAqXHJcbiAqIEBzaW5jZSA1LjAuMFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItdG9hc3QnLFxyXG4gIGV4cG9ydEFzOiAnbmdiVG9hc3QnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgaG9zdDoge1xyXG4gICAgJ3JvbGUnOiAnYWxlcnQnLFxyXG4gICAgJ1thdHRyLmFyaWEtbGl2ZV0nOiAnYXJpYUxpdmUnLFxyXG4gICAgJ2FyaWEtYXRvbWljJzogJ3RydWUnLFxyXG4gICAgJ2NsYXNzJzogJ3RvYXN0JyxcclxuICAgICdbY2xhc3MuZmFkZV0nOiAnYW5pbWF0aW9uJyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgI2hlYWRlclRwbD5cclxuICAgICAgPHN0cm9uZyBjbGFzcz1cIm1lLWF1dG9cIj57e2hlYWRlcn19PC9zdHJvbmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbnRlbnRIZWFkZXJUcGwgfHwgaGVhZGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1oZWFkZXJcIj5cclxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudEhlYWRlclRwbCB8fCBoZWFkZXJUcGxcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudG9hc3QuY2xvc2UtYXJpYVwiIChjbGljayk9XCJoaWRlKClcIj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj5cclxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi90b2FzdC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlRvYXN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgIE9uQ2hhbmdlcyB7XHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCB0b2FzdCBvcGVuaW5nIGFuZCBjbG9zaW5nIHdpbGwgYmUgYW5pbWF0ZWQuXHJcbiAgICpcclxuICAgKiBBbmltYXRpb24gaXMgdHJpZ2dlcmVkIG9ubHkgd2hlbiB0aGUgYC5oaWRlKClgIG9yIGAuc2hvdygpYCBmdW5jdGlvbnMgYXJlIGNhbGxlZFxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIF90aW1lb3V0SUQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGF5IGFmdGVyIHdoaWNoIHRoZSB0b2FzdCB3aWxsIGhpZGUgKG1zKS5cclxuICAgKiBkZWZhdWx0OiBgNTAwYCAobXMpIChpbmhlcml0ZWQgZnJvbSBOZ2JUb2FzdENvbmZpZylcclxuICAgKi9cclxuICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBdXRvIGhpZGUgdGhlIHRvYXN0IGFmdGVyIGEgZGVsYXkgaW4gbXMuXHJcbiAgICogZGVmYXVsdDogYHRydWVgIChpbmhlcml0ZWQgZnJvbSBOZ2JUb2FzdENvbmZpZylcclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvaGlkZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGV4dCB0byBiZSB1c2VkIGFzIHRvYXN0J3MgaGVhZGVyLlxyXG4gICAqIElnbm9yZWQgaWYgYSBDb250ZW50Q2hpbGQgdGVtcGxhdGUgaXMgc3BlY2lmaWVkIGF0IHRoZSBzYW1lIHRpbWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgdGVtcGxhdGUgbGlrZSBgPG5nLXRlbXBsYXRlIG5nYlRvYXN0SGVhZGVyPjwvbmctdGVtcGxhdGU+YCBjYW4gYmVcclxuICAgKiB1c2VkIGluIHRoZSBwcm9qZWN0ZWQgY29udGVudCB0byBhbGxvdyBtYXJrdXAgdXNhZ2UuXHJcbiAgICovXHJcbiAgQENvbnRlbnRDaGlsZChOZ2JUb2FzdEhlYWRlciwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KSBjb250ZW50SGVhZGVyVHBsOiBUZW1wbGF0ZVJlZjxhbnk+fCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZmlyZWQgYWZ0ZXIgdGhlIGFuaW1hdGlvbiB0cmlnZ2VyZWQgYnkgY2FsbGluZyBgLnNob3coKWAgbWV0aG9kIGhhcyBmaW5pc2hlZC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA4LjAuMFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZmlyZWQgYWZ0ZXIgdGhlIGFuaW1hdGlvbiB0cmlnZ2VyZWQgYnkgY2FsbGluZyBgLmhpZGUoKWAgbWV0aG9kIGhhcyBmaW5pc2hlZC5cclxuICAgKlxyXG4gICAqIEl0IGNhbiBvbmx5IG9jY3VyIGluIDIgZGlmZmVyZW50IHNjZW5hcmlvczpcclxuICAgKiAtIGBhdXRvaGlkZWAgdGltZW91dCBmaXJlc1xyXG4gICAqIC0gdXNlciBjbGlja3Mgb24gYSBjbG9zaW5nIGNyb3NzXHJcbiAgICpcclxuICAgKiBBZGRpdGlvbmFsbHkgdGhpcyBvdXRwdXQgaXMgcHVyZWx5IGluZm9ybWF0aXZlLiBUaGUgdG9hc3Qgd29uJ3QgYmUgcmVtb3ZlZCBmcm9tIERPTSBhdXRvbWF0aWNhbGx5LCBpdCdzIHVwXHJcbiAgICogdG8gdGhlIHVzZXIgdG8gdGFrZSBjYXJlIG9mIHRoYXQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgOC4wLjBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgQEF0dHJpYnV0ZSgnYXJpYS1saXZlJykgcHVibGljIGFyaWFMaXZlOiBzdHJpbmcsIGNvbmZpZzogTmdiVG9hc3RDb25maWcsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcclxuICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKHRoaXMuYXJpYUxpdmUgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmFyaWFMaXZlID0gY29uZmlnLmFyaWFMaXZlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWxheSA9IGNvbmZpZy5kZWxheTtcclxuICAgIHRoaXMuYXV0b2hpZGUgPSBjb25maWcuYXV0b2hpZGU7XHJcbiAgICB0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl96b25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKCdhdXRvaGlkZScgaW4gY2hhbmdlcykge1xyXG4gICAgICB0aGlzLl9jbGVhclRpbWVvdXQoKTtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcnMgdG9hc3QgY2xvc2luZyBwcm9ncmFtbWF0aWNhbGx5LlxyXG4gICAqXHJcbiAgICogVGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBlbWl0IGFuZCBiZSBjb21wbGV0ZWQgb25jZSB0aGUgY2xvc2luZyB0cmFuc2l0aW9uIGhhcyBmaW5pc2hlZC5cclxuICAgKiBJZiB0aGUgYW5pbWF0aW9ucyBhcmUgdHVybmVkIG9mZiB0aGlzIGhhcHBlbnMgc3luY2hyb25vdXNseS5cclxuICAgKlxyXG4gICAqIEFsdGVybmF0aXZlbHkgeW91IGNvdWxkIGxpc3RlbiBvciBzdWJzY3JpYmUgdG8gdGhlIGAoaGlkZGVuKWAgb3V0cHV0XHJcbiAgICpcclxuICAgKiBAc2luY2UgOC4wLjBcclxuICAgKi9cclxuICBoaWRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgdGhpcy5fY2xlYXJUaW1lb3V0KCk7XHJcbiAgICBjb25zdCB0cmFuc2l0aW9uID0gbmdiUnVuVHJhbnNpdGlvbihcclxuICAgICAgICB0aGlzLl96b25lLCB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIG5nYlRvYXN0RmFkZU91dFRyYW5zaXRpb24sXHJcbiAgICAgICAge2FuaW1hdGlvbjogdGhpcy5hbmltYXRpb24sIHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCd9KTtcclxuICAgIHRyYW5zaXRpb24uc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5oaWRkZW4uZW1pdCgpOyB9KTtcclxuICAgIHJldHVybiB0cmFuc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcnMgdG9hc3Qgb3BlbmluZyBwcm9ncmFtbWF0aWNhbGx5LlxyXG4gICAqXHJcbiAgICogVGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBlbWl0IGFuZCBiZSBjb21wbGV0ZWQgb25jZSB0aGUgb3BlbmluZyB0cmFuc2l0aW9uIGhhcyBmaW5pc2hlZC5cclxuICAgKiBJZiB0aGUgYW5pbWF0aW9ucyBhcmUgdHVybmVkIG9mZiB0aGlzIGhhcHBlbnMgc3luY2hyb25vdXNseS5cclxuICAgKlxyXG4gICAqIEFsdGVybmF0aXZlbHkgeW91IGNvdWxkIGxpc3RlbiBvciBzdWJzY3JpYmUgdG8gdGhlIGAoc2hvd24pYCBvdXRwdXRcclxuICAgKlxyXG4gICAqIEBzaW5jZSA4LjAuMFxyXG4gICAqL1xyXG4gIHNob3coKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCB0cmFuc2l0aW9uID0gbmdiUnVuVHJhbnNpdGlvbih0aGlzLl96b25lLCB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIG5nYlRvYXN0RmFkZUluVHJhbnNpdGlvbiwge1xyXG4gICAgICBhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLFxyXG4gICAgICBydW5uaW5nVHJhbnNpdGlvbjogJ2NvbnRpbnVlJyxcclxuICAgIH0pO1xyXG4gICAgdHJhbnNpdGlvbi5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLnNob3duLmVtaXQoKTsgfSk7XHJcbiAgICByZXR1cm4gdHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5hdXRvaGlkZSAmJiAhdGhpcy5fdGltZW91dElEKSB7XHJcbiAgICAgIHRoaXMuX3RpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRoaXMuZGVsYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2xlYXJUaW1lb3V0KCkge1xyXG4gICAgaWYgKHRoaXMuX3RpbWVvdXRJRCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dElEKTtcclxuICAgICAgdGhpcy5fdGltZW91dElEID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
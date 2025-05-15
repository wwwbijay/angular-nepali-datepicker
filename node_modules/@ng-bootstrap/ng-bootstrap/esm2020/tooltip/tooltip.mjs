import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { ngbPositioning } from '../util/positioning';
import { PopupService } from '../util/popup';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./tooltip-config";
let nextId = 0;
export class NgbTooltipWindow {
}
NgbTooltipWindow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTooltipWindow, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgbTooltipWindow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbTooltipWindow, selector: "ngb-tooltip-window", inputs: { animation: "animation", id: "id", tooltipClass: "tooltipClass" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"tooltip\" + (tooltipClass ? \" \" + tooltipClass : \"\")", "class.fade": "animation", "id": "id" } }, ngImport: i0, template: `<div class="tooltip-arrow" data-popper-arrow></div><div class="tooltip-inner"><ng-content></ng-content></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTooltipWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-tooltip-window',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '"tooltip" + (tooltipClass ? " " + tooltipClass : "")',
                        '[class.fade]': 'animation',
                        'role': 'tooltip',
                        '[id]': 'id'
                    },
                    template: `<div class="tooltip-arrow" data-popper-arrow></div><div class="tooltip-inner"><ng-content></ng-content></div>`
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], id: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
export class NgbTooltip {
    constructor(_elementRef, _renderer, injector, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the tooltip opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the tooltip closing animation has finished. Contains no payload.
         */
        this.hidden = new EventEmitter();
        this._ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
        this._windowRef = null;
        this._positioning = ngbPositioning();
        this.animation = config.animation;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disableTooltip = config.disableTooltip;
        this.tooltipClass = config.tooltipClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positioning.update(); });
    }
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
     *
     * If the content if falsy, the tooltip won't open.
     */
    set ngbTooltip(value) {
        this._ngbTooltip = value;
        if (!value && this._windowRef) {
            this.close();
        }
    }
    get ngbTooltip() { return this._ngbTooltip; }
    /**
     * Opens the tooltip.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the tooltip template when it is created.
     */
    open(context) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            const { windowRef, transition$ } = this._popupService.open(this._ngbTooltip, context, this.animation);
            this._windowRef = windowRef;
            this._windowRef.instance.animation = this.animation;
            this._windowRef.instance.tooltipClass = this.tooltipClass;
            this._windowRef.instance.id = this._ngbTooltipWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening tooltip from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because tooltip won't work inside the OnPush component.
            // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the tooltip from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Schedule positioning on stable, to avoid several positioning updates.
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                this._positioning.createPopper({
                    hostElement: this._elementRef.nativeElement,
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    appendToBody: this.container === 'body',
                    baseClass: 'bs-tooltip',
                });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    close() {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close(this.animation).subscribe(() => {
                this._windowRef = null;
                this._positioning.destroy();
                this.hidden.emit();
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * Toggles the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     */
    isOpen() { return this._windowRef != null; }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    ngOnChanges({ tooltipClass }) {
        if (tooltipClass && this.isOpen()) {
            this._windowRef.instance.tooltipClass = tooltipClass.currentValue;
        }
    }
    ngOnDestroy() {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    }
}
NgbTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTooltip, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: i1.NgbTooltipConfig }, { token: i0.NgZone }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbTooltip, selector: "[ngbTooltip]", inputs: { animation: "animation", autoClose: "autoClose", placement: "placement", triggers: "triggers", container: "container", disableTooltip: "disableTooltip", tooltipClass: "tooltipClass", openDelay: "openDelay", closeDelay: "closeDelay", ngbTooltip: "ngbTooltip" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbTooltip"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTooltip, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: i1.NgbTooltipConfig }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], placement: [{
                type: Input
            }], triggers: [{
                type: Input
            }], container: [{
                type: Input
            }], disableTooltip: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], ngbTooltip: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90b29sdGlwL3Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBR3ZCLE1BQU0sRUFRTixpQkFBaUIsRUFLbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7QUFFcEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBY2YsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjtpR0FBaEIsZ0JBQWdCLGlUQUZqQiwrR0FBK0c7MkZBRTlHLGdCQUFnQjtrQkFaNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsc0RBQXNEO3dCQUNqRSxjQUFjLEVBQUUsV0FBVzt3QkFDM0IsTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLE1BQU0sRUFBRSxJQUFJO3FCQUNiO29CQUNELFFBQVEsRUFBRSwrR0FBK0c7aUJBQzFIOzhCQUVVLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixL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QkFTRyxTQUFTO3NCQUFqQixLQUFLO2dCQVFHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBT0csU0FBUztzQkFBakIsS0FBSztnQkFPRyxjQUFjO3NCQUF0QixLQUFLO2dCQU9HLFlBQVk7c0JBQXBCLEtBQUs7Z0JBT0csU0FBUztzQkFBakIsS0FBSztnQkFPRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtJLEtBQUs7c0JBQWQsTUFBTTtnQkFLRyxNQUFNO3NCQUFmLE1BQU07Z0JBb0NILFVBQVU7c0JBRGIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdG9yLFxyXG4gIFJlbmRlcmVyMixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIE5nWm9uZSxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBBcHBsaWNhdGlvblJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtsaXN0ZW5Ub1RyaWdnZXJzfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcclxuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcclxuaW1wb3J0IHtuZ2JQb3NpdGlvbmluZywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcblxyXG5pbXBvcnQge05nYlRvb2x0aXBDb25maWd9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7dGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi10b29sdGlwLXdpbmRvdycsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6ICdcInRvb2x0aXBcIiArICh0b29sdGlwQ2xhc3MgPyBcIiBcIiArIHRvb2x0aXBDbGFzcyA6IFwiXCIpJyxcclxuICAgICdbY2xhc3MuZmFkZV0nOiAnYW5pbWF0aW9uJyxcclxuICAgICdyb2xlJzogJ3Rvb2x0aXAnLFxyXG4gICAgJ1tpZF0nOiAnaWQnXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ0b29sdGlwLWFycm93XCIgZGF0YS1wb3BwZXItYXJyb3c+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiVG9vbHRpcFdpbmRvdyB7XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGxpZ2h0d2VpZ2h0IGFuZCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgdG9vbHRpcCBjcmVhdGlvbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlRvb2x0aXBdJywgZXhwb3J0QXM6ICduZ2JUb29sdGlwJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DbG9zZTogYm9vbGVhbiB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCB0b29sdGlwIG9wZW5pbmcgYW5kIGNsb3Npbmcgd2lsbCBiZSBhbmltYXRlZC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA4LjAuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGNsb3NlZCBvbiBgRXNjYXBlYCBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrczpcclxuICAgKlxyXG4gICAqICogYHRydWVgIC0gY2xvc2VzIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcclxuICAgKiAqIGBmYWxzZWAgLSBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcclxuICAgKiAqIGBcImluc2lkZVwiYCAtIGNsb3NlcyBvbiBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKiAqIGBcIm91dHNpZGVcImAgLSBjbG9zZXMgb24gb3V0c2lkZSBjbGlja3MgKHNvbWV0aW1lcyBhbHNvIGFjaGlldmFibGUgdGhyb3VnaCB0cmlnZ2VycylcclxuICAgKiBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjAuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcHJlZmVycmVkIHBsYWNlbWVudCBvZiB0aGUgdG9vbHRpcCwgYW1vbmcgdGhlIFtwb3NzaWJsZSB2YWx1ZXNdKCMvZ3VpZGVzL3Bvc2l0aW9uaW5nI2FwaSkuXHJcbiAgICpcclxuICAgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImF1dG9cImAuXHJcbiAgICpcclxuICAgKiBQbGVhc2Ugc2VlIHRoZSBbcG9zaXRpb25pbmcgb3ZlcnZpZXddKCMvcG9zaXRpb25pbmcpIGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyIHRoZSB0b29sdGlwLlxyXG4gICAqXHJcbiAgICogU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudCBuYW1lcy5cclxuICAgKiBGb3IgbW9yZSBkZXRhaWxzIHNlZSB0aGUgW3RyaWdnZXJzIGRlbW9dKCMvY29tcG9uZW50cy90b29sdGlwL2V4YW1wbGVzI3RyaWdnZXJzKS5cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmlnZ2Vyczogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqXHJcbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYFwiYm9keVwiYC5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCB0b29sdGlwIGlzIGRpc2FibGVkIGFuZCB3b24ndCBiZSBkaXNwbGF5ZWQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlVG9vbHRpcDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb3B0aW9uYWwgY2xhc3MgYXBwbGllZCB0byB0aGUgdG9vbHRpcCB3aW5kb3cgZWxlbWVudC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjIuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBDbGFzczogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb3BlbmluZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDQuMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3BlbkRlbGF5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjbG9zaW5nIGRlbGF5IGluIG1zLiBXb3JrcyBvbmx5IGZvciBcIm5vbi1tYW51YWxcIiBvcGVuaW5nIHRyaWdnZXJzIGRlZmluZWQgYnkgdGhlIGB0cmlnZ2Vyc2AgaW5wdXQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgNC4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBjbG9zZURlbGF5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdG9vbHRpcCBvcGVuaW5nIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQuIENvbnRhaW5zIG5vIHBheWxvYWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHRvb2x0aXAgY2xvc2luZyBhbmltYXRpb24gaGFzIGZpbmlzaGVkLiBDb250YWlucyBubyBwYXlsb2FkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgX25nYlRvb2x0aXA6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT58IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcFdpbmRvd0lkID0gYG5nYi10b29sdGlwLSR7bmV4dElkKyt9YDtcclxuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUb29sdGlwV2luZG93PjtcclxuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUb29sdGlwV2luZG93PnwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuO1xyXG4gIHByaXZhdGUgX3Bvc2l0aW9uaW5nID0gbmdiUG9zaXRpb25pbmcoKTtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBjb25maWc6IE5nYlRvb2x0aXBDb25maWcsIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZikge1xyXG4gICAgdGhpcy5hbmltYXRpb24gPSBjb25maWcuYW5pbWF0aW9uO1xyXG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xyXG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcclxuICAgIHRoaXMuZGlzYWJsZVRvb2x0aXAgPSBjb25maWcuZGlzYWJsZVRvb2x0aXA7XHJcbiAgICB0aGlzLnRvb2x0aXBDbGFzcyA9IGNvbmZpZy50b29sdGlwQ2xhc3M7XHJcbiAgICB0aGlzLm9wZW5EZWxheSA9IGNvbmZpZy5vcGVuRGVsYXk7XHJcbiAgICB0aGlzLmNsb3NlRGVsYXkgPSBjb25maWcuY2xvc2VEZWxheTtcclxuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiVG9vbHRpcFdpbmRvdz4oXHJcbiAgICAgICAgTmdiVG9vbHRpcFdpbmRvdywgaW5qZWN0b3IsIHZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgdGhpcy5fbmdab25lLCBhcHBsaWNhdGlvblJlZik7XHJcblxyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCk7IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cmluZyBjb250ZW50IG9yIGEgYFRlbXBsYXRlUmVmYCBmb3IgdGhlIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB0b29sdGlwLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGNvbnRlbnQgaWYgZmFsc3ksIHRoZSB0b29sdGlwIHdvbid0IG9wZW4uXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgbmdiVG9vbHRpcCh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PnwgbnVsbCB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5fbmdiVG9vbHRpcCA9IHZhbHVlO1xyXG4gICAgaWYgKCF2YWx1ZSAmJiB0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IG5nYlRvb2x0aXAoKSB7IHJldHVybiB0aGlzLl9uZ2JUb29sdGlwOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIHRoZSB0b29sdGlwLlxyXG4gICAqXHJcbiAgICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nLlxyXG4gICAqIFRoZSBgY29udGV4dGAgaXMgYW4gb3B0aW9uYWwgdmFsdWUgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgdG9vbHRpcCB0ZW1wbGF0ZSB3aGVuIGl0IGlzIGNyZWF0ZWQuXHJcbiAgICovXHJcbiAgb3Blbihjb250ZXh0PzogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZiAmJiB0aGlzLl9uZ2JUb29sdGlwICYmICF0aGlzLmRpc2FibGVUb29sdGlwKSB7XHJcbiAgICAgIGNvbnN0IHt3aW5kb3dSZWYsIHRyYW5zaXRpb24kfSA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKHRoaXMuX25nYlRvb2x0aXAsIGNvbnRleHQsIHRoaXMuYW5pbWF0aW9uKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gd2luZG93UmVmO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb247XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS50b29sdGlwQ2xhc3MgPSB0aGlzLnRvb2x0aXBDbGFzcztcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkO1xyXG5cclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLl9uZ2JUb29sdGlwV2luZG93SWQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFdlIG5lZWQgdG8gZGV0ZWN0IGNoYW5nZXMsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGVyZSAub3BlbigpIG1pZ2h0IGJlIGNhbGxlZCBmcm9tLlxyXG4gICAgICAvLyBFeC4gb3BlbmluZyB0b29sdGlwIGZyb20gb25lIG9mIGxpZmVjeWNsZSBob29rcyB0aGF0IHJ1biBhZnRlciB0aGUgQ0RcclxuICAgICAgLy8gKHNheSBmcm9tIG5nQWZ0ZXJWaWV3SW5pdCkgd2lsbCByZXN1bHQgaW4gJ0V4cHJlc3Npb25IYXNDaGFuZ2VkJyBleGNlcHRpb25cclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgIC8vIFdlIG5lZWQgdG8gbWFyayBmb3IgY2hlY2ssIGJlY2F1c2UgdG9vbHRpcCB3b24ndCB3b3JrIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudC5cclxuICAgICAgLy8gRXguIHdoZW4gd2UgdXNlIGV4cHJlc3Npb24gbGlrZSBge3sgdG9vbHRpcC5pc09wZW4oKSA6ICdvcGVuZWQnIDogJ2Nsb3NlZCcgfX1gXHJcbiAgICAgIC8vIGluc2lkZSB0aGUgdGVtcGxhdGUgb2YgYW4gT25QdXNoIGNvbXBvbmVudCBhbmQgd2UgY2hhbmdlIHRoZSB0b29sdGlwIGZyb21cclxuICAgICAgLy8gb3BlbiAtPiBjbG9zZWQsIHRoZSBleHByZXNzaW9uIGluIHF1ZXN0aW9uIHdvbid0IGJlIHVwZGF0ZWQgdW5sZXNzIHdlIGV4cGxpY2l0bHlcclxuICAgICAgLy8gbWFyayB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBiZSBjaGVja2VkLlxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcblxyXG4gICAgICAvLyBTY2hlZHVsZSBwb3NpdGlvbmluZyBvbiBzdGFibGUsIHRvIGF2b2lkIHNldmVyYWwgcG9zaXRpb25pbmcgdXBkYXRlcy5cclxuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbmluZy5jcmVhdGVQb3BwZXIoe1xyXG4gICAgICAgICAgaG9zdEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IHRoaXMuX3dpbmRvd1JlZiAhLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgYXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxyXG4gICAgICAgICAgYmFzZUNsYXNzOiAnYnMtdG9vbHRpcCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmdiQXV0b0Nsb3NlKFxyXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5oaWRkZW4sXHJcbiAgICAgICAgICBbdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcclxuXHJcbiAgICAgIHRyYW5zaXRpb24kLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNob3duLmVtaXQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIHRvb2x0aXAuXHJcbiAgICpcclxuICAgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXHJcbiAgICovXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93UmVmICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcclxuICAgICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKHRoaXMuYW5pbWF0aW9uKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb25pbmcuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuaGlkZGVuLmVtaXQoKTtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSB0b29sdGlwLlxyXG4gICAqXHJcbiAgICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxyXG4gICAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IHNob3duLlxyXG4gICAqL1xyXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuID0gbGlzdGVuVG9UcmlnZ2VycyhcclxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLmlzT3Blbi5iaW5kKHRoaXMpLCB0aGlzLm9wZW4uYmluZCh0aGlzKSxcclxuICAgICAgICB0aGlzLmNsb3NlLmJpbmQodGhpcyksICt0aGlzLm9wZW5EZWxheSwgK3RoaXMuY2xvc2VEZWxheSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyh7dG9vbHRpcENsYXNzfTogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKHRvb2x0aXBDbGFzcyAmJiB0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLnRvb2x0aXBDbGFzcyA9IHRvb2x0aXBDbGFzcy5jdXJyZW50VmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIGFzIGl0IG1pZ2h0IGhhcHBlbiB0aGF0IG5nT25EZXN0cm95IGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXRcclxuICAgIC8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjE5OVxyXG4gICAgaWYgKHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbikge1xyXG4gICAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4oKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19
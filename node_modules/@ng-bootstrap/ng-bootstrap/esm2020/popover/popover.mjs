import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { ngbPositioning } from '../util/positioning';
import { PopupService } from '../util/popup';
import { offset } from '@popperjs/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./popover-config";
let nextId = 0;
function updatePopperOptions(options) {
    options.modifiers.push(offset, {
        name: 'offset',
        options: {
            offset: () => {
                return [0, 12];
            },
        },
    });
    return options;
}
export class NgbPopoverWindow {
    isTitleTemplate() { return this.title instanceof TemplateRef; }
}
NgbPopoverWindow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPopoverWindow, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgbPopoverWindow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbPopoverWindow, selector: "ngb-popover-window", inputs: { animation: "animation", title: "title", id: "id", popoverClass: "popoverClass", context: "context" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"popover\" + (popoverClass ? \" \" + popoverClass : \"\")", "class.fade": "animation", "id": "id" } }, ngImport: i0, template: `
    <div class="popover-arrow" data-popper-arrow></div>
    <h3 class="popover-header" *ngIf="title">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPopoverWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-popover-window',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")',
                        '[class.fade]': 'animation',
                        'role': 'tooltip',
                        '[id]': 'id'
                    },
                    template: `
    <div class="popover-arrow" data-popper-arrow></div>
    <h3 class="popover-header" *ngIf="title">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], title: [{
                type: Input
            }], id: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], context: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
export class NgbPopover {
    constructor(_elementRef, _renderer, injector, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the popover opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover closing animation has finished. Contains no payload.
         *
         * At this point popover is not in the DOM anymore.
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        this._windowRef = null;
        this._positioning = ngbPositioning();
        this.animation = config.animation;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positioning.update(); });
    }
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            // this type assertion is safe because otherwise _isDisabled would return true
            const { windowRef, transition$ } = this._popupService.open(this.ngbPopover, context, this.animation);
            this._windowRef = windowRef;
            this._windowRef.instance.animation = this.animation;
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.context = context;
            this._windowRef.instance.popoverClass = this.popoverClass;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
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
                    baseClass: 'bs-popover', updatePopperOptions,
                });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    close() {
        if (this._windowRef) {
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
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
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
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }) {
        if (popoverClass && this.isOpen()) {
            this._windowRef.instance.popoverClass = popoverClass.currentValue;
        }
        // close popover if title and content become empty, or disablePopover set to true
        if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
            this.close();
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
NgbPopover.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPopover, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: i2.NgbPopoverConfig }, { token: i0.NgZone }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPopover.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPopover, selector: "[ngbPopover]", inputs: { animation: "animation", autoClose: "autoClose", ngbPopover: "ngbPopover", popoverTitle: "popoverTitle", placement: "placement", triggers: "triggers", container: "container", disablePopover: "disablePopover", popoverClass: "popoverClass", openDelay: "openDelay", closeDelay: "closeDelay" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbPopover"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPopover, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: i2.NgbPopoverConfig }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], ngbPopover: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], placement: [{
                type: Input
            }], triggers: [{
                type: Input
            }], container: [{
                type: Input
            }], disablePopover: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wb3BvdmVyL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBSXZCLE1BQU0sRUFLTixXQUFXLEVBSVgsaUJBQWlCLEVBR2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLGNBQWMsRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBVSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFcEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsU0FBUyxtQkFBbUIsQ0FBQyxPQUFnQjtJQUMzQyxPQUFPLENBQUMsU0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDL0IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUU7WUFDUCxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakIsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQW9CRCxNQUFNLE9BQU8sZ0JBQWdCO0lBTzNCLGVBQWUsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBVyxDQUFDLENBQUMs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TSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEluamVjdCxcclxuICBJbmplY3RvcixcclxuICBSZW5kZXJlcjIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBOZ1pvbmUsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBBcHBsaWNhdGlvblJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtsaXN0ZW5Ub1RyaWdnZXJzfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcclxuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcclxuaW1wb3J0IHtuZ2JQb3NpdGlvbmluZywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcblxyXG5pbXBvcnQge05nYlBvcG92ZXJDb25maWd9IGZyb20gJy4vcG9wb3Zlci1jb25maWcnO1xyXG5cclxuaW1wb3J0IHtPcHRpb25zLCBvZmZzZXR9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlUG9wcGVyT3B0aW9ucyhvcHRpb25zOiBPcHRpb25zKSB7XHJcbiAgb3B0aW9ucy5tb2RpZmllcnMgIS5wdXNoKG9mZnNldCwge1xyXG4gICAgbmFtZTogJ29mZnNldCcsXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgIG9mZnNldDogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbMCwgMTJdO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG9wdGlvbnM7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXBvcG92ZXItd2luZG93JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzogJ1wicG9wb3ZlclwiICsgKHBvcG92ZXJDbGFzcyA/IFwiIFwiICsgcG9wb3ZlckNsYXNzIDogXCJcIiknLFxyXG4gICAgJ1tjbGFzcy5mYWRlXSc6ICdhbmltYXRpb24nLFxyXG4gICAgJ3JvbGUnOiAndG9vbHRpcCcsXHJcbiAgICAnW2lkXSc6ICdpZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1hcnJvd1wiIGRhdGEtcG9wcGVyLWFycm93PjwvZGl2PlxyXG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIiAqbmdJZj1cInRpdGxlXCI+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjc2ltcGxlVGl0bGU+e3t0aXRsZX19PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImlzVGl0bGVUZW1wbGF0ZSgpID8gJGFueSh0aXRsZSkgOiBzaW1wbGVUaXRsZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvaDM+XHJcbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PnwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICBASW5wdXQoKSBpZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcclxuXHJcbiAgaXNUaXRsZVRlbXBsYXRlKCkgeyByZXR1cm4gdGhpcy50aXRsZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGxpZ2h0d2VpZ2h0IGFuZCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgcG9wb3ZlciBjcmVhdGlvbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlBvcG92ZXJdJywgZXhwb3J0QXM6ICduZ2JQb3BvdmVyJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DbG9zZTogYm9vbGVhbiB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCBwb3BvdmVyIG9wZW5pbmcgYW5kIGNsb3Npbmcgd2lsbCBiZSBhbmltYXRlZC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA4LjAuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGNsb3NlZCBvbiBgRXNjYXBlYCBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrczpcclxuICAgKlxyXG4gICAqICogYHRydWVgIC0gY2xvc2VzIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcclxuICAgKiAqIGBmYWxzZWAgLSBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcclxuICAgKiAqIGBcImluc2lkZVwiYCAtIGNsb3NlcyBvbiBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKiAqIGBcIm91dHNpZGVcImAgLSBjbG9zZXMgb24gb3V0c2lkZSBjbGlja3MgKHNvbWV0aW1lcyBhbHNvIGFjaGlldmFibGUgdGhyb3VnaCB0cmlnZ2VycylcclxuICAgKiBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjAuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3RyaW5nIGNvbnRlbnQgb3IgYSBgVGVtcGxhdGVSZWZgIGZvciB0aGUgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHBvcG92ZXIuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgdGl0bGUgYW5kIHRoZSBjb250ZW50IGFyZSBmYWxzeSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cclxuICAgKi9cclxuICBASW5wdXQoKSBuZ2JQb3BvdmVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+fCBudWxsIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGl0bGUgb2YgdGhlIHBvcG92ZXIuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgdGl0bGUgYW5kIHRoZSBjb250ZW50IGFyZSBmYWxzeSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cclxuICAgKi9cclxuICBASW5wdXQoKSBwb3BvdmVyVGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT58IG51bGwgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSBwb3BvdmVyLCBhbW9uZyB0aGUgW3Bvc3NpYmxlIHZhbHVlc10oIy9ndWlkZXMvcG9zaXRpb25pbmcjYXBpKS5cclxuICAgKlxyXG4gICAqIFRoZSBkZWZhdWx0IG9yZGVyIG9mIHByZWZlcmVuY2UgaXMgYFwiYXV0b1wiYC5cclxuICAgKlxyXG4gICAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xyXG5cclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIgdGhlIHRvb2x0aXAuXHJcbiAgICpcclxuICAgKiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50IG5hbWVzLlxyXG4gICAqIEZvciBtb3JlIGRldGFpbHMgc2VlIHRoZSBbdHJpZ2dlcnMgZGVtb10oIy9jb21wb25lbnRzL3BvcG92ZXIvZXhhbXBsZXMjdHJpZ2dlcnMpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXHJcbiAgICpcclxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBgYm9keWAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgd29uJ3QgYmUgZGlzcGxheWVkLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDEuMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZVBvcG92ZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHBvcG92ZXIgd2luZG93IGVsZW1lbnQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMi4yLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBwb3BvdmVyQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9wZW5pbmcgZGVsYXkgaW4gbXMuIFdvcmtzIG9ubHkgZm9yIFwibm9uLW1hbnVhbFwiIG9wZW5pbmcgdHJpZ2dlcnMgZGVmaW5lZCBieSB0aGUgYHRyaWdnZXJzYCBpbnB1dC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA0LjEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wZW5EZWxheTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY2xvc2luZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDQuMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xvc2VEZWxheTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvcG92ZXIgb3BlbmluZyBhbmltYXRpb24gaGFzIGZpbmlzaGVkLiBDb250YWlucyBubyBwYXlsb2FkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIGNsb3NpbmcgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZC4gQ29udGFpbnMgbm8gcGF5bG9hZC5cclxuICAgKlxyXG4gICAqIEF0IHRoaXMgcG9pbnQgcG9wb3ZlciBpcyBub3QgaW4gdGhlIERPTSBhbnltb3JlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XHJcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz47XHJcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiUG9wb3ZlcldpbmRvdz58IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbjtcclxuICBwcml2YXRlIF9wb3NpdGlvbmluZyA9IG5nYlBvc2l0aW9uaW5nKCk7XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2lzRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlUG9wb3Zlcikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5uZ2JQb3BvdmVyICYmICF0aGlzLnBvcG92ZXJUaXRsZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBjb25maWc6IE5nYlBvcG92ZXJDb25maWcsIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZikge1xyXG4gICAgdGhpcy5hbmltYXRpb24gPSBjb25maWcuYW5pbWF0aW9uO1xyXG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xyXG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcclxuICAgIHRoaXMuZGlzYWJsZVBvcG92ZXIgPSBjb25maWcuZGlzYWJsZVBvcG92ZXI7XHJcbiAgICB0aGlzLnBvcG92ZXJDbGFzcyA9IGNvbmZpZy5wb3BvdmVyQ2xhc3M7XHJcbiAgICB0aGlzLm9wZW5EZWxheSA9IGNvbmZpZy5vcGVuRGVsYXk7XHJcbiAgICB0aGlzLmNsb3NlRGVsYXkgPSBjb25maWcuY2xvc2VEZWxheTtcclxuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz4oXHJcbiAgICAgICAgTmdiUG9wb3ZlcldpbmRvdywgaW5qZWN0b3IsIHZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgdGhpcy5fbmdab25lLCBhcHBsaWNhdGlvblJlZik7XHJcblxyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCk7IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgdGhlIHBvcG92ZXIuXHJcbiAgICpcclxuICAgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcuXHJcbiAgICogVGhlIGBjb250ZXh0YCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwb3BvdmVyIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cclxuICAgKi9cclxuICBvcGVuKGNvbnRleHQ/OiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5fd2luZG93UmVmICYmICF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgLy8gdGhpcyB0eXBlIGFzc2VydGlvbiBpcyBzYWZlIGJlY2F1c2Ugb3RoZXJ3aXNlIF9pc0Rpc2FibGVkIHdvdWxkIHJldHVybiB0cnVlXHJcbiAgICAgIGNvbnN0IHt3aW5kb3dSZWYsIHRyYW5zaXRpb24kfSA9XHJcbiAgICAgICAgICB0aGlzLl9wb3B1cFNlcnZpY2Uub3Blbih0aGlzLm5nYlBvcG92ZXIgYXMoc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiksIGNvbnRleHQsIHRoaXMuYW5pbWF0aW9uKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gd2luZG93UmVmO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb247XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wb3BvdmVyQ2xhc3MgPSB0aGlzLnBvcG92ZXJDbGFzcztcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5fbmdiUG9wb3ZlcldpbmRvd0lkO1xyXG5cclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFdlIG5lZWQgdG8gZGV0ZWN0IGNoYW5nZXMsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGVyZSAub3BlbigpIG1pZ2h0IGJlIGNhbGxlZCBmcm9tLlxyXG4gICAgICAvLyBFeC4gb3BlbmluZyBwb3BvdmVyIGZyb20gb25lIG9mIGxpZmVjeWNsZSBob29rcyB0aGF0IHJ1biBhZnRlciB0aGUgQ0RcclxuICAgICAgLy8gKHNheSBmcm9tIG5nQWZ0ZXJWaWV3SW5pdCkgd2lsbCByZXN1bHQgaW4gJ0V4cHJlc3Npb25IYXNDaGFuZ2VkJyBleGNlcHRpb25cclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgIC8vIFdlIG5lZWQgdG8gbWFyayBmb3IgY2hlY2ssIGJlY2F1c2UgcG9wb3ZlciB3b24ndCB3b3JrIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudC5cclxuICAgICAgLy8gRXguIHdoZW4gd2UgdXNlIGV4cHJlc3Npb24gbGlrZSBge3sgcG9wb3Zlci5pc09wZW4oKSA6ICdvcGVuZWQnIDogJ2Nsb3NlZCcgfX1gXHJcbiAgICAgIC8vIGluc2lkZSB0aGUgdGVtcGxhdGUgb2YgYW4gT25QdXNoIGNvbXBvbmVudCBhbmQgd2UgY2hhbmdlIHRoZSBwb3BvdmVyIGZyb21cclxuICAgICAgLy8gb3BlbiAtPiBjbG9zZWQsIHRoZSBleHByZXNzaW9uIGluIHF1ZXN0aW9uIHdvbid0IGJlIHVwZGF0ZWQgdW5sZXNzIHdlIGV4cGxpY2l0bHlcclxuICAgICAgLy8gbWFyayB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBiZSBjaGVja2VkLlxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcblxyXG4gICAgICAvLyBTY2hlZHVsZSBwb3NpdGlvbmluZyBvbiBzdGFibGUsIHRvIGF2b2lkIHNldmVyYWwgcG9zaXRpb25pbmcgdXBkYXRlcy5cclxuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbmluZy5jcmVhdGVQb3BwZXIoe1xyXG4gICAgICAgICAgaG9zdEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IHRoaXMuX3dpbmRvd1JlZiAhLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgYXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxyXG4gICAgICAgICAgYmFzZUNsYXNzOiAnYnMtcG9wb3ZlcicsIHVwZGF0ZVBvcHBlck9wdGlvbnMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmdiQXV0b0Nsb3NlKFxyXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5oaWRkZW4sXHJcbiAgICAgICAgICBbdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcclxuXHJcbiAgICAgIHRyYW5zaXRpb24kLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNob3duLmVtaXQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIHBvcG92ZXIuXHJcbiAgICpcclxuICAgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXHJcbiAgICovXHJcbiAgY2xvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XHJcbiAgICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSh0aGlzLmFuaW1hdGlvbikuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uaW5nLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmhpZGRlbi5lbWl0KCk7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyB0aGUgcG9wb3Zlci5cclxuICAgKlxyXG4gICAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cclxuICAgKi9cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBwb3BvdmVyIGlzIGN1cnJlbnRseSBzaG93bi5cclxuICAgKi9cclxuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbiA9IGxpc3RlblRvVHJpZ2dlcnMoXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy50cmlnZ2VycywgdGhpcy5pc09wZW4uYmluZCh0aGlzKSwgdGhpcy5vcGVuLmJpbmQodGhpcyksXHJcbiAgICAgICAgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLCArdGhpcy5vcGVuRGVsYXksICt0aGlzLmNsb3NlRGVsYXkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoe25nYlBvcG92ZXIsIHBvcG92ZXJUaXRsZSwgZGlzYWJsZVBvcG92ZXIsIHBvcG92ZXJDbGFzc306IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChwb3BvdmVyQ2xhc3MgJiYgdGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5wb3BvdmVyQ2xhc3MgPSBwb3BvdmVyQ2xhc3MuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gY2xvc2UgcG9wb3ZlciBpZiB0aXRsZSBhbmQgY29udGVudCBiZWNvbWUgZW1wdHksIG9yIGRpc2FibGVQb3BvdmVyIHNldCB0byB0cnVlXHJcbiAgICBpZiAoKG5nYlBvcG92ZXIgfHwgcG9wb3ZlclRpdGxlIHx8IGRpc2FibGVQb3BvdmVyKSAmJiB0aGlzLl9pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBhcyBpdCBtaWdodCBoYXBwZW4gdGhhdCBuZ09uRGVzdHJveSBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0XHJcbiAgICAvLyB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIxOTlcclxuICAgIGlmICh0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4pIHtcclxuICAgICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
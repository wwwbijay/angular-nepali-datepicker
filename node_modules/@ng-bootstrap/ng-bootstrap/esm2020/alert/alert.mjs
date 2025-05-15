import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbAlertFadingTransition } from './alert-transition';
import * as i0 from "@angular/core";
import * as i1 from "./alert-config";
import * as i2 from "@angular/common";
/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
export class NgbAlert {
    constructor(config, _renderer, _element, _zone) {
        this._renderer = _renderer;
        this._element = _element;
        this._zone = _zone;
        /**
         * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
         *
         * @since 8.0.0
         */
        this.closed = new EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
        this.animation = config.animation;
    }
    /**
     * Triggers alert closing programmatically (same as clicking on the close button (×)).
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(closed)` output
     *
     * @since 8.0.0
     */
    close() {
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbAlertFadingTransition, { animation: this.animation, runningTransition: 'continue' });
        transition.subscribe(() => this.closed.emit());
        return transition;
    }
    ngOnChanges(changes) {
        const typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, `alert-${typeChange.previousValue}`);
            this._renderer.addClass(this._element.nativeElement, `alert-${typeChange.currentValue}`);
        }
    }
    ngOnInit() { this._renderer.addClass(this._element.nativeElement, `alert-${this.type}`); }
}
NgbAlert.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAlert, deps: [{ token: i1.NgbAlertConfig }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NgbAlert.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbAlert, selector: "ngb-alert", inputs: { animation: "animation", dismissible: "dismissible", type: "type" }, outputs: { closed: "closed" }, host: { attributes: { "role": "alert" }, properties: { "class.fade": "animation", "class.alert-dismissible": "dismissible" }, classAttribute: "alert show" }, exportAs: ["ngbAlert"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <button *ngIf="dismissible" type="button" class="btn-close" aria-label="Close" i18n-aria-label="@@ngb.alert.close"
      (click)="close()">
    </button>
    `, isInline: true, styles: ["ngb-alert{display:block}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAlert, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-alert', exportAs: 'ngbAlert', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: { 'role': 'alert', 'class': 'alert show', '[class.fade]': 'animation', '[class.alert-dismissible]': 'dismissible' }, template: `
    <ng-content></ng-content>
    <button *ngIf="dismissible" type="button" class="btn-close" aria-label="Close" i18n-aria-label="@@ngb.alert.close"
      (click)="close()">
    </button>
    `, styles: ["ngb-alert{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbAlertConfig }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { animation: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], type: [{
                type: Input
            }], closed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYWxlcnQvYWxlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFNdkIsaUJBQWlCLEVBRWxCLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0FBRTVEOzs7O0dBSUc7QUFnQkgsTUFBTSxPQUFPLFFBQVE7SUFvQ25CLFlBQ0ksTUFBc0IsRUFBVSxTQUFvQixFQUFVLFFBQW9CLEVBQVUsS0FBYTtRQUF6RSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFUN0c7Ozs7V0FJRztRQUNPLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBSzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLO1FBQ0gsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLEVBQ2pFLEVBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUNoRSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzFGO0lBQ0gsQ0FBQztJQUVELFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7cUdBckUvRSxRQUFRO3lGQUFSLFFBQVEseVdBUlQ7Ozs7O0tBS1A7MkZBR1EsUUFBUTtrQkFmcEIsU0FBUzsrQkFDRSxXQUFXLFlBQ1gsVUFBVSxtQkFDSCx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRWpDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFDLFlBQzNHOzs7OztLQUtQOzJLQWFNLFNBQVM7c0JBQWpCLEtBQUs7Z0JBUUcsV0FBVztzQkFBbkIsS0FBSztnQkFRRyxJQUFJO3NCQUFaLEtBQUs7Z0JBT0ksTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBSZW5kZXJlcjIsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnLi9hbGVydC1jb25maWcnO1xyXG5pbXBvcnQge25nYlJ1blRyYW5zaXRpb259IGZyb20gJy4uL3V0aWwvdHJhbnNpdGlvbi9uZ2JUcmFuc2l0aW9uJztcclxuaW1wb3J0IHtuZ2JBbGVydEZhZGluZ1RyYW5zaXRpb259IGZyb20gJy4vYWxlcnQtdHJhbnNpdGlvbic7XHJcblxyXG4vKipcclxuICogQWxlcnQgaXMgYSBjb21wb25lbnQgdG8gcHJvdmlkZSBjb250ZXh0dWFsIGZlZWRiYWNrIG1lc3NhZ2VzIGZvciB1c2VyLlxyXG4gKlxyXG4gKiBJdCBzdXBwb3J0cyBzZXZlcmFsIGFsZXJ0IHR5cGVzIGFuZCBjYW4gYmUgZGlzbWlzc2VkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItYWxlcnQnLFxyXG4gIGV4cG9ydEFzOiAnbmdiQWxlcnQnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgaG9zdDpcclxuICAgICAgeydyb2xlJzogJ2FsZXJ0JywgJ2NsYXNzJzogJ2FsZXJ0IHNob3cnLCAnW2NsYXNzLmZhZGVdJzogJ2FuaW1hdGlvbicsICdbY2xhc3MuYWxlcnQtZGlzbWlzc2libGVdJzogJ2Rpc21pc3NpYmxlJ30sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDxidXR0b24gKm5nSWY9XCJkaXNtaXNzaWJsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1jbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmFsZXJ0LmNsb3NlXCJcclxuICAgICAgKGNsaWNrKT1cImNsb3NlKClcIj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgYCxcclxuICBzdHlsZVVybHM6IFsnLi9hbGVydC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0IGltcGxlbWVudHMgT25Jbml0LFxyXG4gICAgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIGFsZXJ0IGNsb3Npbmcgd2lsbCBiZSBhbmltYXRlZC5cclxuICAgKlxyXG4gICAqIEFuaW1hdGlvbiBpcyB0cmlnZ2VyZWQgb25seSB3aGVuIGNsaWNrZWQgb24gdGhlIGNsb3NlIGJ1dHRvbiAow5cpXHJcbiAgICogb3IgdmlhIHRoZSBgLmNsb3NlKClgIGZ1bmN0aW9uXHJcbiAgICpcclxuICAgKiBAc2luY2UgOC4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgYWxlcnQgY2FuIGJlIGRpc21pc3NlZCBieSB0aGUgdXNlci5cclxuICAgKlxyXG4gICAqIFRoZSBjbG9zZSBidXR0b24gKMOXKSB3aWxsIGJlIGRpc3BsYXllZCBhbmQgeW91IGNhbiBiZSBub3RpZmllZFxyXG4gICAqIG9mIHRoZSBldmVudCB3aXRoIHRoZSBgKGNsb3NlKWAgb3V0cHV0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc21pc3NpYmxlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUeXBlIG9mIHRoZSBhbGVydC5cclxuICAgKlxyXG4gICAqIEJvb3RzdHJhcCBwcm92aWRlcyBzdHlsZXMgZm9yIHRoZSBmb2xsb3dpbmcgdHlwZXM6IGAnc3VjY2VzcydgLCBgJ2luZm8nYCwgYCd3YXJuaW5nJ2AsIGAnZGFuZ2VyJ2AsIGAncHJpbWFyeSdgLFxyXG4gICAqIGAnc2Vjb25kYXJ5J2AsIGAnbGlnaHQnYCBhbmQgYCdkYXJrJ2AuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkLiBJdCBoYXMgbm8gcGF5bG9hZCBhbmQgb25seSByZWxldmFudCBmb3IgZGlzbWlzc2libGUgYWxlcnRzLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBjb25maWc6IE5nYkFsZXJ0Q29uZmlnLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgIHRoaXMuZGlzbWlzc2libGUgPSBjb25maWcuZGlzbWlzc2libGU7XHJcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuICAgIHRoaXMuYW5pbWF0aW9uID0gY29uZmlnLmFuaW1hdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJzIGFsZXJ0IGNsb3NpbmcgcHJvZ3JhbW1hdGljYWxseSAoc2FtZSBhcyBjbGlja2luZyBvbiB0aGUgY2xvc2UgYnV0dG9uICjDlykpLlxyXG4gICAqXHJcbiAgICogVGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBlbWl0IGFuZCBiZSBjb21wbGV0ZWQgb25jZSB0aGUgY2xvc2luZyB0cmFuc2l0aW9uIGhhcyBmaW5pc2hlZC5cclxuICAgKiBJZiB0aGUgYW5pbWF0aW9ucyBhcmUgdHVybmVkIG9mZiB0aGlzIGhhcHBlbnMgc3luY2hyb25vdXNseS5cclxuICAgKlxyXG4gICAqIEFsdGVybmF0aXZlbHkgeW91IGNvdWxkIGxpc3RlbiBvciBzdWJzY3JpYmUgdG8gdGhlIGAoY2xvc2VkKWAgb3V0cHV0XHJcbiAgICpcclxuICAgKiBAc2luY2UgOC4wLjBcclxuICAgKi9cclxuICBjbG9zZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHRyYW5zaXRpb24gPSBuZ2JSdW5UcmFuc2l0aW9uKFxyXG4gICAgICAgIHRoaXMuX3pvbmUsIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgbmdiQWxlcnRGYWRpbmdUcmFuc2l0aW9uLFxyXG4gICAgICAgIHthbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLCBydW5uaW5nVHJhbnNpdGlvbjogJ2NvbnRpbnVlJ30pO1xyXG4gICAgdHJhbnNpdGlvbi5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZWQuZW1pdCgpKTtcclxuICAgIHJldHVybiB0cmFuc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgdHlwZUNoYW5nZSA9IGNoYW5nZXNbJ3R5cGUnXTtcclxuICAgIGlmICh0eXBlQ2hhbmdlICYmICF0eXBlQ2hhbmdlLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgYGFsZXJ0LSR7dHlwZUNoYW5nZS5wcmV2aW91c1ZhbHVlfWApO1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3R5cGVDaGFuZ2UuY3VycmVudFZhbHVlfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7IHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgYGFsZXJ0LSR7dGhpcy50eXBlfWApOyB9XHJcbn1cclxuIl19
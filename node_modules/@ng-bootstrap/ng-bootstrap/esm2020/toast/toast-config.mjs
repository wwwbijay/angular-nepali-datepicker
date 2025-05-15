import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * @since 5.0.0
 */
export class NgbToastConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.autohide = true;
        this.delay = 5000;
        this.ariaLive = 'polite';
    }
    get animation() { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; }
    set animation(animation) { this._animation = animation; }
}
NgbToastConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbToastConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable });
NgbToastConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbToastConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbToastConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RvYXN0L3RvYXN0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUE4QnpDOzs7Ozs7R0FNRztBQUVILE1BQU0sT0FBTyxjQUFjO0lBT3pCLFlBQW9CLFVBQXFCO1FBQXJCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFOekMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsYUFBUSxHQUF1QixRQUFRLENBQUM7SUFJSSxDQUFDO0lBRTdDLElBQUksU0FBUyxLQUFjLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEgsSUFBSSxTQUFTLENBQUMsU0FBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7OzJHQVZ2RCxjQUFjOytHQUFkLGNBQWMsY0FERixNQUFNOzJGQUNsQixjQUFjO2tCQUQxQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiQ29uZmlnfSBmcm9tICcuLi9uZ2ItY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgdXNlZCB0byB0eXBlIGFsbCB0b2FzdCBjb25maWcgb3B0aW9ucy4gU2VlIGBOZ2JUb2FzdENvbmZpZ2AuXHJcbiAqXHJcbiAqIEBzaW5jZSA1LjAuMFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JUb2FzdE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgaWYgdGhlIHRvYXN0IGNvbXBvbmVudCBzaG91bGQgZW1pdCB0aGUgYGhpZGUoKWAgb3V0cHV0XHJcbiAgICogYWZ0ZXIgYSBjZXJ0YWluIGBkZWxheWAgaW4gbXMuXHJcbiAgICovXHJcbiAgYXV0b2hpZGU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBEZWxheSBpbiBtcyBhZnRlciB3aGljaCB0aGUgYGhpZGUoKWAgb3V0cHV0IHNob3VsZCBiZSBlbWl0dGVkLlxyXG4gICAqL1xyXG4gIGRlbGF5PzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUeXBlIG9mIGFyaWEtbGl2ZSBhdHRyaWJ1dGUgdG8gYmUgdXNlZC5cclxuICAgKlxyXG4gICAqIENvdWxkIGJlIG9uZSBvZiB0aGVzZSAyIHZhbHVlcyAoYXMgc3RyaW5nKTpcclxuICAgKiAtIGBwb2xpdGVgIChkZWZhdWx0KVxyXG4gICAqIC0gYGFsZXJ0YFxyXG4gICAqL1xyXG4gIGFyaWFMaXZlPzogJ3BvbGl0ZScgfCAnYWxlcnQnO1xyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVG9hc3QgY29tcG9uZW50LiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LFxyXG4gKiBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW4gb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSB0b2FzdHMgdXNlZCBpbiB0aGVcclxuICogYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIEBzaW5jZSA1LjAuMFxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUb2FzdENvbmZpZyBpbXBsZW1lbnRzIE5nYlRvYXN0T3B0aW9ucyB7XHJcbiAgYXV0b2hpZGUgPSB0cnVlO1xyXG4gIGRlbGF5ID0gNTAwMDtcclxuICBhcmlhTGl2ZTogJ3BvbGl0ZScgfCAnYWxlcnQnID0gJ3BvbGl0ZSc7XHJcblxyXG4gIHByaXZhdGUgX2FuaW1hdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdiQ29uZmlnOiBOZ2JDb25maWcpIHt9XHJcblxyXG4gIGdldCBhbmltYXRpb24oKTogYm9vbGVhbiB7IHJldHVybiAodGhpcy5fYW5pbWF0aW9uID09PSB1bmRlZmluZWQpID8gdGhpcy5fbmdiQ29uZmlnLmFuaW1hdGlvbiA6IHRoaXMuX2FuaW1hdGlvbjsgfVxyXG4gIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBib29sZWFuKSB7IHRoaXMuX2FuaW1hdGlvbiA9IGFuaW1hdGlvbjsgfVxyXG59XHJcbiJdfQ==
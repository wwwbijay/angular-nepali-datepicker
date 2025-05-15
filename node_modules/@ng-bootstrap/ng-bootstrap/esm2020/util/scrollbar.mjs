import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Utility to handle the scrollbar.
 *
 * It allows to hide the scrollbar and compensate the lack of a vertical scrollbar
 * by adding an equivalent padding on the right of the body, and to revert this change.
 */
export class ScrollBar {
    constructor(_document) {
        this._document = _document;
    }
    /**
     * To be called to hide a potential vertical scrollbar:
     * - if a scrollbar is there and has a width greater than 0, adds some compensation
     * padding to the body to keep the same layout as when the scrollbar is there
     * - adds overflow: hidden
     *
     * @return a callback used to revert the change
     */
    hide() {
        const scrollbarWidth = Math.abs(window.innerWidth - this._document.documentElement.clientWidth);
        const body = this._document.body;
        const bodyStyle = body.style;
        const { overflow, paddingRight } = bodyStyle;
        if (scrollbarWidth > 0) {
            const actualPadding = parseFloat(window.getComputedStyle(body).paddingRight);
            bodyStyle.paddingRight = `${actualPadding + scrollbarWidth}px`;
        }
        bodyStyle.overflow = 'hidden';
        return () => {
            if (scrollbarWidth > 0) {
                bodyStyle.paddingRight = paddingRight;
            }
            bodyStyle.overflow = overflow;
        };
    }
}
ScrollBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScrollBar, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
ScrollBar.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScrollBar, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScrollBar, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvc2Nyb2xsYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLekM7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sU0FBUztJQUNwQixZQUFzQyxTQUFjO1FBQWQsY0FBUyxHQUFULFNBQVMsQ0FBSztJQUFHLENBQUM7SUFFeEQ7Ozs7Ozs7T0FPRztJQUNILElBQUk7UUFDRixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEcsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QixNQUFNLEVBQUMsUUFBUSxFQUFFLFlBQVksRUFBQyxHQUFHLFNBQVMsQ0FBQztRQUMzQyxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3RSxTQUFTLENBQUMsWUFBWSxHQUFHLEdBQUcsYUFBYSxHQUFHLGNBQWMsSUFBSSxDQUFDO1NBQ2hFO1FBQ0QsU0FBUyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDOUIsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2FBQ3ZDO1lBQ0QsU0FBUyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDaEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7c0dBM0JVLFNBQVMsa0JBQ0EsUUFBUTswR0FEakIsU0FBUyxjQURHLE1BQU07MkZBQ2xCLFNBQVM7a0JBRHJCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzswQkFFakIsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqIFR5cGUgZm9yIHRoZSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgc2Nyb2xsYmFyLiAqL1xyXG5leHBvcnQgdHlwZSBTY3JvbGxiYXJSZXZlcnRlciA9ICgpID0+IHZvaWQ7XHJcblxyXG4vKipcclxuICogVXRpbGl0eSB0byBoYW5kbGUgdGhlIHNjcm9sbGJhci5cclxuICpcclxuICogSXQgYWxsb3dzIHRvIGhpZGUgdGhlIHNjcm9sbGJhciBhbmQgY29tcGVuc2F0ZSB0aGUgbGFjayBvZiBhIHZlcnRpY2FsIHNjcm9sbGJhclxyXG4gKiBieSBhZGRpbmcgYW4gZXF1aXZhbGVudCBwYWRkaW5nIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keSwgYW5kIHRvIHJldmVydCB0aGlzIGNoYW5nZS5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsQmFyIHtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUbyBiZSBjYWxsZWQgdG8gaGlkZSBhIHBvdGVudGlhbCB2ZXJ0aWNhbCBzY3JvbGxiYXI6XHJcbiAgICogLSBpZiBhIHNjcm9sbGJhciBpcyB0aGVyZSBhbmQgaGFzIGEgd2lkdGggZ3JlYXRlciB0aGFuIDAsIGFkZHMgc29tZSBjb21wZW5zYXRpb25cclxuICAgKiBwYWRkaW5nIHRvIHRoZSBib2R5IHRvIGtlZXAgdGhlIHNhbWUgbGF5b3V0IGFzIHdoZW4gdGhlIHNjcm9sbGJhciBpcyB0aGVyZVxyXG4gICAqIC0gYWRkcyBvdmVyZmxvdzogaGlkZGVuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGEgY2FsbGJhY2sgdXNlZCB0byByZXZlcnQgdGhlIGNoYW5nZVxyXG4gICAqL1xyXG4gIGhpZGUoKTogU2Nyb2xsYmFyUmV2ZXJ0ZXIge1xyXG4gICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBNYXRoLmFicyh3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGNvbnN0IGJvZHlTdHlsZSA9IGJvZHkuc3R5bGU7XHJcbiAgICBjb25zdCB7b3ZlcmZsb3csIHBhZGRpbmdSaWdodH0gPSBib2R5U3R5bGU7XHJcbiAgICBpZiAoc2Nyb2xsYmFyV2lkdGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGFjdHVhbFBhZGRpbmcgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvZHkpLnBhZGRpbmdSaWdodCk7XHJcbiAgICAgIGJvZHlTdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHthY3R1YWxQYWRkaW5nICsgc2Nyb2xsYmFyV2lkdGh9cHhgO1xyXG4gICAgfVxyXG4gICAgYm9keVN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoc2Nyb2xsYmFyV2lkdGggPiAwKSB7XHJcbiAgICAgICAgYm9keVN0eWxlLnBhZGRpbmdSaWdodCA9IHBhZGRpbmdSaWdodDtcclxuICAgICAgfVxyXG4gICAgICBib2R5U3R5bGUub3ZlcmZsb3cgPSBvdmVyZmxvdztcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==
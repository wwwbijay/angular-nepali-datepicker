import { ContentChild, ContentChildren, Directive, EventEmitter, forwardRef, Inject, Input, Output, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ngbPositioning } from '../util/positioning';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { FOCUSABLE_ELEMENTS_SELECTOR } from '../util/focus-trap';
import * as i0 from "@angular/core";
import * as i1 from "./dropdown-config";
export class NgbNavbar {
}
NgbNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavbar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NgbNavbar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbNavbar, selector: ".navbar", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavbar, decorators: [{
            type: Directive,
            args: [{ selector: '.navbar' }]
        }] });
/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
export class NgbDropdownItem {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._disabled = false;
    }
    set disabled(value) {
        this._disabled = value === '' || value === true; // accept an empty attribute as true
    }
    get disabled() { return this._disabled; }
}
NgbDropdownItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownItem, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbDropdownItem, selector: "[ngbDropdownItem]", inputs: { disabled: "disabled" }, host: { properties: { "class.disabled": "disabled" }, classAttribute: "dropdown-item" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownItem, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbDropdownItem]', host: { 'class': 'dropdown-item', '[class.disabled]': 'disabled' } }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { disabled: [{
                type: Input
            }] } });
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
export class NgbDropdownMenu {
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
        this.nativeElement = _elementRef.nativeElement;
    }
}
NgbDropdownMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownMenu, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownMenu.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbDropdownMenu, selector: "[ngbDropdownMenu]", host: { listeners: { "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Enter": "dropdown.onKeyDown($event)", "keydown.Space": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "class.dropdown-menu": "true", "class.show": "dropdown.isOpen()", "attr.data-popper": "placement" } }, queries: [{ propertyName: "menuItems", predicate: NgbDropdownItem }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownMenu]',
                    host: {
                        '[class.dropdown-menu]': 'true',
                        '[class.show]': 'dropdown.isOpen()',
                        '[attr.data-popper]': 'placement',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Enter)': 'dropdown.onKeyDown($event)',
                        '(keydown.Space)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { menuItems: [{
                type: ContentChildren,
                args: [NgbDropdownItem]
            }] } });
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
export class NgbDropdownAnchor {
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.nativeElement = _elementRef.nativeElement;
    }
}
NgbDropdownAnchor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownAnchor, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownAnchor.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbDropdownAnchor, selector: "[ngbDropdownAnchor]", host: { properties: { "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownAnchor, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbDropdownAnchor]', host: { 'class': 'dropdown-toggle', '[attr.aria-expanded]': 'dropdown.isOpen()' } }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; } });
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
export class NgbDropdownToggle extends NgbDropdownAnchor {
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
}
NgbDropdownToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownToggle, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownToggle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbDropdownToggle, selector: "[ngbDropdownToggle]", host: { listeners: { "click": "dropdown.toggle()", "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdownToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownToggle]',
                    host: {
                        'class': 'dropdown-toggle',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'dropdown.toggle()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; } });
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
export class NgbDropdown {
    constructor(_changeDetector, config, _document, _ngZone, _elementRef, _renderer, ngbNavbar) {
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._closed$ = new Subject();
        this._bodyContainer = null;
        this._positioning = ngbPositioning();
        /**
         * Defines whether or not the dropdown menu is opened initially.
         */
        this._open = false;
        /**
         * An event fired when the dropdown is opened or closed.
         *
         * The event payload is a `boolean`:
         * * `true` - the dropdown was opened
         * * `false` - the dropdown was closed
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.container = config.container;
        this.autoClose = config.autoClose;
        this.display = ngbNavbar ? 'static' : 'dynamic';
        this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positionMenu(); });
    }
    ngAfterContentInit() {
        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
            this._applyPlacementClasses();
            if (this._open) {
                this._setCloseHandlers();
            }
        });
    }
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.firstChange) {
            this._positioning.setOptions({
                hostElement: this._anchor.nativeElement,
                targetElement: this._bodyContainer || this._menu.nativeElement,
                placement: this.placement,
                appendToBody: this.container === 'body',
            });
            this._applyPlacementClasses();
        }
        if (changes.dropdownClass) {
            const { currentValue, previousValue } = changes.dropdownClass;
            this._applyCustomDropdownClass(currentValue, previousValue);
        }
    }
    /**
     * Checks if the dropdown menu is open.
     */
    isOpen() { return this._open; }
    /**
     * Opens the dropdown menu.
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
            if (this._anchor) {
                this._anchor.nativeElement.focus();
                if (this.display === 'dynamic') {
                    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                        this._positioning.createPopper({
                            hostElement: this._anchor.nativeElement,
                            targetElement: this._bodyContainer || this._menu.nativeElement,
                            placement: this.placement,
                            appendToBody: this.container === 'body',
                        });
                        this._applyPlacementClasses();
                    });
                }
            }
        }
    }
    _setCloseHandlers() {
        ngbAutoClose(this._ngZone, this._document, this.autoClose, (source) => {
            this.close();
            if (source === 0 /* ESCAPE */) {
                this._anchor.nativeElement.focus();
            }
        }, this._closed$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], '.dropdown-item,.dropdown-divider');
    }
    /**
     * Closes the dropdown menu.
     */
    close() {
        if (this._open) {
            this._open = false;
            this._positioning.destroy();
            this._resetContainer();
            this._closed$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    ngOnDestroy() {
        this._resetContainer();
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    }
    onKeyDown(event) {
        /* eslint-disable-next-line deprecation/deprecation */
        const key = event.which;
        const itemElements = this._getMenuElements();
        let position = -1;
        let itemElement = null;
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach((item, index) => {
                if (item.contains(event.target)) {
                    itemElement = item;
                }
                if (item === this._document.activeElement) {
                    position = index;
                }
            });
        }
        // closing on Enter / Space
        if (key === Key.Space || key === Key.Enter) {
            if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
                // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                // So we have to register a one-time click handler that will fire after any user defined click handlers
                // to close the dropdown
                fromEvent(itemElement, 'click').pipe(take(1)).subscribe(() => this.close());
            }
            return;
        }
        if (key === Key.Tab) {
            if (event.target && this.isOpen() && this.autoClose) {
                if (this._anchor.nativeElement === event.target) {
                    if (this.container === 'body' && !event.shiftKey) {
                        /* This case is special: user is using [Tab] from the anchor/toggle.
                           User expects the next focusable element in the dropdown menu to get focus.
                           But the menu is not a sibling to anchor/toggle, it is at the end of the body.
                           Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
                           so that browser will focus the proper element (first one focusable in the menu) */
                        this._renderer.setAttribute(this._menu.nativeElement, 'tabindex', '0');
                        this._menu.nativeElement.focus();
                        this._renderer.removeAttribute(this._menu.nativeElement, 'tabindex');
                    }
                    else if (event.shiftKey) {
                        this.close();
                    }
                    return;
                }
                else if (this.container === 'body') {
                    const focusableElements = this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
                    if (event.shiftKey && event.target === focusableElements[0]) {
                        this._anchor.nativeElement.focus();
                        event.preventDefault();
                    }
                    else if (!event.shiftKey && event.target === focusableElements[focusableElements.length - 1]) {
                        this._anchor.nativeElement.focus();
                        this.close();
                    }
                }
                else {
                    fromEvent(event.target, 'focusout').pipe(take(1)).subscribe(({ relatedTarget }) => {
                        if (!this._elementRef.nativeElement.contains(relatedTarget)) {
                            this.close();
                        }
                    });
                }
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || itemElement) {
            this.open();
            if (itemElements.length) {
                switch (key) {
                    case Key.ArrowDown:
                        position = Math.min(position + 1, itemElements.length - 1);
                        break;
                    case Key.ArrowUp:
                        if (this._isDropup() && position === -1) {
                            position = itemElements.length - 1;
                            break;
                        }
                        position = Math.max(position - 1, 0);
                        break;
                    case Key.Home:
                        position = 0;
                        break;
                    case Key.End:
                        position = itemElements.length - 1;
                        break;
                }
                itemElements[position].focus();
            }
            event.preventDefault();
        }
    }
    _isDropup() { return this._elementRef.nativeElement.classList.contains('dropup'); }
    _isEventFromToggle(event) {
        return this._anchor.nativeElement.contains(event.target);
    }
    _getMenuElements() {
        const menu = this._menu;
        if (menu == null) {
            return [];
        }
        return menu.menuItems.filter(item => !item.disabled).map(item => item.elementRef.nativeElement);
    }
    _positionMenu() {
        const menu = this._menu;
        if (this.isOpen() && menu) {
            if (this.display === 'dynamic') {
                this._positioning.update();
                this._applyPlacementClasses();
            }
            else {
                this._applyPlacementClasses(this._getFirstPlacement(this.placement));
            }
        }
    }
    _getFirstPlacement(placement) {
        return Array.isArray(placement) ? placement[0] : placement.split(' ')[0];
    }
    _resetContainer() {
        const renderer = this._renderer;
        if (this._menu) {
            const dropdownElement = this._elementRef.nativeElement;
            const dropdownMenuElement = this._menu.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            const renderer = this._renderer;
            const dropdownMenuElement = this._menu.nativeElement;
            const bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');
            // Override some styles to have the positioning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.setStyle(bodyContainer, 'z-index', '1050');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
        this._applyCustomDropdownClass(this.dropdownClass);
    }
    _applyCustomDropdownClass(newClass, oldClass) {
        const targetElement = this.container === 'body' ? this._bodyContainer : this._elementRef.nativeElement;
        if (targetElement) {
            if (oldClass) {
                this._renderer.removeClass(targetElement, oldClass);
            }
            if (newClass) {
                this._renderer.addClass(targetElement, newClass);
            }
        }
    }
    _applyPlacementClasses(placement) {
        const menu = this._menu;
        if (menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            const renderer = this._renderer;
            const dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            const { nativeElement } = menu;
            if (this.display === 'static') {
                menu.placement = null;
                renderer.setAttribute(nativeElement, 'data-bs-popper', 'static');
            }
            else {
                menu.placement = placement;
                renderer.removeAttribute(nativeElement, 'data-bs-popper');
            }
            /*
            * apply the new placement
            * in case of top use up-arrow or down-arrow otherwise
            */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            const bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    }
}
NgbDropdown.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdown, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NgbDropdownConfig }, { token: DOCUMENT }, { token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NgbNavbar, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdown.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbDropdown, selector: "[ngbDropdown]", inputs: { autoClose: "autoClose", dropdownClass: "dropdownClass", _open: ["open", "_open"], placement: "placement", container: "container", display: "display" }, outputs: { openChange: "openChange" }, host: { properties: { "class.show": "isOpen()" } }, queries: [{ propertyName: "_menu", first: true, predicate: NgbDropdownMenu, descendants: true }, { propertyName: "_anchor", first: true, predicate: NgbDropdownAnchor, descendants: true }], exportAs: ["ngbDropdown"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDropdown, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NgbDropdownConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NgbNavbar, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { _menu: [{
                type: ContentChild,
                args: [NgbDropdownMenu, { static: false }]
            }], _anchor: [{
                type: ContentChild,
                args: [NgbDropdownAnchor, { static: false }]
            }], autoClose: [{
                type: Input
            }], dropdownClass: [{
                type: Input
            }], _open: [{
                type: Input,
                args: ['open']
            }], placement: [{
                type: Input
            }], container: [{
                type: Input
            }], display: [{
                type: Input
            }], openChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZHJvcGRvd24vZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBSU4sUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEMsT0FBTyxFQUE0QixjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsWUFBWSxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUdoQyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBRy9ELE1BQU0sT0FBTyxTQUFTOztzR0FBVCxTQUFTOzBGQUFULFNBQVM7MkZBQVQsU0FBUztrQkFEckIsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUM7O0FBSWhDOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFZMUIsWUFBbUIsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFUOUMsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVMrQixDQUFDO0lBUDFELElBQ0ksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBUSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBRSxvQ0FBb0M7SUFDN0YsQ0FBQztJQUVELElBQUksUUFB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QixLQUFLO3VCQUFDLE1BQU07Z0JBU0osU0FBUztzQkFBakIsS0FBSztnQkFRRyxTQUFTO3NCQUFqQixLQUFLO2dCQVVHLE9BQU87c0JBQWYsS0FBSztnQkFTSSxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPcHRpb25hbCxcclxuICBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7dGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHtQbGFjZW1lbnQsIFBsYWNlbWVudEFycmF5LCBuZ2JQb3NpdGlvbmluZ30gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7bmdiQXV0b0Nsb3NlLCBTT1VSQ0V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuXHJcbmltcG9ydCB7TmdiRHJvcGRvd25Db25maWd9IGZyb20gJy4vZHJvcGRvd24tY29uZmlnJztcclxuaW1wb3J0IHtGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1J9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJy5uYXZiYXInfSlcclxuZXhwb3J0IGNsYXNzIE5nYk5hdmJhciB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB5b3Ugc2hvdWxkIHB1dCBvbiBhIGRyb3Bkb3duIGl0ZW0gdG8gZW5hYmxlIGtleWJvYXJkIG5hdmlnYXRpb24uXHJcbiAqIEFycm93IGtleXMgd2lsbCBtb3ZlIGZvY3VzIGJldHdlZW4gaXRlbXMgbWFya2VkIHdpdGggdGhpcyBkaXJlY3RpdmUuXHJcbiAqXHJcbiAqIEBzaW5jZSA0LjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiRHJvcGRvd25JdGVtXScsIGhvc3Q6IHsnY2xhc3MnOiAnZHJvcGRvd24taXRlbScsICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ319KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25JdGVtIHtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCAnJztcclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gPGFueT52YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IHRydWU7ICAvLyBhY2NlcHQgYW4gZW1wdHkgYXR0cmlidXRlIGFzIHRydWVcclxuICB9XHJcblxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgZHJvcGRvd24gbWVudSBjb250ZW50IGFuZCBkcm9wZG93biBpdGVtcy5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duTWVudV0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsXHJcbiAgICAnW2NsYXNzLnNob3ddJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyxcclxuICAgICdbYXR0ci5kYXRhLXBvcHBlcl0nOiAncGxhY2VtZW50JyxcclxuICAgICcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uQXJyb3dEb3duKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uSG9tZSknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duLkVudGVyKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uU3BhY2UpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5UYWIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5TaGlmdC5UYWIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTWVudSB7XHJcbiAgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnQgfCBudWxsID0gJ2JvdHRvbSc7XHJcbiAgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiRHJvcGRvd25JdGVtKSBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxOZ2JEcm9wZG93bkl0ZW0+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xyXG4gICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIGFuIGVsZW1lbnQgdG8gd2hpY2ggZHJvcGRvd24gbWVudSB3aWxsIGJlIGFuY2hvcmVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGEgc2ltcGxlIHZlcnNpb24gb2YgdGhlIGBOZ2JEcm9wZG93blRvZ2dsZWAgZGlyZWN0aXZlLlxyXG4gKiBJdCBwbGF5cyB0aGUgc2FtZSByb2xlLCBidXQgZG9lc24ndCBsaXN0ZW4gdG8gY2xpY2sgZXZlbnRzIHRvIHRvZ2dsZSBkcm9wZG93biBtZW51IHRodXMgZW5hYmxpbmcgc3VwcG9ydFxyXG4gKiBmb3IgZXZlbnRzIG90aGVyIHRoYW4gY2xpY2suXHJcbiAqXHJcbiAqIEBzaW5jZSAxLjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZShcclxuICAgIHtzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkFuY2hvcl0nLCBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKSd9fSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duQW5jaG9yIHtcclxuICBuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xyXG4gICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIGFuIGVsZW1lbnQgdGhhdCB3aWxsIHRvZ2dsZSBkcm9wZG93biB2aWEgdGhlIGBjbGlja2AgZXZlbnQuXHJcbiAqXHJcbiAqIFlvdSBjYW4gYWxzbyB1c2UgYE5nYkRyb3Bkb3duQW5jaG9yYCBhcyBhbiBhbHRlcm5hdGl2ZS5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duVG9nZ2xlXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsXHJcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknLFxyXG4gICAgJyhjbGljayknOiAnZHJvcGRvd24udG9nZ2xlKCknLFxyXG4gICAgJyhrZXlkb3duLkFycm93VXApJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5BcnJvd0Rvd24pJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uRW5kKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uVGFiKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uU2hpZnQuVGFiKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KSdcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBOZ2JEcm9wZG93bkFuY2hvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd25Ub2dnbGUpfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duVG9nZ2xlIGV4dGVuZHMgTmdiRHJvcGRvd25BbmNob3Ige1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xyXG4gICAgc3VwZXIoZHJvcGRvd24sIGVsZW1lbnRSZWYpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRoYXQgcHJvdmlkZXMgY29udGV4dHVhbCBvdmVybGF5cyBmb3IgZGlzcGxheWluZyBsaXN0cyBvZiBsaW5rcyBhbmQgbW9yZS5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYkRyb3Bkb3duXScsIGV4cG9ydEFzOiAnbmdiRHJvcGRvd24nLCBob3N0OiB7J1tjbGFzcy5zaG93XSc6ICdpc09wZW4oKSd9fSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hdXRvQ2xvc2U6IGJvb2xlYW4gfCBzdHJpbmc7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc3BsYXk6IHN0cmluZztcclxuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfYm9keUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF9wb3NpdGlvbmluZyA9IG5nYlBvc2l0aW9uaW5nKCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51LCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgX21lbnU6IE5nYkRyb3Bkb3duTWVudTtcclxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duQW5jaG9yLCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgX2FuY2hvcjogTmdiRHJvcGRvd25BbmNob3I7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgYmUgY2xvc2VkIHdoZW4gY2xpY2tpbmcgb25lIG9mIGRyb3Bkb3duIGl0ZW1zIG9yIHByZXNzaW5nIEVTQy5cclxuICAgKlxyXG4gICAqICogYHRydWVgIC0gdGhlIGRyb3Bkb3duIHdpbGwgY2xvc2Ugb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgKG1lbnUpIGNsaWNrcy5cclxuICAgKiAqIGBmYWxzZWAgLSB0aGUgZHJvcGRvd24gY2FuIG9ubHkgYmUgY2xvc2VkIG1hbnVhbGx5IHZpYSBgY2xvc2UoKWAgb3IgYHRvZ2dsZSgpYCBtZXRob2RzLlxyXG4gICAqICogYFwiaW5zaWRlXCJgIC0gdGhlIGRyb3Bkb3duIHdpbGwgY2xvc2Ugb24gaW5zaWRlIG1lbnUgY2xpY2tzLCBidXQgbm90IG91dHNpZGUgY2xpY2tzLlxyXG4gICAqICogYFwib3V0c2lkZVwiYCAtIHRoZSBkcm9wZG93biB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2tzIGFuZCBub3Qgb24gbWVudSBjbGlja3MuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIGNsYXNzIHRoYXQgaXMgYXBwbGllZCBvbmx5IHRvIHRoZSBgbmdiRHJvcGRvd25NZW51YCBwYXJlbnQgZWxlbWVudC5cclxuICAgKiAqIEluIGNhc2Ugb2YgdGhlIGlubGluZSBkcm9wZG93biBpdCB3aWxsIGJlIHRoZSBgPGRpdiBuZ2JEcm9wZG93bj5gXHJcbiAgICogKiBJbiBjYXNlIG9mIHRoZSBkcm9wZG93biB3aXRoICBgY29udGFpbmVyPVwiYm9keVwiYCBpdCB3aWxsIGJlIHRoZSBgPGRpdiBjbGFzcz1cImRyb3Bkb3duXCI+YCBhdHRhY2hlZCB0byB0aGUgYDxib2R5PmBcclxuICAgKlxyXG4gICAqIFVzZWZ1bCBtYWlubHkgd2hlbiBkcm9wZG93biBpcyBhdHRhY2hlZCB0byB0aGUgYm9keS5cclxuICAgKiBJZiB0aGUgZHJvcGRvd24gaXMgaW5saW5lIGp1c3QgdXNlIGA8ZGl2IG5nYkRyb3Bkb3duIGNsYXNzPVwiY3VzdG9tLWNsYXNzXCI+YCBpbnN0ZWFkLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDkuMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJvcGRvd25DbGFzczogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBkcm9wZG93biBtZW51IGlzIG9wZW5lZCBpbml0aWFsbHkuXHJcbiAgICovXHJcbiAgQElucHV0KCdvcGVuJykgX29wZW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIGRyb3Bkb3duLCBhbW9uZyB0aGUgW3Bvc3NpYmxlIHZhbHVlc10oIy9ndWlkZXMvcG9zaXRpb25pbmcjYXBpKS5cclxuICAgKlxyXG4gICAqIFRoZSBkZWZhdWx0IG9yZGVyIG9mIHByZWZlcmVuY2UgaXMgYFwiYm90dG9tLXN0YXJ0IGJvdHRvbS1lbmQgdG9wLXN0YXJ0IHRvcC1lbmRcImBcclxuICAgKlxyXG4gICAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xyXG5cclxuICAvKipcclxuICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgZHJvcGRvd24gc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXHJcbiAgKlxyXG4gICogQHNpbmNlIDQuMS4wXHJcbiAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI6IG51bGwgfCAnYm9keSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBvciBkaXNhYmxlIHRoZSBkeW5hbWljIHBvc2l0aW9uaW5nLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBkeW5hbWljIHVubGVzcyB0aGUgZHJvcGRvd24gaXMgdXNlZFxyXG4gICAqIGluc2lkZSBhIEJvb3RzdHJhcCBuYXZiYXIuIElmIHlvdSBuZWVkIGN1c3RvbSBwbGFjZW1lbnQgZm9yIGEgZHJvcGRvd24gaW4gYSBuYXZiYXIsIHNldCBpdCB0b1xyXG4gICAqIGR5bmFtaWMgZXhwbGljaXRseS4gU2VlIHRoZSBbcG9zaXRpb25pbmcgb2YgZHJvcGRvd25dKCMvcG9zaXRpb25pbmcjZHJvcGRvd24pXHJcbiAgICogYW5kIHRoZSBbbmF2YmFyIGRlbW9dKC8jL2NvbXBvbmVudHMvZHJvcGRvd24vZXhhbXBsZXMjbmF2YmFyKSBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDQuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzcGxheTogJ2R5bmFtaWMnIHwgJ3N0YXRpYyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCBvciBjbG9zZWQuXHJcbiAgICpcclxuICAgKiBUaGUgZXZlbnQgcGF5bG9hZCBpcyBhIGBib29sZWFuYDpcclxuICAgKiAqIGB0cnVlYCAtIHRoZSBkcm9wZG93biB3YXMgb3BlbmVkXHJcbiAgICogKiBgZmFsc2VgIC0gdGhlIGRyb3Bkb3duIHdhcyBjbG9zZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiwgY29uZmlnOiBOZ2JEcm9wZG93bkNvbmZpZywgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICBAT3B0aW9uYWwoKSBuZ2JOYXZiYXI6IE5nYk5hdmJhcikge1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xyXG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xyXG5cclxuICAgIHRoaXMuZGlzcGxheSA9IG5nYk5hdmJhciA/ICdzdGF0aWMnIDogJ2R5bmFtaWMnO1xyXG5cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMuX3Bvc2l0aW9uTWVudSgpOyB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2FwcGx5UGxhY2VtZW50Q2xhc3NlcygpO1xyXG4gICAgICBpZiAodGhpcy5fb3Blbikge1xyXG4gICAgICAgIHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5jb250YWluZXIgJiYgdGhpcy5fb3Blbikge1xyXG4gICAgICB0aGlzLl9hcHBseUNvbnRhaW5lcih0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXMucGxhY2VtZW50ICYmICFjaGFuZ2VzLnBsYWNlbWVudC5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbmluZy5zZXRPcHRpb25zKHtcclxuICAgICAgICBob3N0RWxlbWVudDogdGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudDogdGhpcy5fYm9keUNvbnRhaW5lciB8fCB0aGlzLl9tZW51Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICBhcHBlbmRUb0JvZHk6IHRoaXMuY29udGFpbmVyID09PSAnYm9keScsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5kcm9wZG93bkNsYXNzKSB7XHJcbiAgICAgIGNvbnN0IHtjdXJyZW50VmFsdWUsIHByZXZpb3VzVmFsdWV9ID0gY2hhbmdlcy5kcm9wZG93bkNsYXNzO1xyXG4gICAgICB0aGlzLl9hcHBseUN1c3RvbURyb3Bkb3duQ2xhc3MoY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGUgZHJvcGRvd24gbWVudSBpcyBvcGVuLlxyXG4gICAqL1xyXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX29wZW47IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgdGhlIGRyb3Bkb3duIG1lbnUuXHJcbiAgICovXHJcbiAgb3BlbigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fb3Blbikge1xyXG4gICAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fYXBwbHlDb250YWluZXIodGhpcy5jb250YWluZXIpO1xyXG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh0cnVlKTtcclxuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xyXG4gICAgICBpZiAodGhpcy5fYW5jaG9yKSB7XHJcbiAgICAgICAgdGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5ID09PSAnZHluYW1pYycpIHtcclxuICAgICAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uaW5nLmNyZWF0ZVBvcHBlcih7XHJcbiAgICAgICAgICAgICAgaG9zdEVsZW1lbnQ6IHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IHRoaXMuX2JvZHlDb250YWluZXIgfHwgdGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICAgICAgYXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldENsb3NlSGFuZGxlcnMoKSB7XHJcbiAgICBuZ2JBdXRvQ2xvc2UoXHJcbiAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsXHJcbiAgICAgICAgKHNvdXJjZTogU09VUkNFKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICBpZiAoc291cmNlID09PSBTT1VSQ0UuRVNDQVBFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLl9jbG9zZWQkLCB0aGlzLl9tZW51ID8gW3RoaXMuX21lbnUubmF0aXZlRWxlbWVudF0gOiBbXSwgdGhpcy5fYW5jaG9yID8gW3RoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50XSA6IFtdLFxyXG4gICAgICAgICcuZHJvcGRvd24taXRlbSwuZHJvcGRvd24tZGl2aWRlcicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBkcm9wZG93biBtZW51LlxyXG4gICAqL1xyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX29wZW4pIHtcclxuICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbmluZy5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX3Jlc2V0Q29udGFpbmVyKCk7XHJcbiAgICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xyXG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyB0aGUgZHJvcGRvd24gbWVudS5cclxuICAgKi9cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fcmVzZXRDb250YWluZXIoKTtcclxuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb24gKi9cclxuICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xyXG4gICAgY29uc3QgaXRlbUVsZW1lbnRzID0gdGhpcy5fZ2V0TWVudUVsZW1lbnRzKCk7XHJcblxyXG4gICAgbGV0IHBvc2l0aW9uID0gLTE7XHJcbiAgICBsZXQgaXRlbUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICBjb25zdCBpc0V2ZW50RnJvbVRvZ2dsZSA9IHRoaXMuX2lzRXZlbnRGcm9tVG9nZ2xlKGV2ZW50KTtcclxuXHJcbiAgICBpZiAoIWlzRXZlbnRGcm9tVG9nZ2xlICYmIGl0ZW1FbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgaXRlbUVsZW1lbnRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0ZW0uY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgaXRlbUVsZW1lbnQgPSBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbSA9PT0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgcG9zaXRpb24gPSBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsb3Npbmcgb24gRW50ZXIgLyBTcGFjZVxyXG4gICAgaWYgKGtleSA9PT0gS2V5LlNwYWNlIHx8IGtleSA9PT0gS2V5LkVudGVyKSB7XHJcbiAgICAgIGlmIChpdGVtRWxlbWVudCAmJiAodGhpcy5hdXRvQ2xvc2UgPT09IHRydWUgfHwgdGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnKSkge1xyXG4gICAgICAgIC8vIEl0ZW0gaXMgZWl0aGVyIGEgYnV0dG9uIG9yIGEgbGluaywgc28gY2xpY2sgd2lsbCBiZSB0cmlnZ2VyZWQgYnkgdGhlIGJyb3dzZXIgb24gRW50ZXIgb3IgU3BhY2UuXHJcbiAgICAgICAgLy8gU28gd2UgaGF2ZSB0byByZWdpc3RlciBhIG9uZS10aW1lIGNsaWNrIGhhbmRsZXIgdGhhdCB3aWxsIGZpcmUgYWZ0ZXIgYW55IHVzZXIgZGVmaW5lZCBjbGljayBoYW5kbGVyc1xyXG4gICAgICAgIC8vIHRvIGNsb3NlIHRoZSBkcm9wZG93blxyXG4gICAgICAgIGZyb21FdmVudChpdGVtRWxlbWVudCwgJ2NsaWNrJykucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGtleSA9PT0gS2V5LlRhYikge1xyXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5hdXRvQ2xvc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgIC8qIFRoaXMgY2FzZSBpcyBzcGVjaWFsOiB1c2VyIGlzIHVzaW5nIFtUYWJdIGZyb20gdGhlIGFuY2hvci90b2dnbGUuXHJcbiAgICAgICAgICAgICAgIFVzZXIgZXhwZWN0cyB0aGUgbmV4dCBmb2N1c2FibGUgZWxlbWVudCBpbiB0aGUgZHJvcGRvd24gbWVudSB0byBnZXQgZm9jdXMuXHJcbiAgICAgICAgICAgICAgIEJ1dCB0aGUgbWVudSBpcyBub3QgYSBzaWJsaW5nIHRvIGFuY2hvci90b2dnbGUsIGl0IGlzIGF0IHRoZSBlbmQgb2YgdGhlIGJvZHkuXHJcbiAgICAgICAgICAgICAgIFRyaWNrIGlzIHRvIHN5bmNocm9ub3VzbHkgZm9jdXMgdGhlIG1lbnUgZWxlbWVudCwgYW5kIGxldCB0aGUgW2tleWRvd24uVGFiXSBnb1xyXG4gICAgICAgICAgICAgICBzbyB0aGF0IGJyb3dzZXIgd2lsbCBmb2N1cyB0aGUgcHJvcGVyIGVsZW1lbnQgKGZpcnN0IG9uZSBmb2N1c2FibGUgaW4gdGhlIG1lbnUpICovXHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9tZW51Lm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX21lbnUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSB0aGlzLl9tZW51Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IpO1xyXG4gICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LnRhcmdldCA9PT0gZm9jdXNhYmxlRWxlbWVudHNbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LnRhcmdldCA9PT0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4oZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LCAnZm9jdXNvdXQnKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoe3JlbGF0ZWRUYXJnZXR9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHJlbGF0ZWRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG9wZW5pbmcgLyBuYXZpZ2F0aW5nXHJcbiAgICBpZiAoaXNFdmVudEZyb21Ub2dnbGUgfHwgaXRlbUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5vcGVuKCk7XHJcblxyXG4gICAgICBpZiAoaXRlbUVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4ocG9zaXRpb24gKyAxLCBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRHJvcHVwKCkgJiYgcG9zaXRpb24gPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KHBvc2l0aW9uIC0gMSwgMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBLZXkuSG9tZTpcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgS2V5LkVuZDpcclxuICAgICAgICAgICAgcG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW1FbGVtZW50c1twb3NpdGlvbl0uZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaXNEcm9wdXAoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wdXAnKTsgfVxyXG5cclxuICBwcml2YXRlIF9pc0V2ZW50RnJvbVRvZ2dsZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRNZW51RWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICBjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcclxuICAgIGlmIChtZW51ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lbnUubWVudUl0ZW1zLmZpbHRlcihpdGVtID0+ICFpdGVtLmRpc2FibGVkKS5tYXAoaXRlbSA9PiBpdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wb3NpdGlvbk1lbnUoKSB7XHJcbiAgICBjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpICYmIG1lbnUpIHtcclxuICAgICAgaWYgKHRoaXMuZGlzcGxheSA9PT0gJ2R5bmFtaWMnKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX2dldEZpcnN0UGxhY2VtZW50KHRoaXMucGxhY2VtZW50KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEZpcnN0UGxhY2VtZW50KHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkpOiBQbGFjZW1lbnQge1xyXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGxhY2VtZW50KSA/IHBsYWNlbWVudFswXSA6IHBsYWNlbWVudC5zcGxpdCgnICcpWzBdIGFzIFBsYWNlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Jlc2V0Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcclxuICAgIGlmICh0aGlzLl9tZW51KSB7XHJcbiAgICAgIGNvbnN0IGRyb3Bkb3duRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgY29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGRyb3Bkb3duRWxlbWVudCwgZHJvcGRvd25NZW51RWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fYm9keUNvbnRhaW5lcikge1xyXG4gICAgICByZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLl9kb2N1bWVudC5ib2R5LCB0aGlzLl9ib2R5Q29udGFpbmVyKTtcclxuICAgICAgdGhpcy5fYm9keUNvbnRhaW5lciA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseUNvbnRhaW5lcihjb250YWluZXI6IG51bGwgfCAnYm9keScgPSBudWxsKSB7XHJcbiAgICB0aGlzLl9yZXNldENvbnRhaW5lcigpO1xyXG4gICAgaWYgKGNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XHJcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XHJcbiAgICAgIGNvbnN0IGRyb3Bkb3duTWVudUVsZW1lbnQgPSB0aGlzLl9tZW51Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IGJvZHlDb250YWluZXIgPSB0aGlzLl9ib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lciB8fCByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgIC8vIE92ZXJyaWRlIHNvbWUgc3R5bGVzIHRvIGhhdmUgdGhlIHBvc2l0aW9uaW5nIHdvcmtpbmdcclxuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoYm9keUNvbnRhaW5lciwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XHJcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICdwb3NpdGlvbicsICdzdGF0aWMnKTtcclxuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoYm9keUNvbnRhaW5lciwgJ3otaW5kZXgnLCAnMTA1MCcpO1xyXG5cclxuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoYm9keUNvbnRhaW5lciwgZHJvcGRvd25NZW51RWxlbWVudCk7XHJcbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2RvY3VtZW50LmJvZHksIGJvZHlDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2FwcGx5Q3VzdG9tRHJvcGRvd25DbGFzcyh0aGlzLmRyb3Bkb3duQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXBwbHlDdXN0b21Ecm9wZG93bkNsYXNzKG5ld0NsYXNzOiBzdHJpbmcsIG9sZENsYXNzPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gdGhpcy5jb250YWluZXIgPT09ICdib2R5JyA/IHRoaXMuX2JvZHlDb250YWluZXIgOiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICBpZiAob2xkQ2xhc3MpIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0YXJnZXRFbGVtZW50LCBvbGRDbGFzcyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld0NsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGFyZ2V0RWxlbWVudCwgbmV3Q2xhc3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseVBsYWNlbWVudENsYXNzZXMocGxhY2VtZW50PzogUGxhY2VtZW50IHwgbnVsbCkge1xyXG4gICAgY29uc3QgbWVudSA9IHRoaXMuX21lbnU7XHJcbiAgICBpZiAobWVudSkge1xyXG4gICAgICBpZiAoIXBsYWNlbWVudCkge1xyXG4gICAgICAgIHBsYWNlbWVudCA9IHRoaXMuX2dldEZpcnN0UGxhY2VtZW50KHRoaXMucGxhY2VtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcclxuICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHBsYWNlbWVudCBjbGFzc2VzXHJcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duRWxlbWVudCwgJ2Ryb3B1cCcpO1xyXG4gICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhkcm9wZG93bkVsZW1lbnQsICdkcm9wZG93bicpO1xyXG4gICAgICBjb25zdCB7bmF0aXZlRWxlbWVudH0gPSBtZW51O1xyXG4gICAgICBpZiAodGhpcy5kaXNwbGF5ID09PSAnc3RhdGljJykge1xyXG4gICAgICAgIG1lbnUucGxhY2VtZW50ID0gbnVsbDtcclxuICAgICAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUobmF0aXZlRWxlbWVudCwgJ2RhdGEtYnMtcG9wcGVyJywgJ3N0YXRpYycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1lbnUucGxhY2VtZW50ID0gcGxhY2VtZW50O1xyXG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShuYXRpdmVFbGVtZW50LCAnZGF0YS1icy1wb3BwZXInKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLypcclxuICAgICAgKiBhcHBseSB0aGUgbmV3IHBsYWNlbWVudFxyXG4gICAgICAqIGluIGNhc2Ugb2YgdG9wIHVzZSB1cC1hcnJvdyBvciBkb3duLWFycm93IG90aGVyd2lzZVxyXG4gICAgICAqL1xyXG4gICAgICBjb25zdCBkcm9wZG93bkNsYXNzID0gcGxhY2VtZW50LnNlYXJjaCgnXnRvcCcpICE9PSAtMSA/ICdkcm9wdXAnIDogJ2Ryb3Bkb3duJztcclxuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZHJvcGRvd25FbGVtZW50LCBkcm9wZG93bkNsYXNzKTtcclxuXHJcbiAgICAgIGNvbnN0IGJvZHlDb250YWluZXIgPSB0aGlzLl9ib2R5Q29udGFpbmVyO1xyXG4gICAgICBpZiAoYm9keUNvbnRhaW5lcikge1xyXG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHlDb250YWluZXIsICdkcm9wdXAnKTtcclxuICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5Q29udGFpbmVyLCAnZHJvcGRvd24nKTtcclxuICAgICAgICByZW5kZXJlci5hZGRDbGFzcyhib2R5Q29udGFpbmVyLCBkcm9wZG93bkNsYXNzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
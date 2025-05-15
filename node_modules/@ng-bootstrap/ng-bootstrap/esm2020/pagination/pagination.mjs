import { Component, ContentChild, Directive, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import * as i0 from "@angular/core";
import * as i1 from "./pagination-config";
import * as i2 from "@angular/common";
/**
 * A directive to match the 'ellipsis' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationEllipsis {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationEllipsis.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationEllipsis, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationEllipsis.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPaginationEllipsis, selector: "ng-template[ngbPaginationEllipsis]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationEllipsis, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationEllipsis]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'first' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationFirst {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationFirst.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationFirst, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationFirst.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPaginationFirst, selector: "ng-template[ngbPaginationFirst]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationFirst, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationFirst]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'last' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationLast {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationLast.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationLast, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationLast.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPaginationLast, selector: "ng-template[ngbPaginationLast]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationLast, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationLast]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'next' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationNext {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationNext, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationNext.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPaginationNext, selector: "ng-template[ngbPaginationNext]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationNext, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNext]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the page 'number' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationNumber {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNumber.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationNumber, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationNumber.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPaginationNumber, selector: "ng-template[ngbPaginationNumber]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationNumber, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNumber]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'previous' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationPrevious {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPrevious.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationPrevious, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationPrevious.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPaginationPrevious, selector: "ng-template[ngbPaginationPrevious]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationPrevious, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPrevious]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'pages' whole content
 *
 * @since 9.1.0
 */
export class NgbPaginationPages {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPages.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationPages, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationPages.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbPaginationPages, selector: "ng-template[ngbPaginationPages]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationPages, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPages]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
export class NgbPagination {
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  The current page.
         *
         *  Page numbers start with `1`.
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
         *
         *  Event payload is the number of the newly selected page.
         *
         *  Page numbers start with `1`.
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    hasPrevious() { return this.page > 1; }
    hasNext() { return this.page < this.pageCount; }
    nextDisabled() { return !this.hasNext() || this.disabled; }
    previousDisabled() { return !this.hasPrevious() || this.disabled; }
    selectPage(pageNumber) { this._updatePages(pageNumber); }
    ngOnChanges(changes) { this._updatePages(this.page); }
    isEllipsis(pageNumber) { return pageNumber === -1; }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                // The first page will always be included. If the displayed range
                // starts after the third page, then add ellipsis. But if the range
                // starts on the third page, then add the second page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (start > 2) {
                    this.pages.unshift(-1);
                }
                else if (start === 2) {
                    this.pages.unshift(2);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                // The last page will always be included. If the displayed range
                // ends before the third-last page, then add ellipsis. But if the range
                // ends on third-last page, then add the second-last page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (end < (this.pageCount - 2)) {
                    this.pages.push(-1);
                }
                else if (end === (this.pageCount - 2)) {
                    this.pages.push(this.pageCount - 1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    _applyRotation() {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    _applyPagination() {
        let page = Math.ceil(this.page / this.maxSize) - 1;
        let start = page * this.maxSize;
        let end = start + this.maxSize;
        return [start, end];
    }
    _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            let start = 0;
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
NgbPagination.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPagination, deps: [{ token: i1.NgbPaginationConfig }], target: i0.ɵɵFactoryTarget.Component });
NgbPagination.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbPagination, selector: "ngb-pagination", inputs: { disabled: "disabled", boundaryLinks: "boundaryLinks", directionLinks: "directionLinks", ellipses: "ellipses", rotate: "rotate", collectionSize: "collectionSize", maxSize: "maxSize", page: "page", pageSize: "pageSize", size: "size" }, outputs: { pageChange: "pageChange" }, host: { attributes: { "role": "navigation" } }, queries: [{ propertyName: "tplEllipsis", first: true, predicate: NgbPaginationEllipsis, descendants: true }, { propertyName: "tplFirst", first: true, predicate: NgbPaginationFirst, descendants: true }, { propertyName: "tplLast", first: true, predicate: NgbPaginationLast, descendants: true }, { propertyName: "tplNext", first: true, predicate: NgbPaginationNext, descendants: true }, { propertyName: "tplNumber", first: true, predicate: NgbPaginationNumber, descendants: true }, { propertyName: "tplPrevious", first: true, predicate: NgbPaginationPrevious, descendants: true }, { propertyName: "tplPages", first: true, predicate: NgbPaginationPages, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
    <ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
    <ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
    <ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
    <ng-template #ellipsis>...</ng-template>
    <ng-template #defaultNumber let-page let-currentPage="currentPage">
      {{ page }}
      <span *ngIf="page === currentPage" class="visually-hidden">(current)</span>
    </ng-template>
    <ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled" [attr.aria-current]="(pageNumber === page ? 'page' : null)">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
          <ng-template [ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
                      [ngTemplateOutletContext]="{disabled: true, currentPage: page}"></ng-template>
        </a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="selectPage(pageNumber); $event.preventDefault()"
          [attr.tabindex]="disabled ? '-1' : null" [attr.aria-disabled]="disabled ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
                      [ngTemplateOutletContext]="{disabled: disabled, $implicit: pageNumber, currentPage: page}"></ng-template>
        </a>
      </li>
    </ng-template>
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="First" i18n-aria-label="@@ngb.pagination.first-aria" class="page-link" href
          (click)="selectPage(1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplFirst?.templateRef || first"
                       [ngTemplateOutletContext]="{disabled: previousDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="Previous" i18n-aria-label="@@ngb.pagination.previous-aria" class="page-link" href
          (click)="selectPage(page-1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplPrevious?.templateRef || previous"
                       [ngTemplateOutletContext]="{disabled: previousDisabled()}"></ng-template>
        </a>
      </li>
      <ng-template
        [ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
        [ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
      >
      </ng-template>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Next" i18n-aria-label="@@ngb.pagination.next-aria" class="page-link" href
          (click)="selectPage(page+1); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNext?.templateRef || next"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Last" i18n-aria-label="@@ngb.pagination.last-aria" class="page-link" href
          (click)="selectPage(pageCount); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplLast?.templateRef || last"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>
    </ul>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-pagination',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { 'role': 'navigation' },
                    template: `
    <ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
    <ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
    <ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
    <ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
    <ng-template #ellipsis>...</ng-template>
    <ng-template #defaultNumber let-page let-currentPage="currentPage">
      {{ page }}
      <span *ngIf="page === currentPage" class="visually-hidden">(current)</span>
    </ng-template>
    <ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled" [attr.aria-current]="(pageNumber === page ? 'page' : null)">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
          <ng-template [ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
                      [ngTemplateOutletContext]="{disabled: true, currentPage: page}"></ng-template>
        </a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="selectPage(pageNumber); $event.preventDefault()"
          [attr.tabindex]="disabled ? '-1' : null" [attr.aria-disabled]="disabled ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
                      [ngTemplateOutletContext]="{disabled: disabled, $implicit: pageNumber, currentPage: page}"></ng-template>
        </a>
      </li>
    </ng-template>
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="First" i18n-aria-label="@@ngb.pagination.first-aria" class="page-link" href
          (click)="selectPage(1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplFirst?.templateRef || first"
                       [ngTemplateOutletContext]="{disabled: previousDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="Previous" i18n-aria-label="@@ngb.pagination.previous-aria" class="page-link" href
          (click)="selectPage(page-1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplPrevious?.templateRef || previous"
                       [ngTemplateOutletContext]="{disabled: previousDisabled()}"></ng-template>
        </a>
      </li>
      <ng-template
        [ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
        [ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
      >
      </ng-template>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Next" i18n-aria-label="@@ngb.pagination.next-aria" class="page-link" href
          (click)="selectPage(page+1); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNext?.templateRef || next"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Last" i18n-aria-label="@@ngb.pagination.last-aria" class="page-link" href
          (click)="selectPage(pageCount); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplLast?.templateRef || last"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>
    </ul>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbPaginationConfig }]; }, propDecorators: { tplEllipsis: [{
                type: ContentChild,
                args: [NgbPaginationEllipsis, { static: false }]
            }], tplFirst: [{
                type: ContentChild,
                args: [NgbPaginationFirst, { static: false }]
            }], tplLast: [{
                type: ContentChild,
                args: [NgbPaginationLast, { static: false }]
            }], tplNext: [{
                type: ContentChild,
                args: [NgbPaginationNext, { static: false }]
            }], tplNumber: [{
                type: ContentChild,
                args: [NgbPaginationNumber, { static: false }]
            }], tplPrevious: [{
                type: ContentChild,
                args: [NgbPaginationPrevious, { static: false }]
            }], tplPages: [{
                type: ContentChild,
                args: [NgbPaginationPages, { static: false }]
            }], disabled: [{
                type: Input
            }], boundaryLinks: [{
                type: Input
            }], directionLinks: [{
                type: Input
            }], ellipses: [{
                type: Input
            }], rotate: [{
                type: Input
            }], collectionSize: [{
                type: Input
            }], maxSize: [{
                type: Input
            }], page: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], size: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdpbmF0aW9uL3BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLHVCQUF1QixFQUd4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7OztBQWlFdkQ7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBbUIsV0FBa0Q7UUFBbEQsZ0JBQVcsR0FBWCxXQUFXLENBQXVDO0lBQUcsQ0FBQzs7a0hBRDlELHFCQUFxQjtzR0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFNBQVM7bUJBQUMsRUFBQyxRQUFRLEVBQUUsb0NBQW9DLEVBQUM7O0FBSzNEOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7OytHQUQ5RCxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFpQyxFQUFDOztBQUt4RDs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFtQixXQUFrRDtRQUFsRCxnQkFBVyxHQUFYLFdBQVcsQ0FBdUM7SUFBRyxDQUFDOzs4R0FEOUQsaUJBQWlCO2tHQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxnQ0FBZ0MsRUFBQzs7QUFLdkQ7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFBbUIsV0FBa0Q7UUFBbEQsZ0JBQVcsR0FB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QkFBQyxpQkFBaUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBQ0UsT0FBTztzQkFBeEQsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBQ0ksU0FBUztzQkFBNUQsWUFBWTt1QkFBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBQ0ksV0FBVztzQkFBaEUsWUFBWTt1QkFBQyxxQkFBcUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBQ0QsUUFBUTtzQkFBMUQsWUFBWTt1QkFBQyxrQkFBa0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBS3hDLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBT0csTUFBTTtzQkFBZCxLQUFLO2dCQVNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBS0csT0FBTztzQkFBZixLQUFLO2dCQU9HLElBQUk7c0JBQVosS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQVNJLFVBQVU7c0JBQW5CLE1BQU07Z0JBT0UsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JQYWdpbmF0aW9uQ29uZmlnfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbnRleHQgZm9yIHRoZVxyXG4gKiAqIGBOZ2JQYWdpbmF0aW9uRmlyc3RgXHJcbiAqICogYE5nYlBhZ2luYXRpb25QcmV2aW91c2BcclxuICogKiBgTmdiUGFnaW5hdGlvbk5leHRgXHJcbiAqICogYE5nYlBhZ2luYXRpb25MYXN0YFxyXG4gKiAqIGBOZ2JQYWdpbmF0aW9uRWxsaXBzaXNgXHJcbiAqICogYE5nYlBhZ2luYXRpb25QYWdlc2BcclxuICpcclxuICogbGluayB0ZW1wbGF0ZXMgaW4gY2FzZSB5b3Ugd2FudCB0byBvdmVycmlkZSBvbmUuXHJcbiAqXHJcbiAqIEBzaW5jZSA0LjEuMFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIFBhZ2UgbnVtYmVyIGRpc3BsYXllZCBieSB0aGUgY3VycmVudCBsaW5rLlxyXG4gICAqL1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgbGluayBpcyBkaXNhYmxlZC5cclxuICAgKi9cclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgY29udGV4dCBmb3IgdGhlIGBOZ2JQYWdpbmF0aW9uTnVtYmVyYCBsaW5rIHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgb25lLlxyXG4gKlxyXG4gKiBFeHRlbmRzIGBOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHRgLlxyXG4gKlxyXG4gKiBAc2luY2UgNC4xLjBcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFnaW5hdGlvbk51bWJlckNvbnRleHQgZXh0ZW5kcyBOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBwYWdlIG51bWJlciwgZGlzcGxheWVkIGJ5IHRoZSBjdXJyZW50IHBhZ2UgbGluay5cclxuICAgKi9cclxuICAkaW1wbGljaXQ6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgY29udGV4dCBmb3IgdGhlIGBOZ2JQYWdpbmF0aW9uUGFnZXNgIHBhZ2VzIHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGVcclxuICogdGhlIHdheSBhbGwgcGFnZXMgYXJlIGRpc3BsYXllZC5cclxuICpcclxuICogQHNpbmNlIDkuMS4wXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhZ2luYXRpb25QYWdlc0NvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBudW1iZXIuXHJcbiAgICovXHJcbiAgJGltcGxpY2l0OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgcGFnaW5hdGlvbiBpcyBkaXNhYmxlZC5cclxuICAgKi9cclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFnZXMgbnVtYmVycyB0aGF0IHNob3VsZCBiZSByZW5kZXJlZCBzdGFydGluZyB3aXRoIDEuXHJcbiAgICovXHJcbiAgcGFnZXM6IG51bWJlcltdO1xyXG59XHJcblxyXG4vKipcclxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICdlbGxpcHNpcycgbGluayB0ZW1wbGF0ZVxyXG4gKlxyXG4gKiBAc2luY2UgNC4xLjBcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkVsbGlwc2lzXSd9KVxyXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbkVsbGlwc2lzIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ2ZpcnN0JyBsaW5rIHRlbXBsYXRlXHJcbiAqXHJcbiAqIEBzaW5jZSA0LjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uRmlyc3RdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uRmlyc3Qge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnbGFzdCcgbGluayB0ZW1wbGF0ZVxyXG4gKlxyXG4gKiBAc2luY2UgNC4xLjBcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkxhc3RdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTGFzdCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICduZXh0JyBsaW5rIHRlbXBsYXRlXHJcbiAqXHJcbiAqIEBzaW5jZSA0LjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTmV4dF0nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25OZXh0IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgcGFnZSAnbnVtYmVyJyBsaW5rIHRlbXBsYXRlXHJcbiAqXHJcbiAqIEBzaW5jZSA0LjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTnVtYmVyXSd9KVxyXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbk51bWJlciB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTnVtYmVyQ29udGV4dD4pIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ3ByZXZpb3VzJyBsaW5rIHRlbXBsYXRlXHJcbiAqXHJcbiAqIEBzaW5jZSA0LjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uUHJldmlvdXNdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uUHJldmlvdXMge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAncGFnZXMnIHdob2xlIGNvbnRlbnRcclxuICpcclxuICogQHNpbmNlIDkuMS4wXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhZ2luYXRpb25QYWdlc10nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25QYWdlcyB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uUGFnZXNDb250ZXh0Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgcGFnZSBudW1iZXJzIGFuZCBhbGxvd3MgdG8gY3VzdG9taXplIHRoZW0gaW4gc2V2ZXJhbCB3YXlzLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItcGFnaW5hdGlvbicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDogeydyb2xlJzogJ25hdmlnYXRpb24nfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNmaXJzdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdFwiPiZsYXF1bzsmbGFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgI3ByZXZpb3VzPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzXCI+JmxhcXVvOzwvc3Bhbj48L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlICNuZXh0PjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLm5leHRcIj4mcmFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgI2xhc3Q+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdFwiPiZyYXF1bzsmcmFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgI2VsbGlwc2lzPi4uLjwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHROdW1iZXIgbGV0LXBhZ2UgbGV0LWN1cnJlbnRQYWdlPVwiY3VycmVudFBhZ2VcIj5cclxuICAgICAge3sgcGFnZSB9fVxyXG4gICAgICA8c3BhbiAqbmdJZj1cInBhZ2UgPT09IGN1cnJlbnRQYWdlXCIgY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj4oY3VycmVudCk8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0UGFnZXMgbGV0LXBhZ2UgbGV0LXBhZ2VzPVwicGFnZXNcIiBsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHBhZ2VOdW1iZXIgb2YgcGFnZXNcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5hY3RpdmVdPVwicGFnZU51bWJlciA9PT0gcGFnZVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRWxsaXBzaXMocGFnZU51bWJlcikgfHwgZGlzYWJsZWRcIiBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiKHBhZ2VOdW1iZXIgPT09IHBhZ2UgPyAncGFnZScgOiBudWxsKVwiPlxyXG4gICAgICAgIDxhICpuZ0lmPVwiaXNFbGxpcHNpcyhwYWdlTnVtYmVyKVwiIGNsYXNzPVwicGFnZS1saW5rXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtZGlzYWJsZWQ9XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsRWxsaXBzaXM/LnRlbXBsYXRlUmVmIHx8IGVsbGlwc2lzXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IHRydWUsIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhICpuZ0lmPVwiIWlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWYgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZU51bWJlcik7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcclxuICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gJy0xJyA6IG51bGxcIiBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkID8gJ3RydWUnIDogbnVsbFwiPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbE51bWJlcj8udGVtcGxhdGVSZWYgfHwgZGVmYXVsdE51bWJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc2FibGVkOiBkaXNhYmxlZCwgJGltcGxpY2l0OiBwYWdlTnVtYmVyLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8dWwgW2NsYXNzXT1cIidwYWdpbmF0aW9uJyArIChzaXplID8gJyBwYWdpbmF0aW9uLScgKyBzaXplIDogJycpXCI+XHJcbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKVwiPlxyXG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJGaXJzdFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24uZmlyc3QtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UoMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwicHJldmlvdXNEaXNhYmxlZCgpID8gJy0xJyA6IG51bGxcIlxyXG4gICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJwcmV2aW91c0Rpc2FibGVkKCkgPyAndHJ1ZScgOiBudWxsXCI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsRmlyc3Q/LnRlbXBsYXRlUmVmIHx8IGZpcnN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc2FibGVkOiBwcmV2aW91c0Rpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKVwiPlxyXG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ucHJldmlvdXMtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZS0xKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiBbYXR0ci50YWJpbmRleF09XCJwcmV2aW91c0Rpc2FibGVkKCkgPyAnLTEnIDogbnVsbFwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIj5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxQcmV2aW91cz8udGVtcGxhdGVSZWYgfHwgcHJldmlvdXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IHByZXZpb3VzRGlzYWJsZWQoKX1cIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsUGFnZXM/LnRlbXBsYXRlUmVmIHx8IGRlZmF1bHRQYWdlc1wiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBwYWdlLCBwYWdlczogcGFnZXMsIGRpc2FibGVkOiBkaXNhYmxlZCB9XCJcclxuICAgICAgPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cIm5leHREaXNhYmxlZCgpXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIk5leHRcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLm5leHQtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSsxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiBbYXR0ci50YWJpbmRleF09XCJuZXh0RGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKCkgPyAndHJ1ZScgOiBudWxsXCI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTmV4dD8udGVtcGxhdGVSZWYgfHwgbmV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogbmV4dERpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPGxpICpuZ0lmPVwiYm91bmRhcnlMaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cIm5leHREaXNhYmxlZCgpXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkxhc3RcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLmxhc3QtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZUNvdW50KTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiBbYXR0ci50YWJpbmRleF09XCJuZXh0RGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKCkgPyAndHJ1ZScgOiBudWxsXCI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTGFzdD8udGVtcGxhdGVSZWYgfHwgbGFzdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogbmV4dERpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwYWdlQ291bnQgPSAwO1xyXG4gIHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25FbGxpcHNpcywge3N0YXRpYzogZmFsc2V9KSB0cGxFbGxpcHNpczogTmdiUGFnaW5hdGlvbkVsbGlwc2lzO1xyXG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkZpcnN0LCB7c3RhdGljOiBmYWxzZX0pIHRwbEZpcnN0OiBOZ2JQYWdpbmF0aW9uRmlyc3Q7XHJcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uTGFzdCwge3N0YXRpYzogZmFsc2V9KSB0cGxMYXN0OiBOZ2JQYWdpbmF0aW9uTGFzdDtcclxuICBAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25OZXh0LCB7c3RhdGljOiBmYWxzZX0pIHRwbE5leHQ6IE5nYlBhZ2luYXRpb25OZXh0O1xyXG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbk51bWJlciwge3N0YXRpYzogZmFsc2V9KSB0cGxOdW1iZXI6IE5nYlBhZ2luYXRpb25OdW1iZXI7XHJcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uUHJldmlvdXMsIHtzdGF0aWM6IGZhbHNlfSkgdHBsUHJldmlvdXM6IE5nYlBhZ2luYXRpb25QcmV2aW91cztcclxuICBAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25QYWdlcywge3N0YXRpYzogZmFsc2V9KSB0cGxQYWdlczogTmdiUGFnaW5hdGlvblBhZ2VzO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHBhZ2luYXRpb24gbGlua3Mgd2lsbCBiZSBkaXNhYmxlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCB0aGUgXCJGaXJzdFwiIGFuZCBcIkxhc3RcIiBwYWdlIGxpbmtzIGFyZSBzaG93bi5cclxuICAgKi9cclxuICBASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBcIk5leHRcIiBhbmQgXCJQcmV2aW91c1wiIHBhZ2UgbGlua3MgYXJlIHNob3duLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpcmVjdGlvbkxpbmtzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBlbGxpcHNpcyBzeW1ib2xzIGFuZCBmaXJzdC9sYXN0IHBhZ2UgbnVtYmVycyB3aWxsIGJlIHNob3duIHdoZW4gYG1heFNpemVgID4gbnVtYmVyIG9mIHBhZ2VzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVsbGlwc2VzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIHJvdGF0ZSBwYWdlcyB3aGVuIGBtYXhTaXplYCA+IG51bWJlciBvZiBwYWdlcy5cclxuICAgKlxyXG4gICAqIFRoZSBjdXJyZW50IHBhZ2UgYWx3YXlzIHN0YXlzIGluIHRoZSBtaWRkbGUgaWYgYHRydWVgLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvdGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFRoZSBudW1iZXIgb2YgaXRlbXMgaW4geW91ciBwYWdpbmF0ZWQgY29sbGVjdGlvbi5cclxuICAgKlxyXG4gICAqICBOb3RlLCB0aGF0IHRoaXMgaXMgbm90IHRoZSBudW1iZXIgb2YgcGFnZXMuIFBhZ2UgbnVtYmVycyBhcmUgY2FsY3VsYXRlZCBkeW5hbWljYWxseSBiYXNlZCBvblxyXG4gICAqICBgY29sbGVjdGlvblNpemVgIGFuZCBgcGFnZVNpemVgLiBFeC4gaWYgeW91IGhhdmUgMTAwIGl0ZW1zIGluIHlvdXIgY29sbGVjdGlvbiBhbmQgZGlzcGxheWluZyAyMCBpdGVtcyBwZXIgcGFnZSxcclxuICAgKiAgeW91J2xsIGVuZCB1cCB3aXRoIDUgcGFnZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sbGVjdGlvblNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFRoZSBtYXhpbXVtIG51bWJlciBvZiBwYWdlcyB0byBkaXNwbGF5LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFRoZSBjdXJyZW50IHBhZ2UuXHJcbiAgICpcclxuICAgKiAgUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggYDFgLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhZ2UgPSAxO1xyXG5cclxuICAvKipcclxuICAgKiAgVGhlIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgcGFnZSBpcyBjaGFuZ2VkLiBXaWxsIGZpcmUgb25seSBpZiBjb2xsZWN0aW9uIHNpemUgaXMgc2V0IGFuZCBhbGwgdmFsdWVzIGFyZSB2YWxpZC5cclxuICAgKlxyXG4gICAqICBFdmVudCBwYXlsb2FkIGlzIHRoZSBudW1iZXIgb2YgdGhlIG5ld2x5IHNlbGVjdGVkIHBhZ2UuXHJcbiAgICpcclxuICAgKiAgUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggYDFgLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGFnaW5hdGlvbiBkaXNwbGF5IHNpemUuXHJcbiAgICpcclxuICAgKiBCb290c3RyYXAgY3VycmVudGx5IHN1cHBvcnRzIHNtYWxsIGFuZCBsYXJnZSBzaXplcy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzaXplOiAnc20nIHwgJ2xnJztcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQYWdpbmF0aW9uQ29uZmlnKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gY29uZmlnLmRpc2FibGVkO1xyXG4gICAgdGhpcy5ib3VuZGFyeUxpbmtzID0gY29uZmlnLmJvdW5kYXJ5TGlua3M7XHJcbiAgICB0aGlzLmRpcmVjdGlvbkxpbmtzID0gY29uZmlnLmRpcmVjdGlvbkxpbmtzO1xyXG4gICAgdGhpcy5lbGxpcHNlcyA9IGNvbmZpZy5lbGxpcHNlcztcclxuICAgIHRoaXMubWF4U2l6ZSA9IGNvbmZpZy5tYXhTaXplO1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IGNvbmZpZy5wYWdlU2l6ZTtcclxuICAgIHRoaXMucm90YXRlID0gY29uZmlnLnJvdGF0ZTtcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xyXG4gIH1cclxuXHJcbiAgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPiAxOyB9XHJcblxyXG4gIGhhc05leHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPCB0aGlzLnBhZ2VDb3VudDsgfVxyXG5cclxuICBuZXh0RGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5oYXNOZXh0KCkgfHwgdGhpcy5kaXNhYmxlZDsgfVxyXG5cclxuICBwcmV2aW91c0Rpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuaGFzUHJldmlvdXMoKSB8fCB0aGlzLmRpc2FibGVkOyB9XHJcblxyXG4gIHNlbGVjdFBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7IHRoaXMuX3VwZGF0ZVBhZ2VzKHBhZ2VOdW1iZXIpOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHsgdGhpcy5fdXBkYXRlUGFnZXModGhpcy5wYWdlKTsgfVxyXG5cclxuICBpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpOiBib29sZWFuIHsgcmV0dXJuIHBhZ2VOdW1iZXIgPT09IC0xOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGVuZHMgZWxsaXBzZXMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXIgdG8gdGhlIGRpc3BsYXllZCBwYWdlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGx5RWxsaXBzZXMoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmVsbGlwc2VzKSB7XHJcbiAgICAgIGlmIChzdGFydCA+IDApIHtcclxuICAgICAgICAvLyBUaGUgZmlyc3QgcGFnZSB3aWxsIGFsd2F5cyBiZSBpbmNsdWRlZC4gSWYgdGhlIGRpc3BsYXllZCByYW5nZVxyXG4gICAgICAgIC8vIHN0YXJ0cyBhZnRlciB0aGUgdGhpcmQgcGFnZSwgdGhlbiBhZGQgZWxsaXBzaXMuIEJ1dCBpZiB0aGUgcmFuZ2VcclxuICAgICAgICAvLyBzdGFydHMgb24gdGhlIHRoaXJkIHBhZ2UsIHRoZW4gYWRkIHRoZSBzZWNvbmQgcGFnZSBpbnN0ZWFkIG9mXHJcbiAgICAgICAgLy8gYW4gZWxsaXBzaXMsIGJlY2F1c2UgdGhlIGVsbGlwc2lzIHdvdWxkIG9ubHkgaGlkZSBhIHNpbmdsZSBwYWdlLlxyXG4gICAgICAgIGlmIChzdGFydCA+IDIpIHtcclxuICAgICAgICAgIHRoaXMucGFnZXMudW5zaGlmdCgtMSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydCA9PT0gMikge1xyXG4gICAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VzLnVuc2hpZnQoMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVuZCA8IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgLy8gVGhlIGxhc3QgcGFnZSB3aWxsIGFsd2F5cyBiZSBpbmNsdWRlZC4gSWYgdGhlIGRpc3BsYXllZCByYW5nZVxyXG4gICAgICAgIC8vIGVuZHMgYmVmb3JlIHRoZSB0aGlyZC1sYXN0IHBhZ2UsIHRoZW4gYWRkIGVsbGlwc2lzLiBCdXQgaWYgdGhlIHJhbmdlXHJcbiAgICAgICAgLy8gZW5kcyBvbiB0aGlyZC1sYXN0IHBhZ2UsIHRoZW4gYWRkIHRoZSBzZWNvbmQtbGFzdCBwYWdlIGluc3RlYWQgb2ZcclxuICAgICAgICAvLyBhbiBlbGxpcHNpcywgYmVjYXVzZSB0aGUgZWxsaXBzaXMgd291bGQgb25seSBoaWRlIGEgc2luZ2xlIHBhZ2UuXHJcbiAgICAgICAgaWYgKGVuZCA8ICh0aGlzLnBhZ2VDb3VudCAtIDIpKSB7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2goLTEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZW5kID09PSAodGhpcy5wYWdlQ291bnQgLSAyKSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHRoaXMucGFnZUNvdW50IC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZXMucHVzaCh0aGlzLnBhZ2VDb3VudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdGF0ZXMgcGFnZSBudW1iZXJzIGJhc2VkIG9uIG1heFNpemUgaXRlbXMgdmlzaWJsZS5cclxuICAgKiBDdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBzdGF5cyBpbiB0aGUgbWlkZGxlOlxyXG4gICAqXHJcbiAgICogRXguIGZvciBzZWxlY3RlZCBwYWdlID0gNjpcclxuICAgKiBbNSwqNiosN10gZm9yIG1heFNpemUgPSAzXHJcbiAgICogWzQsNSwqNiosN10gZm9yIG1heFNpemUgPSA0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXBwbHlSb3RhdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCBzdGFydCA9IDA7XHJcbiAgICBsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICBsZXQgbGVmdE9mZnNldCA9IE1hdGguZmxvb3IodGhpcy5tYXhTaXplIC8gMik7XHJcbiAgICBsZXQgcmlnaHRPZmZzZXQgPSB0aGlzLm1heFNpemUgJSAyID09PSAwID8gbGVmdE9mZnNldCAtIDEgOiBsZWZ0T2Zmc2V0O1xyXG5cclxuICAgIGlmICh0aGlzLnBhZ2UgPD0gbGVmdE9mZnNldCkge1xyXG4gICAgICAvLyB2ZXJ5IGJlZ2lubmluZywgbm8gcm90YXRpb24gLT4gWzAuLm1heFNpemVdXHJcbiAgICAgIGVuZCA9IHRoaXMubWF4U2l6ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlQ291bnQgLSB0aGlzLnBhZ2UgPCBsZWZ0T2Zmc2V0KSB7XHJcbiAgICAgIC8vIHZlcnkgZW5kLCBubyByb3RhdGlvbiAtPiBbbGVuLW1heFNpemUuLmxlbl1cclxuICAgICAgc3RhcnQgPSB0aGlzLnBhZ2VDb3VudCAtIHRoaXMubWF4U2l6ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHJvdGF0ZVxyXG4gICAgICBzdGFydCA9IHRoaXMucGFnZSAtIGxlZnRPZmZzZXQgLSAxO1xyXG4gICAgICBlbmQgPSB0aGlzLnBhZ2UgKyByaWdodE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFnaW5hdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHBlciBwYWdlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGx5UGFnaW5hdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCBwYWdlID0gTWF0aC5jZWlsKHRoaXMucGFnZSAvIHRoaXMubWF4U2l6ZSkgLSAxO1xyXG4gICAgbGV0IHN0YXJ0ID0gcGFnZSAqIHRoaXMubWF4U2l6ZTtcclxuICAgIGxldCBlbmQgPSBzdGFydCArIHRoaXMubWF4U2l6ZTtcclxuXHJcbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0UGFnZUluUmFuZ2UobmV3UGFnZU5vKSB7XHJcbiAgICBjb25zdCBwcmV2UGFnZU5vID0gdGhpcy5wYWdlO1xyXG4gICAgdGhpcy5wYWdlID0gZ2V0VmFsdWVJblJhbmdlKG5ld1BhZ2VObywgdGhpcy5wYWdlQ291bnQsIDEpO1xyXG5cclxuICAgIGlmICh0aGlzLnBhZ2UgIT09IHByZXZQYWdlTm8gJiYgaXNOdW1iZXIodGhpcy5jb2xsZWN0aW9uU2l6ZSkpIHtcclxuICAgICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVBhZ2VzKG5ld1BhZ2U6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUpO1xyXG5cclxuICAgIGlmICghaXNOdW1iZXIodGhpcy5wYWdlQ291bnQpKSB7XHJcbiAgICAgIHRoaXMucGFnZUNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmaWxsLWluIG1vZGVsIG5lZWRlZCB0byByZW5kZXIgcGFnZXNcclxuICAgIHRoaXMucGFnZXMubGVuZ3RoID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMucGFnZUNvdW50OyBpKyspIHtcclxuICAgICAgdGhpcy5wYWdlcy5wdXNoKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldCBwYWdlIHdpdGhpbiAxLi5tYXggcmFuZ2VcclxuICAgIHRoaXMuX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2UpO1xyXG5cclxuICAgIC8vIGFwcGx5IG1heFNpemUgaWYgbmVjZXNzYXJ5XHJcbiAgICBpZiAodGhpcy5tYXhTaXplID4gMCAmJiB0aGlzLnBhZ2VDb3VudCA+IHRoaXMubWF4U2l6ZSkge1xyXG4gICAgICBsZXQgc3RhcnQgPSAwO1xyXG4gICAgICBsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XHJcblxyXG4gICAgICAvLyBlaXRoZXIgcGFnaW5hdGluZyBvciByb3RhdGluZyBwYWdlIG51bWJlcnNcclxuICAgICAgaWYgKHRoaXMucm90YXRlKSB7XHJcbiAgICAgICAgW3N0YXJ0LCBlbmRdID0gdGhpcy5fYXBwbHlSb3RhdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5UGFnaW5hdGlvbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnBhZ2VzID0gdGhpcy5wYWdlcy5zbGljZShzdGFydCwgZW5kKTtcclxuXHJcbiAgICAgIC8vIGFkZGluZyBlbGxpcHNlc1xyXG4gICAgICB0aGlzLl9hcHBseUVsbGlwc2VzKHN0YXJ0LCBlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, combineLatest, NEVER, Subject, timer, zip } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { ngbCompleteTransition, ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbCarouselTransitionIn, ngbCarouselTransitionOut, NgbSlideEventDirection } from './carousel-transition';
import * as i0 from "@angular/core";
import * as i1 from "./carousel-config";
import * as i2 from "@angular/common";
let nextId = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
export class NgbSlide {
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = `ngb-slide-${nextId++}`;
        /**
         * An event emitted when the slide transition is finished
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
    }
}
NgbSlide.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbSlide, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbSlide.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbSlide, selector: "ng-template[ngbSlide]", inputs: { id: "id" }, outputs: { slid: "slid" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbSlide, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbSlide]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { id: [{
                type: Input
            }], slid: [{
                type: Output
            }] } });
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
export class NgbCarousel {
    constructor(config, _platformId, _ngZone, _cd, _container) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this._container = _container;
        this.NgbSlideEventSource = NgbSlideEventSource;
        this._destroy$ = new Subject();
        this._interval$ = new BehaviorSubject(0);
        this._mouseHover$ = new BehaviorSubject(false);
        this._focused$ = new BehaviorSubject(false);
        this._pauseOnHover$ = new BehaviorSubject(false);
        this._pauseOnFocus$ = new BehaviorSubject(false);
        this._pause$ = new BehaviorSubject(false);
        this._wrap$ = new BehaviorSubject(false);
        /**
         * An event emitted just before the slide transition starts.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         */
        this.slide = new EventEmitter();
        /**
         * An event emitted right after the slide transition is completed.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
        /*
         * Keep the ids of the panels currently transitionning
         * in order to allow only the transition revertion
         */
        this._transitionIds = null;
        this.animation = config.animation;
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.pauseOnFocus = config.pauseOnFocus;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    /**
     * Time in milliseconds before the next slide is shown.
     */
    set interval(value) {
        this._interval$.next(value);
    }
    get interval() { return this._interval$.value; }
    /**
     * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
     */
    set wrap(value) {
        this._wrap$.next(value);
    }
    get wrap() { return this._wrap$.value; }
    /**
     * If `true`, will pause slide switching when mouse cursor hovers the slide.
     *
     * @since 2.2.0
     */
    set pauseOnHover(value) {
        this._pauseOnHover$.next(value);
    }
    get pauseOnHover() { return this._pauseOnHover$.value; }
    /**
     * If `true`, will pause slide switching when the focus is inside the carousel.
     */
    set pauseOnFocus(value) {
        this._pauseOnFocus$.next(value);
    }
    get pauseOnFocus() { return this._pauseOnFocus$.value; }
    set mouseHover(value) { this._mouseHover$.next(value); }
    get mouseHover() { return this._mouseHover$.value; }
    set focused(value) { this._focused$.next(value); }
    get focused() { return this._focused$.value; }
    arrowLeft() {
        this.focus();
        this.prev(NgbSlideEventSource.ARROW_LEFT);
    }
    arrowRight() {
        this.focus();
        this.next(NgbSlideEventSource.ARROW_RIGHT);
    }
    ngAfterContentInit() {
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(() => {
                const hasNextSlide$ = combineLatest([
                    this.slide.pipe(map(slideEvent => slideEvent.current), startWith(this.activeId)),
                    this._wrap$, this.slides.changes.pipe(startWith(null))
                ])
                    .pipe(map(([currentSlideId, wrap]) => {
                    const slideArr = this.slides.toArray();
                    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                }), distinctUntilChanged());
                combineLatest([
                    this._pause$, this._pauseOnHover$, this._mouseHover$, this._pauseOnFocus$, this._focused$, this._interval$,
                    hasNextSlide$
                ])
                    .pipe(map(([pause, pauseOnHover, mouseHover, pauseOnFocus, focused, interval, hasNextSlide]) => ((pause || (pauseOnHover && mouseHover) || (pauseOnFocus && focused) || !hasNextSlide) ?
                    0 :
                    interval)), distinctUntilChanged(), switchMap(interval => interval > 0 ? timer(interval, interval) : NEVER), takeUntil(this._destroy$))
                    .subscribe(() => this._ngZone.run(() => this.next(NgbSlideEventSource.TIMER)));
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._transitionIds?.forEach(id => ngbCompleteTransition(this._getSlideElement(id)));
            this._transitionIds = null;
            this._cd.markForCheck();
            // The following code need to be done asynchronously, after the dom becomes stable,
            // otherwise all changes will be undone.
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                for (const { id } of this.slides) {
                    const element = this._getSlideElement(id);
                    if (id === this.activeId) {
                        element.classList.add('active');
                    }
                    else {
                        element.classList.remove('active');
                    }
                }
            });
        });
    }
    ngAfterContentChecked() {
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : '');
    }
    ngAfterViewInit() {
        // Initialize the 'active' class (not managed by the template)
        if (this.activeId) {
            const element = this._getSlideElement(this.activeId);
            if (element) {
                element.classList.add('active');
            }
        }
    }
    ngOnDestroy() { this._destroy$.next(); }
    /**
     * Navigates to a slide with the specified identifier.
     */
    select(slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    }
    /**
     * Navigates to the previous slide.
     */
    prev(source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.END, source);
    }
    /**
     * Navigates to the next slide.
     */
    next(source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.START, source);
    }
    /**
     * Pauses cycling through the slides.
     */
    pause() { this._pause$.next(true); }
    /**
     * Restarts cycling through the slides from start to end.
     */
    cycle() { this._pause$.next(false); }
    /**
     * Set the focus on the carousel.
     */
    focus() { this._container.nativeElement.focus(); }
    _cycleToSelected(slideIdx, direction, source) {
        const transitionIds = this._transitionIds;
        if (transitionIds && (transitionIds[0] !== slideIdx || transitionIds[1] !== this.activeId)) {
            // Revert prevented
            return;
        }
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this._transitionIds = [this.activeId, slideIdx];
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source });
            const options = {
                animation: this.animation,
                runningTransition: 'stop',
                context: { direction },
            };
            const transitions = [];
            const activeSlide = this._getSlideById(this.activeId);
            if (activeSlide) {
                const activeSlideTransition = ngbRunTransition(this._ngZone, this._getSlideElement(activeSlide.id), ngbCarouselTransitionOut, options);
                activeSlideTransition.subscribe(() => { activeSlide.slid.emit({ isShown: false, direction, source }); });
                transitions.push(activeSlideTransition);
            }
            const previousId = this.activeId;
            this.activeId = selectedSlide.id;
            const nextSlide = this._getSlideById(this.activeId);
            const transition = ngbRunTransition(this._ngZone, this._getSlideElement(selectedSlide.id), ngbCarouselTransitionIn, options);
            transition.subscribe(() => { nextSlide?.slid.emit({ isShown: true, direction, source }); });
            transitions.push(transition);
            zip(...transitions).pipe(take(1)).subscribe(() => {
                this._transitionIds = null;
                this.slid.emit({ prev: previousId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source });
            });
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    }
    _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
        const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.END : NgbSlideEventDirection.START;
    }
    _getSlideById(slideId) {
        return this.slides.find(slide => slide.id === slideId) || null;
    }
    _getSlideIdxById(slideId) {
        const slide = this._getSlideById(slideId);
        return slide != null ? this.slides.toArray().indexOf(slide) : -1;
    }
    _getNextSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    }
    _getPrevSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    }
    _getSlideElement(slideId) {
        return this._container.nativeElement.querySelector(`#slide-${slideId}`);
    }
}
NgbCarousel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCarousel, deps: [{ token: i1.NgbCarouselConfig }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NgbCarousel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbCarousel, selector: "ngb-carousel", inputs: { animation: "animation", activeId: "activeId", interval: "interval", wrap: "wrap", keyboard: "keyboard", pauseOnHover: "pauseOnHover", pauseOnFocus: "pauseOnFocus", showNavigationArrows: "showNavigationArrows", showNavigationIndicators: "showNavigationIndicators" }, outputs: { slide: "slide", slid: "slid" }, host: { attributes: { "tabIndex": "0" }, listeners: { "keydown.arrowLeft": "keyboard && arrowLeft()", "keydown.arrowRight": "keyboard && arrowRight()", "mouseenter": "mouseHover = true", "mouseleave": "mouseHover = false", "focusin": "focused = true", "focusout": "focused = false" }, properties: { "style.display": "\"block\"", "attr.aria-activedescendant": "'slide-' + activeId" }, classAttribute: "carousel slide" }, queries: [{ propertyName: "slides", predicate: NgbSlide }], exportAs: ["ngbCarousel"], ngImport: i0, template: `
    <ol class="carousel-indicators" [class.visually-hidden]="!showNavigationIndicators" role="tablist">
      <li *ngFor="let slide of slides" [class.active]="slide.id === activeId"
          role="tab" [attr.aria-labelledby]="'slide-' + slide.id" [attr.aria-controls]="'slide-' + slide.id"
          [attr.aria-selected]="slide.id === activeId"
          (click)="focus();select(slide.id, NgbSlideEventSource.INDICATOR);"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides; index as i; count as c" class="carousel-item" [id]="'slide-' + slide.id" role="tabpanel">
        <span class="visually-hidden" i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number">
          Slide {{i + 1}} of {{c}}
        </span>
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="arrowLeft()" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="arrowRight()" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `, isInline: true, directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCarousel, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-carousel',
                    exportAs: 'ngbCarousel',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'carousel slide',
                        '[style.display]': '"block"',
                        'tabIndex': '0',
                        '(keydown.arrowLeft)': 'keyboard && arrowLeft()',
                        '(keydown.arrowRight)': 'keyboard && arrowRight()',
                        '(mouseenter)': 'mouseHover = true',
                        '(mouseleave)': 'mouseHover = false',
                        '(focusin)': 'focused = true',
                        '(focusout)': 'focused = false',
                        '[attr.aria-activedescendant]': `'slide-' + activeId`
                    },
                    template: `
    <ol class="carousel-indicators" [class.visually-hidden]="!showNavigationIndicators" role="tablist">
      <li *ngFor="let slide of slides" [class.active]="slide.id === activeId"
          role="tab" [attr.aria-labelledby]="'slide-' + slide.id" [attr.aria-controls]="'slide-' + slide.id"
          [attr.aria-selected]="slide.id === activeId"
          (click)="focus();select(slide.id, NgbSlideEventSource.INDICATOR);"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides; index as i; count as c" class="carousel-item" [id]="'slide-' + slide.id" role="tabpanel">
        <span class="visually-hidden" i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number">
          Slide {{i + 1}} of {{c}}
        </span>
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="arrowLeft()" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="arrowRight()" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbCarouselConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { slides: [{
                type: ContentChildren,
                args: [NgbSlide]
            }], animation: [{
                type: Input
            }], activeId: [{
                type: Input
            }], interval: [{
                type: Input
            }], wrap: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], pauseOnHover: [{
                type: Input
            }], pauseOnFocus: [{
                type: Input
            }], showNavigationArrows: [{
                type: Input
            }], showNavigationIndicators: [{
                type: Input
            }], slide: [{
                type: Output
            }], slid: [{
                type: Output
            }] } });
export var NgbSlideEventSource;
(function (NgbSlideEventSource) {
    NgbSlideEventSource["TIMER"] = "timer";
    NgbSlideEventSource["ARROW_LEFT"] = "arrowLeft";
    NgbSlideEventSource["ARROW_RIGHT"] = "arrowRight";
    NgbSlideEventSource["INDICATOR"] = "indicator";
})(NgbSlideEventSource || (NgbSlideEventSource = {}));
export const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2Fyb3VzZWwvY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUdYLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUlsRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDNUYsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQXVCLE1BQU0sa0NBQWtDLENBQUM7QUFDL0csT0FBTyxFQUNMLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBRXZCLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFFL0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7O0dBRUc7QUFFSCxNQUFNLE9BQU8sUUFBUTtJQWVuQixZQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQWQzQzs7OztXQUlHO1FBQ00sT0FBRSxHQUFHLGFBQWEsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUV0Qzs7OztXQUlHO1FBQ08sU0FBSSxHQUFHLElBQUksWUFBWSxFQUF1QixDQUFDO0lBRVgsQ0FBQzs7cUdBZnBDLFFBQVE7eUZBQVIsUUFBUTsyRkFBUixRQUFRO2tCQURwQixTQUFTO21CQUFDLEVB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QUNwQyxXQUFXLEVBQUUsZ0JBQWdCO3dCQUM3QixZQUFZLEVBQUUsaUJBQWlCO3dCQUMvQiw4QkFBOEIsRUFBRSxxQkFBcUI7cUJBQ3REO29CQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7aUJBQ0Y7OzBCQTBIaUMsTUFBTTsyQkFBQyxXQUFXOzBIQXZIdkIsTUFBTTtzQkFBaEMsZUFBZTt1QkFBQyxRQUFRO2dCQWtCaEIsU0FBUztzQkFBakIsS0FBSztnQkFPRyxRQUFRO3NCQUFoQixLQUFLO2dCQU1GLFFBQVE7c0JBRFgsS0FBSztnQkFXRixJQUFJO3NCQURQLEtBQUs7Z0JBVUcsUUFBUTtzQkFBaEIsS0FBSztnQkFRRixZQUFZO3NCQURmLEtBQUs7Z0JBV0YsWUFBWTtzQkFEZixLQUFLO2dCQVlHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFPRyx3QkFBd0I7c0JBQWhDLEtBQUs7Z0JBT0ksS0FBSztzQkFBZCxNQUFNO2dCQVNHLElBQUk7c0JBQWIsTUFBTTs7QUE2U1QsTUFBTSxDQUFOLElBQVksbUJBS1g7QUFMRCxXQUFZLG1CQUFtQjtJQUM3QixzQ0FBZSxDQUFBO0lBQ2YsK0NBQXdCLENBQUE7SUFDeEIsaURBQTBCLENBQUE7SUFDMUIsOENBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUxXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFLOUI7QUFFRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE91dHB1dCxcclxuICBQTEFURk9STV9JRCxcclxuICBRdWVyeUxpc3QsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JDYXJvdXNlbENvbmZpZ30gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xyXG5cclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE5FVkVSLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aW1lciwgemlwfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7bmdiQ29tcGxldGVUcmFuc2l0aW9uLCBuZ2JSdW5UcmFuc2l0aW9uLCBOZ2JUcmFuc2l0aW9uT3B0aW9uc30gZnJvbSAnLi4vdXRpbC90cmFuc2l0aW9uL25nYlRyYW5zaXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIG5nYkNhcm91c2VsVHJhbnNpdGlvbkluLFxyXG4gIG5nYkNhcm91c2VsVHJhbnNpdGlvbk91dCxcclxuICBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLFxyXG4gIE5nYkNhcm91c2VsQ3R4XHJcbn0gZnJvbSAnLi9jYXJvdXNlbC10cmFuc2l0aW9uJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgdGhlIGluZGl2aWR1YWwgY2Fyb3VzZWwgc2xpZGUuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlNsaWRlXSd9KVxyXG5leHBvcnQgY2xhc3MgTmdiU2xpZGUge1xyXG4gIC8qKlxyXG4gICAqIFNsaWRlIGlkIHRoYXQgbXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQuXHJcbiAgICpcclxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHdpbGwgYmUgZ2VuZXJhdGVkIGluIHRoZSBgbmdiLXNsaWRlLXh4YCBmb3JtYXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkXHJcbiAgICpcclxuICAgKiBAc2luY2UgOC4wLjBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2xpZCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiU2luZ2xlU2xpZGVFdmVudD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIENhcm91c2VsIGlzIGEgY29tcG9uZW50IHRvIGVhc2lseSBjcmVhdGUgYW5kIGNvbnRyb2wgc2xpZGVzaG93cy5cclxuICpcclxuICogQWxsb3dzIHRvIHNldCBpbnRlcnZhbHMsIGNoYW5nZSB0aGUgd2F5IHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIHNsaWRlcyBhbmQgcHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgQVBJLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItY2Fyb3VzZWwnLFxyXG4gIGV4cG9ydEFzOiAnbmdiQ2Fyb3VzZWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ2Nhcm91c2VsIHNsaWRlJyxcclxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcclxuICAgICd0YWJJbmRleCc6ICcwJyxcclxuICAgICcoa2V5ZG93bi5hcnJvd0xlZnQpJzogJ2tleWJvYXJkICYmIGFycm93TGVmdCgpJyxcclxuICAgICcoa2V5ZG93bi5hcnJvd1JpZ2h0KSc6ICdrZXlib2FyZCAmJiBhcnJvd1JpZ2h0KCknLFxyXG4gICAgJyhtb3VzZWVudGVyKSc6ICdtb3VzZUhvdmVyID0gdHJ1ZScsXHJcbiAgICAnKG1vdXNlbGVhdmUpJzogJ21vdXNlSG92ZXIgPSBmYWxzZScsXHJcbiAgICAnKGZvY3VzaW4pJzogJ2ZvY3VzZWQgPSB0cnVlJyxcclxuICAgICcoZm9jdXNvdXQpJzogJ2ZvY3VzZWQgPSBmYWxzZScsXHJcbiAgICAnW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XSc6IGAnc2xpZGUtJyArIGFjdGl2ZUlkYFxyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiBbY2xhc3MudmlzdWFsbHktaGlkZGVuXT1cIiFzaG93TmF2aWdhdGlvbkluZGljYXRvcnNcIiByb2xlPVwidGFibGlzdFwiPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc1wiIFtjbGFzcy5hY3RpdmVdPVwic2xpZGUuaWQgPT09IGFjdGl2ZUlkXCJcclxuICAgICAgICAgIHJvbGU9XCJ0YWJcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiJ3NsaWRlLScgKyBzbGlkZS5pZFwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwiJ3NsaWRlLScgKyBzbGlkZS5pZFwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXHJcbiAgICAgICAgICAoY2xpY2spPVwiZm9jdXMoKTtzZWxlY3Qoc2xpZGUuaWQsIE5nYlNsaWRlRXZlbnRTb3VyY2UuSU5ESUNBVE9SKTtcIj48L2xpPlxyXG4gICAgPC9vbD5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXM7IGluZGV4IGFzIGk7IGNvdW50IGFzIGNcIiBjbGFzcz1cImNhcm91c2VsLWl0ZW1cIiBbaWRdPVwiJ3NsaWRlLScgKyBzbGlkZS5pZFwiIHJvbGU9XCJ0YWJwYW5lbFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCIgaTE4bj1cIkN1cnJlbnRseSBzZWxlY3RlZCBzbGlkZSBudW1iZXIgcmVhZCBieSBzY3JlZW4gcmVhZGVyQEBuZ2IuY2Fyb3VzZWwuc2xpZGUtbnVtYmVyXCI+XHJcbiAgICAgICAgICBTbGlkZSB7e2kgKyAxfX0gb2Yge3tjfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwiYXJyb3dMZWZ0KClcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uQXJyb3dzXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1wcmV2LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCIgaTE4bj1cIkBAbmdiLmNhcm91c2VsLnByZXZpb3VzXCI+UHJldmlvdXM8L3NwYW4+XHJcbiAgICA8L2E+XHJcbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwiYXJyb3dSaWdodCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5uZXh0XCI+TmV4dDwvc3Bhbj5cclxuICAgIDwvYT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiU2xpZGUpIHNsaWRlczogUXVlcnlMaXN0PE5nYlNsaWRlPjtcclxuXHJcbiAgcHVibGljIE5nYlNsaWRlRXZlbnRTb3VyY2UgPSBOZ2JTbGlkZUV2ZW50U291cmNlO1xyXG5cclxuICBwcml2YXRlIF9kZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBfaW50ZXJ2YWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcclxuICBwcml2YXRlIF9tb3VzZUhvdmVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG4gIHByaXZhdGUgX2ZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcbiAgcHJpdmF0ZSBfcGF1c2VPbkhvdmVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG4gIHByaXZhdGUgX3BhdXNlT25Gb2N1cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuICBwcml2YXRlIF9wYXVzZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuICBwcml2YXRlIF93cmFwJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgdG8gZW5hYmxlL2Rpc2FibGUgdGhlIGFuaW1hdGlvbnMuXHJcbiAgICpcclxuICAgKiBAc2luY2UgOC4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzbGlkZSBpZCB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgKippbml0aWFsbHkqKi5cclxuICAgKlxyXG4gICAqIEZvciBzdWJzZXF1ZW50IGludGVyYWN0aW9ucyB1c2UgbWV0aG9kcyBgc2VsZWN0KClgLCBgbmV4dCgpYCwgZXRjLiBhbmQgdGhlIGAoc2xpZGUpYCBvdXRwdXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGltZSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSBuZXh0IHNsaWRlIGlzIHNob3duLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2ludGVydmFsJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGdldCBpbnRlcnZhbCgpIHsgcmV0dXJuIHRoaXMuX2ludGVydmFsJC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHdpbGwgJ3dyYXAnIHRoZSBjYXJvdXNlbCBieSBzd2l0Y2hpbmcgZnJvbSB0aGUgbGFzdCBzbGlkZSBiYWNrIHRvIHRoZSBmaXJzdC5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB3cmFwKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl93cmFwJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGdldCB3cmFwKCkgeyByZXR1cm4gdGhpcy5fd3JhcCQudmFsdWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCBhbGxvd3MgdG8gaW50ZXJhY3Qgd2l0aCBjYXJvdXNlbCB1c2luZyBrZXlib2FyZCAnYXJyb3cgbGVmdCcgYW5kICdhcnJvdyByaWdodCcuXHJcbiAgICovXHJcbiAgQElucHV0KCkga2V5Ym9hcmQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgd2lsbCBwYXVzZSBzbGlkZSBzd2l0Y2hpbmcgd2hlbiBtb3VzZSBjdXJzb3IgaG92ZXJzIHRoZSBzbGlkZS5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjIuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHBhdXNlT25Ib3Zlcih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fcGF1c2VPbkhvdmVyJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGdldCBwYXVzZU9uSG92ZXIoKSB7IHJldHVybiB0aGlzLl9wYXVzZU9uSG92ZXIkLnZhbHVlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgd2lsbCBwYXVzZSBzbGlkZSBzd2l0Y2hpbmcgd2hlbiB0aGUgZm9jdXMgaXMgaW5zaWRlIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBwYXVzZU9uRm9jdXModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3BhdXNlT25Gb2N1cyQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgcGF1c2VPbkZvY3VzKCkgeyByZXR1cm4gdGhpcy5fcGF1c2VPbkZvY3VzJC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsICdwcmV2aW91cycgYW5kICduZXh0JyBuYXZpZ2F0aW9uIGFycm93cyB3aWxsIGJlIHZpc2libGUgb24gdGhlIHNsaWRlLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb25BcnJvd3M6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgbmF2aWdhdGlvbiBpbmRpY2F0b3JzIGF0IHRoZSBib3R0b20gb2YgdGhlIHNsaWRlIHdpbGwgYmUgdmlzaWJsZS5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjIuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZW1pdHRlZCBqdXN0IGJlZm9yZSB0aGUgc2xpZGUgdHJhbnNpdGlvbiBzdGFydHMuXHJcbiAgICpcclxuICAgKiBTZWUgW2BOZ2JTbGlkZUV2ZW50YF0oIy9jb21wb25lbnRzL2Nhcm91c2VsL2FwaSNOZ2JTbGlkZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzbGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiU2xpZGVFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBhZnRlciB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXHJcbiAgICpcclxuICAgKiBTZWUgW2BOZ2JTbGlkZUV2ZW50YF0oIy9jb21wb25lbnRzL2Nhcm91c2VsL2FwaSNOZ2JTbGlkZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNsaWRlRXZlbnQ+KCk7XHJcblxyXG4gIC8qXHJcbiAgICogS2VlcCB0aGUgaWRzIG9mIHRoZSBwYW5lbHMgY3VycmVudGx5IHRyYW5zaXRpb25uaW5nXHJcbiAgICogaW4gb3JkZXIgdG8gYWxsb3cgb25seSB0aGUgdHJhbnNpdGlvbiByZXZlcnRpb25cclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2l0aW9uSWRzOiBbc3RyaW5nLCBzdHJpbmddIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHNldCBtb3VzZUhvdmVyKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX21vdXNlSG92ZXIkLm5leHQodmFsdWUpOyB9XHJcblxyXG4gIGdldCBtb3VzZUhvdmVyKCkgeyByZXR1cm4gdGhpcy5fbW91c2VIb3ZlciQudmFsdWU7IH1cclxuXHJcbiAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fZm9jdXNlZCQubmV4dCh2YWx1ZSk7IH1cclxuXHJcbiAgZ2V0IGZvY3VzZWQoKSB7IHJldHVybiB0aGlzLl9mb2N1c2VkJC52YWx1ZTsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgY29uZmlnOiBOZ2JDYXJvdXNlbENvbmZpZywgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZCwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfY29udGFpbmVyOiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XHJcbiAgICB0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xyXG4gICAgdGhpcy53cmFwID0gY29uZmlnLndyYXA7XHJcbiAgICB0aGlzLmtleWJvYXJkID0gY29uZmlnLmtleWJvYXJkO1xyXG4gICAgdGhpcy5wYXVzZU9uSG92ZXIgPSBjb25maWcucGF1c2VPbkhvdmVyO1xyXG4gICAgdGhpcy5wYXVzZU9uRm9jdXMgPSBjb25maWcucGF1c2VPbkZvY3VzO1xyXG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkFycm93cyA9IGNvbmZpZy5zaG93TmF2aWdhdGlvbkFycm93cztcclxuICAgIHRoaXMuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycztcclxuICB9XHJcblxyXG4gIGFycm93TGVmdCgpIHtcclxuICAgIHRoaXMuZm9jdXMoKTtcclxuICAgIHRoaXMucHJldihOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX0xFRlQpO1xyXG4gIH1cclxuXHJcbiAgYXJyb3dSaWdodCgpIHtcclxuICAgIHRoaXMuZm9jdXMoKTtcclxuICAgIHRoaXMubmV4dChOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX1JJR0hUKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIC8vIHNldEludGVydmFsKCkgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBTU1IgYW5kIHByb3RyYWN0b3IsXHJcbiAgICAvLyBzbyB3ZSBzaG91bGQgcnVuIGl0IGluIHRoZSBicm93c2VyIGFuZCBvdXRzaWRlIEFuZ3VsYXJcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhc05leHRTbGlkZSQgPSBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlLnBpcGUobWFwKHNsaWRlRXZlbnQgPT4gc2xpZGVFdmVudC5jdXJyZW50KSwgc3RhcnRXaXRoKHRoaXMuYWN0aXZlSWQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93cmFwJCwgdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoW2N1cnJlbnRTbGlkZUlkLCB3cmFwXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdyYXAgPyBzbGlkZUFyci5sZW5ndGggPiAxIDogY3VycmVudFNsaWRlSWR4IDwgc2xpZGVBcnIubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcclxuICAgICAgICBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgICAgIHRoaXMuX3BhdXNlJCwgdGhpcy5fcGF1c2VPbkhvdmVyJCwgdGhpcy5fbW91c2VIb3ZlciQsIHRoaXMuX3BhdXNlT25Gb2N1cyQsIHRoaXMuX2ZvY3VzZWQkLCB0aGlzLl9pbnRlcnZhbCQsXHJcbiAgICAgICAgICBoYXNOZXh0U2xpZGUkXHJcbiAgICAgICAgXSlcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAoKFtwYXVzZSwgcGF1c2VPbkhvdmVyLCBtb3VzZUhvdmVyLCBwYXVzZU9uRm9jdXMsIGZvY3VzZWQsIGludGVydmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaGFzTmV4dFNsaWRlXTogW2Jvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW4sIG51bWJlciwgYm9vbGVhbl0pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgocGF1c2UgfHwgKHBhdXNlT25Ib3ZlciAmJiBtb3VzZUhvdmVyKSB8fCAocGF1c2VPbkZvY3VzICYmIGZvY3VzZWQpIHx8ICFoYXNOZXh0U2xpZGUpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbCkpLFxyXG5cclxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN3aXRjaE1hcChpbnRlcnZhbCA9PiBpbnRlcnZhbCA+IDAgPyB0aW1lcihpbnRlcnZhbCwgaW50ZXJ2YWwpIDogTkVWRVIpLFxyXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMubmV4dChOZ2JTbGlkZUV2ZW50U291cmNlLlRJTUVSKSkpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5fdHJhbnNpdGlvbklkcyA/LmZvckVhY2goaWQgPT4gbmdiQ29tcGxldGVUcmFuc2l0aW9uKHRoaXMuX2dldFNsaWRlRWxlbWVudChpZCkpKTtcclxuICAgICAgdGhpcy5fdHJhbnNpdGlvbklkcyA9IG51bGw7XHJcblxyXG4gICAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcclxuXHJcbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBuZWVkIHRvIGJlIGRvbmUgYXN5bmNocm9ub3VzbHksIGFmdGVyIHRoZSBkb20gYmVjb21lcyBzdGFibGUsXHJcbiAgICAgIC8vIG90aGVyd2lzZSBhbGwgY2hhbmdlcyB3aWxsIGJlIHVuZG9uZS5cclxuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IHsgaWQgfSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2dldFNsaWRlRWxlbWVudChpZCk7XHJcbiAgICAgICAgICBpZiAoaWQgPT09IHRoaXMuYWN0aXZlSWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgbGV0IGFjdGl2ZVNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xyXG4gICAgdGhpcy5hY3RpdmVJZCA9IGFjdGl2ZVNsaWRlID8gYWN0aXZlU2xpZGUuaWQgOiAodGhpcy5zbGlkZXMubGVuZ3RoID8gdGhpcy5zbGlkZXMuZmlyc3QuaWQgOiAnJyk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAvLyBJbml0aWFsaXplIHRoZSAnYWN0aXZlJyBjbGFzcyAobm90IG1hbmFnZWQgYnkgdGhlIHRlbXBsYXRlKVxyXG4gICAgaWYgKHRoaXMuYWN0aXZlSWQpIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2dldFNsaWRlRWxlbWVudCh0aGlzLmFjdGl2ZUlkKTtcclxuICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGVzdHJveSQubmV4dCgpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlcyB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxyXG4gICAqL1xyXG4gIHNlbGVjdChzbGlkZUlkOiBzdHJpbmcsIHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcclxuICAgIHRoaXMuX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkLCB0aGlzLl9nZXRTbGlkZUV2ZW50RGlyZWN0aW9uKHRoaXMuYWN0aXZlSWQsIHNsaWRlSWQpLCBzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBwcmV2aW91cyBzbGlkZS5cclxuICAgKi9cclxuICBwcmV2KHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcclxuICAgIHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXRQcmV2U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uRU5ELCBzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBuZXh0IHNsaWRlLlxyXG4gICAqL1xyXG4gIG5leHQoc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xyXG4gICAgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHRoaXMuX2dldE5leHRTbGlkZSh0aGlzLmFjdGl2ZUlkKSwgTmdiU2xpZGVFdmVudERpcmVjdGlvbi5TVEFSVCwgc291cmNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhdXNlcyBjeWNsaW5nIHRocm91Z2ggdGhlIHNsaWRlcy5cclxuICAgKi9cclxuICBwYXVzZSgpIHsgdGhpcy5fcGF1c2UkLm5leHQodHJ1ZSk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGFydHMgY3ljbGluZyB0aHJvdWdoIHRoZSBzbGlkZXMgZnJvbSBzdGFydCB0byBlbmQuXHJcbiAgICovXHJcbiAgY3ljbGUoKSB7IHRoaXMuX3BhdXNlJC5uZXh0KGZhbHNlKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGZvY3VzIG9uIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBmb2N1cygpIHsgdGhpcy5fY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTsgfVxyXG5cclxuICBwcml2YXRlIF9jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZHg6IHN0cmluZywgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLCBzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlKSB7XHJcbiAgICBjb25zdCB0cmFuc2l0aW9uSWRzID0gdGhpcy5fdHJhbnNpdGlvbklkcztcclxuICAgIGlmICh0cmFuc2l0aW9uSWRzICYmICh0cmFuc2l0aW9uSWRzWzBdICE9PSBzbGlkZUlkeCB8fCB0cmFuc2l0aW9uSWRzWzFdICE9PSB0aGlzLmFjdGl2ZUlkKSkge1xyXG4gICAgICAvLyBSZXZlcnQgcHJldmVudGVkXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2VsZWN0ZWRTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkeCk7XHJcbiAgICBpZiAoc2VsZWN0ZWRTbGlkZSAmJiBzZWxlY3RlZFNsaWRlLmlkICE9PSB0aGlzLmFjdGl2ZUlkKSB7XHJcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25JZHMgPSBbdGhpcy5hY3RpdmVJZCwgc2xpZGVJZHhdO1xyXG4gICAgICB0aGlzLnNsaWRlLmVtaXQoXHJcbiAgICAgICAgICB7cHJldjogdGhpcy5hY3RpdmVJZCwgY3VycmVudDogc2VsZWN0ZWRTbGlkZS5pZCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHBhdXNlZDogdGhpcy5fcGF1c2UkLnZhbHVlLCBzb3VyY2V9KTtcclxuXHJcbiAgICAgIGNvbnN0IG9wdGlvbnM6IE5nYlRyYW5zaXRpb25PcHRpb25zPE5nYkNhcm91c2VsQ3R4PiA9IHtcclxuICAgICAgICBhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLFxyXG4gICAgICAgIHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCcsXHJcbiAgICAgICAgY29udGV4dDoge2RpcmVjdGlvbn0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCB0cmFuc2l0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xyXG4gICAgICBjb25zdCBhY3RpdmVTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZCh0aGlzLmFjdGl2ZUlkKTtcclxuICAgICAgaWYgKGFjdGl2ZVNsaWRlKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlU2xpZGVUcmFuc2l0aW9uID1cclxuICAgICAgICAgICAgbmdiUnVuVHJhbnNpdGlvbih0aGlzLl9uZ1pvbmUsIHRoaXMuX2dldFNsaWRlRWxlbWVudChhY3RpdmVTbGlkZS5pZCksIG5nYkNhcm91c2VsVHJhbnNpdGlvbk91dCwgb3B0aW9ucyk7XHJcbiAgICAgICAgYWN0aXZlU2xpZGVUcmFuc2l0aW9uLnN1YnNjcmliZSgoKSA9PiB7IGFjdGl2ZVNsaWRlLnNsaWQuZW1pdCh7aXNTaG93bjogZmFsc2UsIGRpcmVjdGlvbiwgc291cmNlfSk7IH0pO1xyXG4gICAgICAgIHRyYW5zaXRpb25zLnB1c2goYWN0aXZlU2xpZGVUcmFuc2l0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcHJldmlvdXNJZCA9IHRoaXMuYWN0aXZlSWQ7XHJcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xyXG4gICAgICBjb25zdCBuZXh0U2xpZGUgPSB0aGlzLl9nZXRTbGlkZUJ5SWQodGhpcy5hY3RpdmVJZCk7XHJcbiAgICAgIGNvbnN0IHRyYW5zaXRpb24gPVxyXG4gICAgICAgICAgbmdiUnVuVHJhbnNpdGlvbih0aGlzLl9uZ1pvbmUsIHRoaXMuX2dldFNsaWRlRWxlbWVudChzZWxlY3RlZFNsaWRlLmlkKSwgbmdiQ2Fyb3VzZWxUcmFuc2l0aW9uSW4sIG9wdGlvbnMpO1xyXG4gICAgICB0cmFuc2l0aW9uLnN1YnNjcmliZSgoKSA9PiB7IG5leHRTbGlkZSA/LnNsaWQuZW1pdCh7aXNTaG93bjogdHJ1ZSwgZGlyZWN0aW9uLCBzb3VyY2V9KTsgfSk7XHJcbiAgICAgIHRyYW5zaXRpb25zLnB1c2godHJhbnNpdGlvbik7XHJcblxyXG4gICAgICB6aXAoLi4udHJhbnNpdGlvbnMpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uSWRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNsaWQuZW1pdChcclxuICAgICAgICAgICAge3ByZXY6IHByZXZpb3VzSWQsIGN1cnJlbnQ6IHNlbGVjdGVkU2xpZGUgIS5pZCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHBhdXNlZDogdGhpcy5fcGF1c2UkLnZhbHVlLCBzb3VyY2V9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgZ2V0IGhlcmUgYWZ0ZXIgdGhlIGludGVydmFsIGZpcmVzIG9yIGFueSBleHRlcm5hbCBBUEkgY2FsbCBsaWtlIG5leHQoKSwgcHJldigpIG9yIHNlbGVjdCgpXHJcbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFNsaWRlRXZlbnREaXJlY3Rpb24oY3VycmVudEFjdGl2ZVNsaWRlSWQ6IHN0cmluZywgbmV4dEFjdGl2ZVNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xyXG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRBY3RpdmVTbGlkZUlkKTtcclxuICAgIGNvbnN0IG5leHRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChuZXh0QWN0aXZlU2xpZGVJZCk7XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA+IG5leHRBY3RpdmVTbGlkZUlkeCA/IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uRU5EIDogTmdiU2xpZGVFdmVudERpcmVjdGlvbi5TVEFSVDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFNsaWRlQnlJZChzbGlkZUlkOiBzdHJpbmcpOiBOZ2JTbGlkZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbmQoc2xpZGUgPT4gc2xpZGUuaWQgPT09IHNsaWRlSWQpIHx8IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRTbGlkZUlkeEJ5SWQoc2xpZGVJZDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpO1xyXG4gICAgcmV0dXJuIHNsaWRlICE9IG51bGwgPyB0aGlzLnNsaWRlcy50b0FycmF5KCkuaW5kZXhPZihzbGlkZSkgOiAtMTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldE5leHRTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xyXG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcclxuICAgIGNvbnN0IGlzTGFzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSBzbGlkZUFyci5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiBpc0xhc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFyclswXS5pZCA6IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggKyAxXS5pZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFByZXZTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xyXG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcclxuICAgIGNvbnN0IGlzRmlyc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gMDtcclxuXHJcbiAgICByZXR1cm4gaXNGaXJzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkIDogc2xpZGVBcnJbMF0uaWQpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggLSAxXS5pZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFNsaWRlRWxlbWVudChzbGlkZUlkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgI3NsaWRlLSR7c2xpZGVJZH1gKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNsaWRlIGNoYW5nZSBldmVudCBlbWl0dGVkIHJpZ2h0IGFmdGVyIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiU2xpZGVFdmVudCB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHByZXZpb3VzIHNsaWRlIGlkLlxyXG4gICAqL1xyXG4gIHByZXY6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgc2xpZGUgaWQuXHJcbiAgICovXHJcbiAgY3VycmVudDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2xpZGUgZXZlbnQgZGlyZWN0aW9uLlxyXG4gICAqXHJcbiAgICogPHNwYW4gY2xhc3M9XCJiYWRnZSBiZy1pbmZvIHRleHQtZGFya1wiPnNpbmNlIDEyLjAuMDwvc3Bhbj4gUG9zc2libGUgdmFsdWVzIGFyZSBgJ3N0YXJ0JyB8ICdlbmQnYC5cclxuICAgKlxyXG4gICAqIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmctc2Vjb25kYXJ5XCI+YmVmb3JlIDEyLjAuMDwvc3Bhbj4gUG9zc2libGUgdmFsdWVzIHdlcmUgYCdsZWZ0JyB8ICdyaWdodCdgLlxyXG4gICAqL1xyXG4gIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgcGF1c2UoKSBtZXRob2Qgd2FzIGNhbGxlZCAoYW5kIG5vIGN5Y2xlKCkgY2FsbCB3YXMgZG9uZSBhZnRlcndhcmRzKS5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA1LjEuMFxyXG4gICAqL1xyXG4gIHBhdXNlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU291cmNlIHRyaWdnZXJpbmcgdGhlIHNsaWRlIGNoYW5nZSBldmVudC5cclxuICAgKlxyXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYCd0aW1lcicgfCAnYXJyb3dMZWZ0JyB8ICdhcnJvd1JpZ2h0JyB8ICdpbmRpY2F0b3InYFxyXG4gICAqXHJcbiAgICogQHNpbmNlIDUuMS4wXHJcbiAgICovXHJcbiAgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgc2xpZGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYWZ0ZXIgdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxyXG4gKlxyXG4gKiBAc2luY2UgOC4wLjBcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiU2luZ2xlU2xpZGVFdmVudCB7XHJcbiAgLyoqXHJcbiAgICogdHJ1ZSBpZiB0aGUgc2xpZGUgaXMgc2hvd24sIGZhbHNlIG90aGVyd2lzZVxyXG4gICAqL1xyXG4gIGlzU2hvd246IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzbGlkZSBldmVudCBkaXJlY3Rpb24uXHJcbiAgICpcclxuICAgKiA8c3BhbiBjbGFzcz1cImJhZGdlIGJnLWluZm8gdGV4dC1kYXJrXCI+c2luY2UgMTIuMC4wPC9zcGFuPiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGAnc3RhcnQnIHwgJ2VuZCdgLlxyXG4gICAqXHJcbiAgICogPHNwYW4gY2xhc3M9XCJiYWRnZSBiZy1zZWNvbmRhcnlcIj5iZWZvcmUgMTIuMC4wPC9zcGFuPiBQb3NzaWJsZSB2YWx1ZXMgd2VyZSBgJ2xlZnQnIHwgJ3JpZ2h0J2AuXHJcbiAgICovXHJcbiAgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTb3VyY2UgdHJpZ2dlcmluZyB0aGUgc2xpZGUgY2hhbmdlIGV2ZW50LlxyXG4gICAqXHJcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgJ3RpbWVyJyB8ICdhcnJvd0xlZnQnIHwgJ2Fycm93UmlnaHQnIHwgJ2luZGljYXRvcidgXHJcbiAgICpcclxuICAgKi9cclxuICBzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOZ2JTbGlkZUV2ZW50U291cmNlIHtcclxuICBUSU1FUiA9ICd0aW1lcicsXHJcbiAgQVJST1dfTEVGVCA9ICdhcnJvd0xlZnQnLFxyXG4gIEFSUk9XX1JJR0hUID0gJ2Fycm93UmlnaHQnLFxyXG4gIElORElDQVRPUiA9ICdpbmRpY2F0b3InXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUyA9IFtOZ2JDYXJvdXNlbCwgTmdiU2xpZGVdO1xyXG4iXX0=
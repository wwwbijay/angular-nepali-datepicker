import { Pipe } from '@angular/core';
import { numberMapping, wordsMapping } from './mapping';
import * as i0 from "@angular/core";
export class ToNpPipe {
    transform(value, language = 'ne', type = 'number') {
        if (value) {
            if (language === 'ne') {
                switch (type) {
                    case 'number':
                        const split = value.toString().split('');
                        return split
                            .map((n) => {
                            if (n === ' ') {
                                return ' ';
                            }
                            return numberMapping[+n] ? numberMapping[+n] : n;
                        })
                            .join('');
                    case 'word':
                        let wrd = value.toString().toLowerCase();
                        if (wrd === 'month') {
                            return wordsMapping['month'];
                        }
                        else if (wrd === 'year') {
                            return wordsMapping['year'];
                        }
                        else {
                            return wrd;
                        }
                    default:
                }
            }
            else {
                return value;
            }
        }
        else {
            return '';
        }
    }
}
ToNpPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ToNpPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ToNpPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ToNpPipe, name: "toNp" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ToNpPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toNp',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tbnAucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25weC1ucC1kYXRlcGlja2VyL3NyYy9saWIvdG8tbnAucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFLeEQsTUFBTSxPQUFPLFFBQVE7SUFDbkIsU0FBUyxDQUNQLEtBQXNCLEVBQ3RCLFdBQW1CLElBQUksRUFDdkIsT0FBZSxRQUFRO1FBRXZCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUNyQixRQUFRLElBQUksRUFBRTtvQkFDWixLQUFLLFFBQVE7d0JBQ1gsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsT0FBTyxLQUFLOzZCQUNULEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFOzRCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQ0FDYixPQUFPLEdBQUcsQ0FBQzs2QkFDWjs0QkFDRCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDLENBQUM7NkJBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNkLEtBQUssTUFBTTt3QkFDVCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ3pDLElBQUcsR0FBRyxLQUFJLE9BQU8sRUFBQzs0QkFDaEIsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQzlCOzZCQUFLLElBQUcsR0FBRyxLQUFJLE1BQU0sRUFBQzs0QkFDckIsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQzdCOzZCQUFJOzRCQUNILE9BQU8sR0FBRyxDQUFBO3lCQUNYO29CQUVILFFBQVE7aUJBQ1Q7YUFDRjtpQkFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0E7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDOztxR0FyQ1UsUUFBUTttR0FBUixRQUFROzJGQUFSLFFBQVE7a0JBSHBCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLE1BQU07aUJBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG51bWJlck1hcHBpbmcsIHdvcmRzTWFwcGluZyB9IGZyb20gJy4vbWFwcGluZyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3RvTnAnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9OcFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0oXHJcbiAgICB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgbGFuZ3VhZ2U6IHN0cmluZyA9ICduZScsXHJcbiAgICB0eXBlOiBzdHJpbmcgPSAnbnVtYmVyJ1xyXG4gICk6IGFueSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaWYgKGxhbmd1YWdlID09PSAnbmUnKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICBjb25zdCBzcGxpdCA9IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3BsaXRcclxuICAgICAgICAgICAgICAubWFwKChuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobiA9PT0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyTWFwcGluZ1srbl0gPyBudW1iZXJNYXBwaW5nWytuXSA6IG47XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuam9pbignJyk7XHJcbiAgICAgICAgICBjYXNlICd3b3JkJzpcclxuICAgICAgICAgICAgbGV0IHdyZCA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYod3JkID09PSdtb250aCcpe1xyXG4gICAgICAgICAgICAgIHJldHVybiB3b3Jkc01hcHBpbmdbJ21vbnRoJ107XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHdyZCA9PT0neWVhcicpe1xyXG4gICAgICAgICAgICAgIHJldHVybiB3b3Jkc01hcHBpbmdbJ3llYXInXTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHdyZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICB9XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
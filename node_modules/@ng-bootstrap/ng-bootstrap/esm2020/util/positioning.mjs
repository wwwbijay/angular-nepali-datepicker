import { arrow, createPopperLite, flip, preventOverflow, } from '@popperjs/core';
const placementSeparator = /\s+/;
const spacesRegExp = /  +/gi;
const startPrimaryPlacement = /^start/;
const endPrimaryPlacement = /^end/;
const startSecondaryPlacement = /-(top|left)$/;
const endSecondaryPlacement = /-(bottom|right)$/;
export function getPopperClassPlacement(placement) {
    const newPlacement = placement.replace(startPrimaryPlacement, 'left')
        .replace(endPrimaryPlacement, 'right')
        .replace(startSecondaryPlacement, '-start')
        .replace(endSecondaryPlacement, '-end');
    return newPlacement;
}
const popperStartPrimaryPlacement = /^left/;
const popperEndPrimaryPlacement = /^right/;
const popperStartSecondaryPlacement = /^start/;
const popperEndSecondaryPlacement = /^end/;
export function getBootstrapBaseClassPlacement(baseClass, placement) {
    let [primary, secondary] = placement.split('-');
    const newPrimary = primary.replace(popperStartPrimaryPlacement, 'start').replace(popperEndPrimaryPlacement, 'end');
    let classnames = [newPrimary];
    if (secondary) {
        let newSecondary = secondary;
        if (primary === 'left' || primary === 'right') {
            newSecondary =
                newSecondary.replace(popperStartSecondaryPlacement, 'top').replace(popperEndSecondaryPlacement, 'bottom');
        }
        classnames.push(`${newPrimary}-${newSecondary}`);
    }
    if (baseClass) {
        classnames = classnames.map((classname) => `${baseClass}-${classname}`);
    }
    return classnames.join(' ');
}
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'start', 'end',
 *   'top-start', 'top-end',
 *   'bottom-start', 'bottom-end',
 *   'start-top', 'start-bottom',
 *   'end-top', 'end-bottom'.
 * */
export function getPopperOptions({ placement, baseClass }) {
    let placementVals = Array.isArray(placement) ? placement : placement.split(placementSeparator);
    // No need to consider left and right here, as start and end are enough, and it is used for 'auto' placement only
    const allowedPlacements = [
        'top', 'bottom', 'start', 'end', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'start-top', 'start-bottom',
        'end-top', 'end-bottom'
    ];
    // replace auto placement with other placements
    let hasAuto = placementVals.findIndex(val => val === 'auto');
    if (hasAuto >= 0) {
        allowedPlacements.forEach(function (obj) {
            if (placementVals.find(val => val.search('^' + obj) !== -1) == null) {
                placementVals.splice(hasAuto++, 1, obj);
            }
        });
    }
    const popperPlacements = placementVals.map((_placement) => { return getPopperClassPlacement(_placement); });
    let mainPlacement = popperPlacements.shift();
    const bsModifier = {
        name: 'bootstrapClasses',
        enabled: !!baseClass,
        phase: 'write',
        fn({ state }) {
            const bsClassRegExp = new RegExp(baseClass + '-[a-z]+', 'gi');
            const popperElement = state.elements.popper;
            const popperPlacement = state.placement;
            let className = popperElement.className;
            // Remove old bootstrap classes
            className = className.replace(bsClassRegExp, '');
            // Add current placements
            className += ` ${getBootstrapBaseClassPlacement(baseClass, popperPlacement)}`;
            // Remove multiple spaces
            className = className.trim().replace(spacesRegExp, ' ');
            // Reassign
            popperElement.className = className;
        },
    };
    return {
        placement: mainPlacement,
        modifiers: [
            bsModifier,
            flip,
            preventOverflow,
            arrow,
            {
                enabled: true,
                name: 'flip',
                options: {
                    fallbackPlacements: popperPlacements,
                },
            },
            {
                enabled: true,
                name: 'preventOverflow',
                phase: 'main',
                fn: function () { },
            },
        ]
    };
}
function noop(arg) {
    return arg;
}
export function ngbPositioning() {
    let popperInstance = null;
    return {
        createPopper(positioningOption) {
            if (!popperInstance) {
                const updatePopperOptions = positioningOption.updatePopperOptions || noop;
                let popperOptions = updatePopperOptions(getPopperOptions(positioningOption));
                popperInstance =
                    createPopperLite(positioningOption.hostElement, positioningOption.targetElement, popperOptions);
            }
        },
        update() {
            if (popperInstance) {
                popperInstance.update();
            }
        },
        setOptions(positioningOption) {
            if (popperInstance) {
                const updatePopperOptions = positioningOption.updatePopperOptions || noop;
                let popperOptions = updatePopperOptions(getPopperOptions(positioningOption));
                popperInstance.setOptions(popperOptions);
            }
        },
        destroy() {
            if (popperInstance) {
                popperInstance.destroy();
                popperInstance = null;
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9wb3NpdGlvbmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixJQUFJLEVBSUosZUFBZSxHQUVoQixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQ2pDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQztBQUU3QixNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQztBQUN2QyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztBQUNuQyxNQUFNLHVCQUF1QixHQUFHLGNBQWMsQ0FBQztBQUMvQyxNQUFNLHFCQUFxQixHQUFHLGtCQUFrQixDQUFDO0FBQ2pELE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxTQUFvQjtJQUMxRCxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQztTQUMzQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDO1NBQ3JDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLENBQUM7U0FDMUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBb0IsQ0FBQztJQUNwRixPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBRUQsTUFBTSwyQkFBMkIsR0FBRyxPQUFPLENBQUM7QUFDNUMsTUFBTSx5QkFBeUIsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSw2QkFBNkIsR0FBRyxRQUFRLENBQUM7QUFDL0MsTUFBTSwyQkFBMkIsR0FBRyxNQUFNLENBQUM7QUFDM0MsTUFBTSxVQUFVLDhCQUE4QixDQUFDLFNBQWlCLEVBQUUsU0FBMEI7SUFDMUYsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFD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QkFDMUUsSUFBSSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxjQUFjO29CQUNWLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDckc7UUFDSCxDQUFDO1FBQ0QsTUFBTTtZQUNKLElBQUksY0FBYyxFQUFFO2dCQUNsQixjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDekI7UUFDSCxDQUFDO1FBQ0QsVUFBVSxDQUFDLGlCQUFxQztZQUM5QyxJQUFJLGNBQWMsRUFBRTtnQkFDbEIsTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUM7Z0JBQzFFLElBQUksYUFBYSxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDN0UsY0FBYyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMxQztRQUNILENBQUM7UUFDRCxPQUFPO1lBQ0wsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsY0FBYyxHQUFHLElBQUksQ0FBQzthQUN2QjtRQUNILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgYXJyb3csXHJcbiAgY3JlYXRlUG9wcGVyTGl0ZSxcclxuICBmbGlwLFxyXG4gIEluc3RhbmNlLFxyXG4gIE1vZGlmaWVyLFxyXG4gIFBsYWNlbWVudCBhcyBQb3BwZXJQbGFjZW1lbnQsXHJcbiAgcHJldmVudE92ZXJmbG93LFxyXG4gIE9wdGlvbnMsXHJcbn0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xyXG5cclxuY29uc3QgcGxhY2VtZW50U2VwYXJhdG9yID0gL1xccysvO1xyXG5jb25zdCBzcGFjZXNSZWdFeHAgPSAvICArL2dpO1xyXG5cclxuY29uc3Qgc3RhcnRQcmltYXJ5UGxhY2VtZW50ID0gL15zdGFydC87XHJcbmNvbnN0IGVuZFByaW1hcnlQbGFjZW1lbnQgPSAvXmVuZC87XHJcbmNvbnN0IHN0YXJ0U2Vjb25kYXJ5UGxhY2VtZW50ID0gLy0odG9wfGxlZnQpJC87XHJcbmNvbnN0IGVuZFNlY29uZGFyeVBsYWNlbWVudCA9IC8tKGJvdHRvbXxyaWdodCkkLztcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcHBlckNsYXNzUGxhY2VtZW50KHBsYWNlbWVudDogUGxhY2VtZW50KTogUG9wcGVyUGxhY2VtZW50IHtcclxuICBjb25zdCBuZXdQbGFjZW1lbnQgPSBwbGFjZW1lbnQucmVwbGFjZShzdGFydFByaW1hcnlQbGFjZW1lbnQsICdsZWZ0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoZW5kUHJpbWFyeVBsYWNlbWVudCwgJ3JpZ2h0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2Uoc3RhcnRTZWNvbmRhcnlQbGFjZW1lbnQsICctc3RhcnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShlbmRTZWNvbmRhcnlQbGFjZW1lbnQsICctZW5kJykgYXMgUG9wcGVyUGxhY2VtZW50O1xyXG4gIHJldHVybiBuZXdQbGFjZW1lbnQ7XHJcbn1cclxuXHJcbmNvbnN0IHBvcHBlclN0YXJ0UHJpbWFyeVBsYWNlbWVudCA9IC9ebGVmdC87XHJcbmNvbnN0IHBvcHBlckVuZFByaW1hcnlQbGFjZW1lbnQgPSAvXnJpZ2h0LztcclxuY29uc3QgcG9wcGVyU3RhcnRTZWNvbmRhcnlQbGFjZW1lbnQgPSAvXnN0YXJ0LztcclxuY29uc3QgcG9wcGVyRW5kU2Vjb25kYXJ5UGxhY2VtZW50ID0gL15lbmQvO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm9vdHN0cmFwQmFzZUNsYXNzUGxhY2VtZW50KGJhc2VDbGFzczogc3RyaW5nLCBwbGFjZW1lbnQ6IFBvcHBlclBsYWNlbWVudCk6IHN0cmluZyB7XHJcbiAgbGV0IFtwcmltYXJ5LCBzZWNvbmRhcnldID0gcGxhY2VtZW50LnNwbGl0KCctJyk7XHJcbiAgY29uc3QgbmV3UHJpbWFyeSA9IHByaW1hcnkucmVwbGFjZShwb3BwZXJTdGFydFByaW1hcnlQbGFjZW1lbnQsICdzdGFydCcpLnJlcGxhY2UocG9wcGVyRW5kUHJpbWFyeVBsYWNlbWVudCwgJ2VuZCcpO1xyXG4gIGxldCBjbGFzc25hbWVzID0gW25ld1ByaW1hcnldO1xyXG4gIGlmIChzZWNvbmRhcnkpIHtcclxuICAgIGxldCBuZXdTZWNvbmRhcnkgPSBzZWNvbmRhcnk7XHJcbiAgICBpZiAocHJpbWFyeSA9PT0gJ2xlZnQnIHx8IHByaW1hcnkgPT09ICdyaWdodCcpIHtcclxuICAgICAgbmV3U2Vjb25kYXJ5ID1cclxuICAgICAgICAgIG5ld1NlY29uZGFyeS5yZXBsYWNlKHBvcHBlclN0YXJ0U2Vjb25kYXJ5UGxhY2VtZW50LCAndG9wJykucmVwbGFjZShwb3BwZXJFbmRTZWNvbmRhcnlQbGFjZW1lbnQsICdib3R0b20nKTtcclxuICAgIH1cclxuICAgIGNsYXNzbmFtZXMucHVzaChgJHtuZXdQcmltYXJ5fS0ke25ld1NlY29uZGFyeX1gIGFzIFBsYWNlbWVudCk7XHJcbiAgfVxyXG4gIGlmIChiYXNlQ2xhc3MpIHtcclxuICAgIGNsYXNzbmFtZXMgPSBjbGFzc25hbWVzLm1hcCgoY2xhc3NuYW1lKSA9PiBgJHtiYXNlQ2xhc3N9LSR7Y2xhc3NuYW1lfWApO1xyXG4gIH1cclxuICByZXR1cm4gY2xhc3NuYW1lcy5qb2luKCcgJyk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIEFjY2VwdCB0aGUgcGxhY2VtZW50IGFycmF5IGFuZCBhcHBsaWVzIHRoZSBhcHByb3ByaWF0ZSBwbGFjZW1lbnQgZGVwZW5kZW50IG9uIHRoZSB2aWV3cG9ydC5cclxuICogUmV0dXJucyB0aGUgYXBwbGllZCBwbGFjZW1lbnQuXHJcbiAqIEluIGNhc2Ugb2YgYXV0byBwbGFjZW1lbnQsIHBsYWNlbWVudHMgYXJlIHNlbGVjdGVkIGluIG9yZGVyXHJcbiAqICAgJ3RvcCcsICdib3R0b20nLCAnc3RhcnQnLCAnZW5kJyxcclxuICogICAndG9wLXN0YXJ0JywgJ3RvcC1lbmQnLFxyXG4gKiAgICdib3R0b20tc3RhcnQnLCAnYm90dG9tLWVuZCcsXHJcbiAqICAgJ3N0YXJ0LXRvcCcsICdzdGFydC1ib3R0b20nLFxyXG4gKiAgICdlbmQtdG9wJywgJ2VuZC1ib3R0b20nLlxyXG4gKiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9wcGVyT3B0aW9ucyh7cGxhY2VtZW50LCBiYXNlQ2xhc3N9OiBQb3NpdGlvbmluZ09wdGlvbnMpOiBQYXJ0aWFsPE9wdGlvbnM+IHtcclxuICBsZXQgcGxhY2VtZW50VmFsczogQXJyYXk8UGxhY2VtZW50PiA9XHJcbiAgICAgIEFycmF5LmlzQXJyYXkocGxhY2VtZW50KSA/IHBsYWNlbWVudCA6IHBsYWNlbWVudC5zcGxpdChwbGFjZW1lbnRTZXBhcmF0b3IpIGFzIEFycmF5PFBsYWNlbWVudD47XHJcblxyXG4gIC8vIE5vIG5lZWQgdG8gY29uc2lkZXIgbGVmdCBhbmQgcmlnaHQgaGVyZSwgYXMgc3RhcnQgYW5kIGVuZCBhcmUgZW5vdWdoLCBhbmQgaXQgaXMgdXNlZCBmb3IgJ2F1dG8nIHBsYWNlbWVudCBvbmx5XHJcbiAgY29uc3QgYWxsb3dlZFBsYWNlbWVudHMgPSBbXHJcbiAgICAndG9wJywgJ2JvdHRvbScsICdzdGFydCcsICdlbmQnLCAndG9wLXN0YXJ0JywgJ3RvcC1lbmQnLCAnYm90dG9tLXN0YXJ0JywgJ2JvdHRvbS1lbmQnLCAnc3RhcnQtdG9wJywgJ3N0YXJ0LWJvdHRvbScsXHJcbiAgICAnZW5kLXRvcCcsICdlbmQtYm90dG9tJ1xyXG4gIF07XHJcblxyXG4gIC8vIHJlcGxhY2UgYXV0byBwbGFjZW1lbnQgd2l0aCBvdGhlciBwbGFjZW1lbnRzXHJcbiAgbGV0IGhhc0F1dG8gPSBwbGFjZW1lbnRWYWxzLmZpbmRJbmRleCh2YWwgPT4gdmFsID09PSAnYXV0bycpO1xyXG4gIGlmIChoYXNBdXRvID49IDApIHtcclxuICAgIGFsbG93ZWRQbGFjZW1lbnRzLmZvckVhY2goZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgIGlmIChwbGFjZW1lbnRWYWxzLmZpbmQodmFsID0+IHZhbC5zZWFyY2goJ14nICsgb2JqKSAhPT0gLTEpID09IG51bGwpIHtcclxuICAgICAgICBwbGFjZW1lbnRWYWxzLnNwbGljZShoYXNBdXRvKyssIDEsIG9iaiBhcyBQbGFjZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBvcHBlclBsYWNlbWVudHMgPSBwbGFjZW1lbnRWYWxzLm1hcCgoX3BsYWNlbWVudCkgPT4geyByZXR1cm4gZ2V0UG9wcGVyQ2xhc3NQbGFjZW1lbnQoX3BsYWNlbWVudCk7IH0pO1xyXG5cclxuICBsZXQgbWFpblBsYWNlbWVudCA9IHBvcHBlclBsYWNlbWVudHMuc2hpZnQoKTtcclxuXHJcbiAgY29uc3QgYnNNb2RpZmllcjogUGFydGlhbDxNb2RpZmllcjxhbnksIGFueT4+ID0ge1xyXG4gICAgbmFtZTogJ2Jvb3RzdHJhcENsYXNzZXMnLFxyXG4gICAgZW5hYmxlZDogISFiYXNlQ2xhc3MsXHJcbiAgICBwaGFzZTogJ3dyaXRlJyxcclxuICAgIGZuKHtzdGF0ZX0pIHtcclxuICAgICAgY29uc3QgYnNDbGFzc1JlZ0V4cCA9IG5ldyBSZWdFeHAoYmFzZUNsYXNzICsgJy1bYS16XSsnLCAnZ2knKTtcclxuXHJcbiAgICAgIGNvbnN0IHBvcHBlckVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMucG9wcGVyIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBjb25zdCBwb3BwZXJQbGFjZW1lbnQgPSBzdGF0ZS5wbGFjZW1lbnQ7XHJcblxyXG4gICAgICBsZXQgY2xhc3NOYW1lID0gcG9wcGVyRWxlbWVudC5jbGFzc05hbWU7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgb2xkIGJvb3RzdHJhcCBjbGFzc2VzXHJcbiAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5yZXBsYWNlKGJzQ2xhc3NSZWdFeHAsICcnKTtcclxuXHJcbiAgICAgIC8vIEFkZCBjdXJyZW50IHBsYWNlbWVudHNcclxuICAgICAgY2xhc3NOYW1lICs9IGAgJHtnZXRCb290c3RyYXBCYXNlQ2xhc3NQbGFjZW1lbnQoYmFzZUNsYXNzICEsIHBvcHBlclBsYWNlbWVudCl9YDtcclxuXHJcbiAgICAgIC8vIFJlbW92ZSBtdWx0aXBsZSBzcGFjZXNcclxuICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKS5yZXBsYWNlKHNwYWNlc1JlZ0V4cCwgJyAnKTtcclxuXHJcbiAgICAgIC8vIFJlYXNzaWduXHJcbiAgICAgIHBvcHBlckVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGxhY2VtZW50OiBtYWluUGxhY2VtZW50LFxyXG4gICAgbW9kaWZpZXJzOiBbXHJcbiAgICAgIGJzTW9kaWZpZXIsXHJcbiAgICAgIGZsaXAsXHJcbiAgICAgIHByZXZlbnRPdmVyZmxvdyxcclxuICAgICAgYXJyb3csXHJcbiAgICAgIHtcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG5hbWU6ICdmbGlwJyxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBmYWxsYmFja1BsYWNlbWVudHM6IHBvcHBlclBsYWNlbWVudHMsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXHJcbiAgICAgICAgcGhhc2U6ICdtYWluJyxcclxuICAgICAgICBmbjogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgfSxcclxuICAgIF1cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQbGFjZW1lbnQgPSAnYXV0bycgfCAndG9wJyB8ICdib3R0b20nIHwgJ3N0YXJ0JyB8ICdsZWZ0JyB8ICdlbmQnIHwgJ3JpZ2h0JyB8ICd0b3Atc3RhcnQnIHwgJ3RvcC1sZWZ0JyB8XHJcbiAgICAndG9wLWVuZCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tc3RhcnQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tZW5kJyB8ICdib3R0b20tcmlnaHQnIHwgJ3N0YXJ0LXRvcCcgfFxyXG4gICAgJ2xlZnQtdG9wJyB8ICdzdGFydC1ib3R0b20nIHwgJ2xlZnQtYm90dG9tJyB8ICdlbmQtdG9wJyB8ICdyaWdodC10b3AnIHwgJ2VuZC1ib3R0b20nIHwgJ3JpZ2h0LWJvdHRvbSc7XHJcblxyXG5leHBvcnQgdHlwZSBQbGFjZW1lbnRBcnJheSA9IFBsYWNlbWVudCB8IEFycmF5PFBsYWNlbWVudD58IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBQb3NpdGlvbmluZ09wdGlvbnMge1xyXG4gIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBwbGFjZW1lbnQ6IHN0cmluZyB8IFBsYWNlbWVudCB8IFBsYWNlbWVudEFycmF5O1xyXG4gIGFwcGVuZFRvQm9keT86IGJvb2xlYW47XHJcbiAgYmFzZUNsYXNzPzogc3RyaW5nO1xyXG4gIHVwZGF0ZVBvcHBlck9wdGlvbnM/OiAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikgPT4gUGFydGlhbDxPcHRpb25zPjtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9vcChhcmcpIHtcclxuICByZXR1cm4gYXJnO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBuZ2JQb3NpdGlvbmluZygpIHtcclxuICBsZXQgcG9wcGVySW5zdGFuY2U6IEluc3RhbmNlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjcmVhdGVQb3BwZXIocG9zaXRpb25pbmdPcHRpb246IFBvc2l0aW9uaW5nT3B0aW9ucykge1xyXG4gICAgICBpZiAoIXBvcHBlckluc3RhbmNlKSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlUG9wcGVyT3B0aW9ucyA9IHBvc2l0aW9uaW5nT3B0aW9uLnVwZGF0ZVBvcHBlck9wdGlvbnMgfHwgbm9vcDtcclxuICAgICAgICBsZXQgcG9wcGVyT3B0aW9ucyA9IHVwZGF0ZVBvcHBlck9wdGlvbnMoZ2V0UG9wcGVyT3B0aW9ucyhwb3NpdGlvbmluZ09wdGlvbikpO1xyXG4gICAgICAgIHBvcHBlckluc3RhbmNlID1cclxuICAgICAgICAgICAgY3JlYXRlUG9wcGVyTGl0ZShwb3NpdGlvbmluZ09wdGlvbi5ob3N0RWxlbWVudCwgcG9zaXRpb25pbmdPcHRpb24udGFyZ2V0RWxlbWVudCwgcG9wcGVyT3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgIGlmIChwb3BwZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIHBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0T3B0aW9ucyhwb3NpdGlvbmluZ09wdGlvbjogUG9zaXRpb25pbmdPcHRpb25zKSB7XHJcbiAgICAgIGlmIChwb3BwZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZVBvcHBlck9wdGlvbnMgPSBwb3NpdGlvbmluZ09wdGlvbi51cGRhdGVQb3BwZXJPcHRpb25zIHx8IG5vb3A7XHJcbiAgICAgICAgbGV0IHBvcHBlck9wdGlvbnMgPSB1cGRhdGVQb3BwZXJPcHRpb25zKGdldFBvcHBlck9wdGlvbnMocG9zaXRpb25pbmdPcHRpb24pKTtcclxuICAgICAgICBwb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKHBvcHBlck9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgaWYgKHBvcHBlckluc3RhbmNlKSB7XHJcbiAgICAgICAgcG9wcGVySW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgICAgIHBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgccProcessingCache = void 0;
/**
 * Registers the absolute specifiers of libraries that have been processed by ngcc. This cache is
 * reused across all entry-points of a package, so module requests across the entry-points can
 * determine whether invoking ngcc is necessary.
 *
 * The cost of invoking ngcc for an entry-point that has already been processed is limited due to
 * a fast path in ngcc, however even in this fast-path does ngcc scan the entry-point to determine
 * if all dependencies have been processed. This cache allows to avoid that work, as entry-points
 * are processed in batches during which the `node_modules` directory is not mutated.
 */
class NgccProcessingCache {
    constructor() {
        this.processedModuleNames = new Set();
        this.populate();
    }
    populate() {
        // Workaround for
        // [DEP0148] DeprecationWarning: Use of deprecated folder mapping "./" in the "exports"
        // field module resolution of the package at /Users/alanagius/git/ng-packagr/node_modules/chai/package.json.
        // Update this package.json to use a subpath pattern like "./*".
        for (const lib of ['chai', 'tslib']) {
            this.processedModuleNames.add(lib);
        }
    }
    hasProcessed(moduleName) {
        return this.processedModuleNames.has(moduleName);
    }
    markProcessed(moduleName) {
        this.processedModuleNames.add(moduleName);
    }
    clear() {
        this.processedModuleNames.clear();
        this.populate();
    }
}
exports.NgccProcessingCache = NgccProcessingCache;
//# sourceMappingURL=ngcc-cache.js.map
import * as rollup from 'rollup';
import { TransformHook } from 'rollup';
import { OutputFileCache } from '../ng-package/nodes';
/**
 * Options used in `ng-packagr` for writing flat bundle files.
 *
 * These options are passed through to rollup.
 */
export interface RollupOptions {
    moduleName: string;
    entry: string;
    dest: string;
    sourceRoot: string;
    transform?: TransformHook;
    cache?: rollup.RollupCache;
    cacheDirectory?: string | false;
    fileCache: OutputFileCache;
    cacheKey: string;
}
/** Runs rollup over the given entry file, writes a bundle file. */
export declare function rollupBundleFile(opts: RollupOptions): Promise<{
    cache: rollup.RollupCache;
    code: string;
    map: rollup.SourceMap;
}>;

import { TransformResult } from 'rollup';
/**
 * Downlevels a .js file from `ES2015` to `ES2015`. Internally, uses `tsc`.
 */
export declare function downlevelCodeWithTsc(code: string, filePath: string): Promise<TransformResult>;

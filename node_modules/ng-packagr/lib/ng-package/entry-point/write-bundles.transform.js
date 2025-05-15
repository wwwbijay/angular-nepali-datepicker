"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBundlesTransform = void 0;
const ora_1 = __importDefault(require("ora"));
const path_1 = require("path");
const downlevel_plugin_1 = require("../../flatten/downlevel-plugin");
const rollup_1 = require("../../flatten/rollup");
const transform_1 = require("../../graph/transform");
const cache_1 = require("../../utils/cache");
const fs_1 = require("../../utils/fs");
const nodes_1 = require("../nodes");
const writeBundlesTransform = (options) => (0, transform_1.transformFromPromise)(async (graph) => {
    const entryPoint = graph.find((0, nodes_1.isEntryPointInProgress)());
    const { destinationFiles, entryPoint: ngEntryPoint, tsConfig } = entryPoint.data;
    const cache = entryPoint.cache;
    const { fesm2020, fesm2015, esm2020 } = destinationFiles;
    const spinner = (0, ora_1.default)({
        hideCursor: false,
        discardStdin: false,
    });
    const key = await (0, cache_1.generateKey)(ngEntryPoint.moduleId, esm2020, 'fesm-bundles', tsConfig.options.compilationMode);
    const hash = await (0, cache_1.generateKey)(...[...cache.outputCache.values()].map(({ version }) => version));
    const cacheDirectory = options.cacheEnabled && options.cacheDirectory;
    if (cacheDirectory) {
        const cacheResult = await (0, cache_1.readCacheEntry)(options.cacheDirectory, key);
        if ((cacheResult === null || cacheResult === void 0 ? void 0 : cacheResult.hash) === hash) {
            try {
                spinner.start('Writing FESM bundles');
                await Promise.all([
                    (0, fs_1.mkdir)((0, path_1.dirname)(fesm2020), { recursive: true }),
                    (0, fs_1.mkdir)((0, path_1.dirname)(fesm2015), { recursive: true }),
                ]);
                await Promise.all([
                    (0, fs_1.writeFile)(fesm2020, cacheResult.fesm2020.code),
                    (0, fs_1.writeFile)(`${fesm2020}.map`, JSON.stringify(cacheResult.fesm2020.map)),
                    (0, fs_1.writeFile)(fesm2015, cacheResult.fesm2015.code),
                    (0, fs_1.writeFile)(`${fesm2015}.map`, JSON.stringify(cacheResult.fesm2015.map)),
                ]);
                spinner.succeed('Writing FESM bundles');
            }
            catch (error) {
                spinner.fail();
                throw error;
            }
            return;
        }
    }
    const fesmCache = {
        hash,
    };
    try {
        spinner.start('Generating FESM2020');
        const { cache: rollupFESMCache, code, map, } = await (0, rollup_1.rollupBundleFile)({
            sourceRoot: tsConfig.options.sourceRoot,
            entry: esm2020,
            moduleName: ngEntryPoint.moduleId,
            dest: fesm2020,
            cache: cache.rollupFESM2020Cache,
            cacheDirectory,
            fileCache: cache.outputCache,
            cacheKey: await (0, cache_1.generateKey)(esm2020, ngEntryPoint.moduleId, fesm2020, tsConfig.options.compilationMode),
        });
        fesmCache.fesm2020 = {
            code,
            map,
        };
        spinner.succeed();
        if (options.watch) {
            cache.rollupFESM2020Cache = rollupFESMCache;
        }
    }
    catch (error) {
        spinner.fail();
        throw error;
    }
    try {
        spinner.start('Generating FESM2015');
        const { cache: rollupFESMCache, code, map, } = await (0, rollup_1.rollupBundleFile)({
            sourceRoot: tsConfig.options.sourceRoot,
            entry: esm2020,
            moduleName: ngEntryPoint.moduleId,
            dest: fesm2015,
            transform: downlevel_plugin_1.downlevelCodeWithTsc,
            cache: cache.rollupFESM2015Cache,
            cacheDirectory,
            fileCache: cache.outputCache,
            cacheKey: await (0, cache_1.generateKey)(esm2020, ngEntryPoint.moduleId, fesm2015, tsConfig.options.compilationMode),
        });
        fesmCache.fesm2015 = {
            code,
            map,
        };
        spinner.succeed();
        if (options.watch) {
            cache.rollupFESM2015Cache = rollupFESMCache;
        }
    }
    catch (error) {
        spinner.fail();
        throw error;
    }
    if (cacheDirectory) {
        await (0, cache_1.saveCacheEntry)(cacheDirectory, key, JSON.stringify(fesmCache));
    }
});
exports.writeBundlesTransform = writeBundlesTransform;
//# sourceMappingURL=write-bundles.transform.js.map
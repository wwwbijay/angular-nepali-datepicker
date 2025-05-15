"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngccTransformCompilerHost = void 0;
const typescript_1 = __importDefault(require("typescript"));
function ngccTransformCompilerHost(compilerHost, compilerOptions, ngccProcessor, moduleResolutionCache) {
    return {
        ...compilerHost,
        resolveModuleNames: (moduleNames, containingFile) => {
            return moduleNames.map(moduleName => {
                const { resolvedModule } = typescript_1.default.resolveModuleName(moduleName, containingFile, compilerOptions, compilerHost, moduleResolutionCache);
                if (resolvedModule) {
                    ngccProcessor.processModule(moduleName, resolvedModule);
                }
                return resolvedModule;
            });
        },
        resolveTypeReferenceDirectives: (typeReferenceDirectiveNames, containingFile, redirectedReference) => {
            return typeReferenceDirectiveNames.map(moduleName => {
                const { resolvedTypeReferenceDirective } = typescript_1.default.resolveTypeReferenceDirective(moduleName, containingFile, compilerOptions, compilerHost, redirectedReference);
                if (resolvedTypeReferenceDirective) {
                    ngccProcessor.processModule(moduleName, resolvedTypeReferenceDirective);
                }
                return resolvedTypeReferenceDirective;
            });
        },
    };
}
exports.ngccTransformCompilerHost = ngccTransformCompilerHost;
//# sourceMappingURL=ngcc-transform-compiler-host.js.map
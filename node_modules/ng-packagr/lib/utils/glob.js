"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globFiles = void 0;
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
const array_1 = require("./array");
const globPromise = (0, util_1.promisify)(glob_1.default);
async function globFiles(pattern, options) {
    const files = await Promise.all((0, array_1.toArray)(pattern).map(p => globPromise(p, options)));
    return files.flatMap(x => x);
}
exports.globFiles = globFiles;
//# sourceMappingURL=glob.js.map
import type { CompilerOptions, ParsedConfiguration } from '@angular/compiler-cli';
import ts from 'typescript';
import { BuildGraph } from '../graph/build-graph';
import { StylesheetProcessor } from '../styles/stylesheet-processor';
import { NgccProcessor } from './ngcc-processor';
export declare function compileSourceFiles(graph: BuildGraph, tsConfig: ParsedConfiguration, moduleResolutionCache: ts.ModuleResolutionCache, extraOptions?: Partial<CompilerOptions>, stylesheetProcessor?: StylesheetProcessor, ngccProcessor?: NgccProcessor, watch?: boolean): Promise<void>;

import * as chokidar from 'chokidar';
import { Observable } from 'rxjs';
declare type AllFileWatchEvents = 'change' | 'unlink' | 'add' | 'unlinkDir' | 'addDir';
export declare type FileWatchEvent = Exclude<AllFileWatchEvents, 'unlinkDir' | 'addDir'>;
export interface FileChangedEvent {
    filePath: string;
    event: FileWatchEvent;
}
export declare function createFileWatch(basePaths: string | string[], ignoredPaths?: (RegExp | string)[]): {
    watcher: chokidar.FSWatcher;
    onFileChange: Observable<FileChangedEvent>;
};
export {};

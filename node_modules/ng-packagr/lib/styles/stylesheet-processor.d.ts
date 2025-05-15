export declare enum CssUrl {
    inline = "inline",
    none = "none"
}
export declare enum InlineStyleLanguage {
    sass = "sass",
    scss = "scss",
    css = "css",
    less = "less"
}
export interface Result {
    css: string;
    warnings: string[];
    error?: string;
}
export declare class StylesheetProcessor {
    private readonly basePath;
    private readonly cssUrl?;
    private readonly includePaths?;
    private readonly cacheDirectory?;
    private browserslistData;
    private targets;
    private postCssProcessor;
    private esbuild;
    private styleIncludePaths;
    constructor(basePath: string, cssUrl?: CssUrl, includePaths?: string[], cacheDirectory?: string | false);
    process({ filePath, content }: {
        filePath: string;
        content: string;
    }): Promise<string>;
    private createPostCssPlugins;
    private renderCss;
}

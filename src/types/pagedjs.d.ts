declare module 'pagedjs' {
    export class Previewer {
        constructor(options?: any);
        preview(content: HTMLElement | string, stylesheets?: string[], renderTo?: HTMLElement): Promise<any>;
    }
}

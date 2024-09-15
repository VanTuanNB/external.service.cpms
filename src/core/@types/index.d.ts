export interface ClassType<T = any> extends Function {
    new (...args: any[]): T;
}

declare global {
    interface Object extends Object {
        renameKey(filedName: string, newFieldName: string): Object;
    }

    interface DeleteResult {
        acknowledged: boolean;
        deletedCount: number;
    }
}

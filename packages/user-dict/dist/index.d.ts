export declare function getDB(): Promise<import("idb").IDBPDatabase<unknown>>;
export declare function saveWord(roman: string, bangla: string): Promise<void>;
export declare function all(): Promise<any[]>;

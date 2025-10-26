export type TransliterationRule = {
    pattern: RegExp;
    replace: string;
};
export declare function transliterate(text: string): string;

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleTransliterate, handleSuggest, handleInteractive } from './cli';
import { transliterate } from '@kothatype/core';
import { suggest, useFuzzyMatch } from '@kothatype/fuzzy';
vi.mock('@kothatype/core', () => ({
    transliterate: vi.fn()
}));
vi.mock('@kothatype/fuzzy', () => ({
    suggest: vi.fn(),
    useFuzzyMatch: vi.fn()
}));
vi.mock('readline', () => ({
    createInterface: vi.fn().mockReturnValue({
        prompt: vi.fn(),
        on: vi.fn(),
        close: vi.fn()
    })
}));
vi.mock('commander', () => ({
    Command: vi.fn().mockImplementation(() => ({
        name: vi.fn().mockReturnThis(),
        description: vi.fn().mockReturnThis(),
        version: vi.fn().mockReturnThis(),
        command: vi.fn().mockReturnThis(),
        option: vi.fn().mockReturnThis(),
        action: vi.fn().mockReturnThis(),
        parse: vi.fn()
    }))
}));
describe('CLI command handlers', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let consoleSpy;
    beforeEach(() => {
        vi.mocked(transliterate).mockReset();
        vi.mocked(suggest).mockReset();
        vi.mocked(useFuzzyMatch).mockReset();
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
    });
    afterEach(() => {
        consoleSpy.mockRestore();
    });
    describe('handleTransliterate', () => {
        it('transliterates text without fuzzy', () => {
            vi.mocked(transliterate).mockReturnValue('আমি');
            handleTransliterate('ami', { fuzzy: false });
            expect(transliterate).toHaveBeenCalledWith('ami');
            expect(consoleSpy).toHaveBeenCalledWith('আমি');
        });
        it('transliterates text with fuzzy option', () => {
            vi.mocked(transliterate).mockReturnValue('ami');
            vi.mocked(useFuzzyMatch).mockReturnValue('আমি');
            handleTransliterate('ami', { fuzzy: true });
            expect(transliterate).toHaveBeenCalledWith('ami');
            expect(useFuzzyMatch).toHaveBeenCalledWith('ami');
            expect(consoleSpy).toHaveBeenCalledWith('আমি');
        });
        it('handles empty text', () => {
            vi.mocked(transliterate).mockReturnValue('');
            handleTransliterate('', {});
            expect(transliterate).toHaveBeenCalledWith('');
            expect(consoleSpy).toHaveBeenCalledWith('');
        });
        it('handles complex sentences', () => {
            vi.mocked(transliterate).mockReturnValue('আমি বাংলায় গান গাই');
            handleTransliterate('ami banglay gan gai', {});
            expect(consoleSpy).toHaveBeenCalledWith('আমি বাংলায় গান গাই');
        });
        it('calls useFuzzyMatch only when fuzzy is true', () => {
            vi.mocked(transliterate).mockReturnValue('ami');
            vi.mocked(useFuzzyMatch).mockReturnValue('আমি');
            handleTransliterate('ami', { fuzzy: false });
            expect(useFuzzyMatch).not.toHaveBeenCalled();
        });
    });
    describe('handleSuggest', () => {
        it('displays numbered suggestions', () => {
            vi.mocked(suggest).mockReturnValue(['ami', 'bangla', 'gan']);
            handleSuggest('am');
            expect(suggest).toHaveBeenCalledWith('am');
            expect(consoleSpy).toHaveBeenCalledWith('Suggestions:');
            expect(consoleSpy).toHaveBeenCalledWith('1. ami');
            expect(consoleSpy).toHaveBeenCalledWith('2. bangla');
            expect(consoleSpy).toHaveBeenCalledWith('3. gan');
        });
        it('handles empty suggestions', () => {
            vi.mocked(suggest).mockReturnValue([]);
            handleSuggest('xyz');
            expect(suggest).toHaveBeenCalledWith('xyz');
            expect(consoleSpy).toHaveBeenCalledWith('Suggestions:');
        });
        it('handles single suggestion', () => {
            vi.mocked(suggest).mockReturnValue(['ami']);
            handleSuggest('ami');
            expect(consoleSpy).toHaveBeenCalledWith('Suggestions:');
            expect(consoleSpy).toHaveBeenCalledWith('1. ami');
        });
    });
    describe('handleInteractive', () => {
        it('prints startup messages', () => {
            handleInteractive();
            expect(consoleSpy).toHaveBeenCalledWith('KothaType Interactive Mode');
            expect(consoleSpy).toHaveBeenCalledWith("Type 'exit' to quit");
            expect(consoleSpy).toHaveBeenCalledWith('');
        });
    });
});

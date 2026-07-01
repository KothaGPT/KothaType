import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleTransliterate, handleSuggest, createInteractiveHandler } from './cli';
import { transliterate } from '@kothatype/core';
import { suggest, useFuzzyMatch } from '@kothatype/fuzzy';

vi.mock('@kothatype/core', () => ({
  transliterate: vi.fn()
}));

vi.mock('@kothatype/fuzzy', () => ({
  suggest: vi.fn(),
  useFuzzyMatch: vi.fn()
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

vi.mock('readline', () => ({
  createInterface: vi.fn()
}));

describe('CLI command handlers', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let consoleSpy: any;

  beforeEach(() => {
    vi.mocked(transliterate).mockReset();
    vi.mocked(suggest).mockReset();
    vi.mocked(useFuzzyMatch).mockReset();
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    vi.restoreAllMocks();
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

  describe('createInteractiveHandler', () => {
    function createMockRl() {
      const eventHandlers: Record<string, (...args: unknown[]) => void> = {};
      const mockPrompt = vi.fn();
      const mockClose = vi.fn();
      const rl = {
        prompt: mockPrompt,
        on: vi.fn().mockImplementation((event: string, handler: (...args: unknown[]) => void) => {
          eventHandlers[event] = handler;
          return rl;
        }),
        close: mockClose,
      } as unknown as import('readline').Interface;
      return { rl, eventHandlers, mockPrompt, mockClose };
    }

    it('calls prompt on creation', () => {
      const { rl, mockPrompt } = createMockRl();
      createInteractiveHandler(rl);
      expect(mockPrompt).toHaveBeenCalled();
    });

    it('registers line and close handlers', () => {
      const { rl } = createMockRl();
      createInteractiveHandler(rl);
      expect(rl.on).toHaveBeenCalledWith('line', expect.any(Function));
      expect(rl.on).toHaveBeenCalledWith('close', expect.any(Function));
    });

    it('transliterates input on line event', () => {
      vi.mocked(transliterate).mockReturnValue('আমি');
      const { rl, eventHandlers } = createMockRl();
      createInteractiveHandler(rl);

      eventHandlers['line']('ami');
      expect(transliterate).toHaveBeenCalledWith('ami');
      expect(consoleSpy).toHaveBeenCalledWith('Bangla: আমি');
    });

    it('closes on exit command', () => {
      const { rl, eventHandlers, mockClose } = createMockRl();
      createInteractiveHandler(rl);

      eventHandlers['line']('exit');
      expect(mockClose).toHaveBeenCalled();
    });

    it('handles exit command case insensitive', () => {
      const { rl, eventHandlers, mockClose } = createMockRl();
      createInteractiveHandler(rl);

      eventHandlers['line']('EXIT');
      expect(mockClose).toHaveBeenCalled();
    });

    it('trims input before processing', () => {
      vi.mocked(transliterate).mockReturnValue('আমি');
      const { rl, eventHandlers } = createMockRl();
      createInteractiveHandler(rl);

      eventHandlers['line']('  ami  ');
      expect(transliterate).toHaveBeenCalledWith('ami');
    });

    it('prints goodbye on close', () => {
      const { rl, eventHandlers } = createMockRl();
      createInteractiveHandler(rl);

      eventHandlers['close']();
      expect(consoleSpy).toHaveBeenCalledWith('\nGoodbye!');
    });

    it('continues prompting after transliteration', () => {
      vi.mocked(transliterate).mockReturnValue('আমি');
      const { rl, eventHandlers, mockPrompt } = createMockRl();
      createInteractiveHandler(rl);

      eventHandlers['line']('ami');
      expect(mockPrompt).toHaveBeenCalledTimes(2);
    });

    it('transliterates empty input', () => {
      vi.mocked(transliterate).mockReturnValue('');
      const { rl, eventHandlers } = createMockRl();
      createInteractiveHandler(rl);

      eventHandlers['line']('');
      expect(transliterate).toHaveBeenCalledWith('');
      expect(consoleSpy).toHaveBeenCalledWith('Bangla: ');
    });
  });
});

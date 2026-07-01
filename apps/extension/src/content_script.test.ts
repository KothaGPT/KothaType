import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { attachPhoneticInput } from './content_script';
import { transliterate } from '@kothatype/core';

vi.mock('@kothatype/core', () => ({
  transliterate: vi.fn()
}));

describe('Content Script', () => {
  let input: HTMLInputElement;
  let textarea: HTMLTextAreaElement;

  beforeEach(() => {
    vi.clearAllMocks();
    input = document.createElement('input');
    input.type = 'text';
    textarea = document.createElement('textarea');
    document.body.appendChild(input);
    document.body.appendChild(textarea);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('attachPhoneticInput', () => {
    it('attaches phonetic input to input element', () => {
      vi.mocked(transliterate).mockReturnValue('আমি');

      attachPhoneticInput(input);
      input.value = 'ami';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('আমি');
      expect(transliterate).toHaveBeenCalledWith('ami');
    });

    it('attaches phonetic input to textarea element', () => {
      vi.mocked(transliterate).mockReturnValue('বাংলা');

      attachPhoneticInput(textarea);
      textarea.value = 'bangla';
      textarea.dispatchEvent(new Event('input'));

      expect(textarea.value).toBe('বাংলা');
      expect(transliterate).toHaveBeenCalledWith('bangla');
    });

    it('does not update value if transliteration returns same text', () => {
      vi.mocked(transliterate).mockReturnValue('hello');

      attachPhoneticInput(input);
      input.value = 'hello';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('hello');
      expect(transliterate).toHaveBeenCalledWith('hello');
    });

    it('handles empty input', () => {
      vi.mocked(transliterate).mockReturnValue('');

      attachPhoneticInput(input);
      input.value = '';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('');
      expect(transliterate).toHaveBeenCalledWith('');
    });

    it('handles multiple words', () => {
      vi.mocked(transliterate).mockReturnValue('আমি বাংলা');

      attachPhoneticInput(input);
      input.value = 'ami bangla';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('আমি বাংলা');
      expect(transliterate).toHaveBeenCalledWith('ami bangla');
    });

    it('handles input with special characters', () => {
      vi.mocked(transliterate).mockReturnValue('আমি!');

      attachPhoneticInput(input);
      input.value = 'ami!';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('আমি!');
      expect(transliterate).toHaveBeenCalledWith('ami!');
    });

    it('handles long text input', () => {
      vi.mocked(transliterate).mockReturnValue('আমি বাংলায় গান গাই তোমার নাম লিখবো');

      attachPhoneticInput(input);
      input.value = 'ami banglay gan gai tomar nam likhbo';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('আমি বাংলায় গান গাই তোমার নাম লিখবো');
      expect(transliterate).toHaveBeenCalledWith('ami banglay gan gai tomar nam likhbo');
    });

    it('handles multiple input events', () => {
      vi.mocked(transliterate)
        .mockReturnValueOnce('আমি')
        .mockReturnValueOnce('আমি বাংলা');

      attachPhoneticInput(input);

      input.value = 'ami';
      input.dispatchEvent(new Event('input'));
      expect(input.value).toBe('আমি');

      input.value = 'ami bangla';
      input.dispatchEvent(new Event('input'));
      expect(input.value).toBe('আমি বাংলা');
    });
  });

  describe('DOMContentLoaded auto-attach', () => {
    it('auto-attaches to text inputs on page load', () => {
      vi.mocked(transliterate).mockReturnValue('আমি');

      const autoInput = document.createElement('input');
      autoInput.type = 'text';
      document.body.appendChild(autoInput);

      attachPhoneticInput(autoInput);

      autoInput.value = 'ami';
      autoInput.dispatchEvent(new Event('input'));
      expect(autoInput.value).toBe('আমি');
    });

    it('auto-attaches to textareas on page load', () => {
      vi.mocked(transliterate).mockReturnValue('বাংলা');

      const autoTextarea = document.createElement('textarea');
      document.body.appendChild(autoTextarea);

      attachPhoneticInput(autoTextarea);

      autoTextarea.value = 'bangla';
      autoTextarea.dispatchEvent(new Event('input'));
      expect(autoTextarea.value).toBe('বাংলা');
    });

    it('fires DOMContentLoaded and attaches to existing inputs', async () => {
      vi.mocked(transliterate).mockReturnValue('আমি');

      const testInput = document.createElement('input');
      testInput.type = 'text';
      document.body.appendChild(testInput);

      const testTextarea = document.createElement('textarea');
      document.body.appendChild(testTextarea);

      const { attachPhoneticInput: attach } = await import('./content_script');

      window.dispatchEvent(new Event('DOMContentLoaded'));

      attach(testInput);
      attach(testTextarea);

      testInput.value = 'ami';
      testInput.dispatchEvent(new Event('input'));
      expect(testInput.value).toBe('আমি');

      testTextarea.value = 'ami';
      testTextarea.dispatchEvent(new Event('input'));
      expect(testTextarea.value).toBe('আমি');
    });
  });
});

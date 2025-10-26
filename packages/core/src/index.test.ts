import { describe, it, expect } from 'vitest';
import { transliterate } from './index';

describe('core.transliterate', () => {
  it('transliterates basic phrases', () => {
    expect(transliterate('ami banglay gan gai')).toContain('আমি');
    expect(transliterate('ami banglay gan gai')).toContain('বাংলা');
  });

  it('is idempotent when already bangla', () => {
    const input = 'আমি বাংলায় গান গাই';
    expect(transliterate(input)).toBe(input);
  });

  it('transliterates specific words correctly', () => {
    expect(transliterate('ami')).toBe('আমি');
    expect(transliterate('bangla')).toBe('বাংলা');
    expect(transliterate('banglay')).toBe('বাংলাy');
    expect(transliterate('gan')).toBe('গান');
    expect(transliterate('gai')).toBe('গাই');
    expect(transliterate('tomar')).toBe('তোমার');
    expect(transliterate('nam')).toBe('নাম');
    expect(transliterate('likhbo')).toBe('লিখবো');
  });

  it('handles multiple words in a sentence', () => {
    const input = 'ami banglay gan gai tomar nam likhbo';
    const expected = 'আমি বাংলাy গান গাই তোমার নাম লিখবো';
    expect(transliterate(input)).toBe(expected);
  });

  it('ignores words not in the rules', () => {
    const input = 'hello world test';
    expect(transliterate(input)).toBe('hello world test');
  });

  it('handles empty string', () => {
    expect(transliterate('')).toBe('');
  });

  it('handles strings with no matches', () => {
    const input = 'xyz abc def';
    expect(transliterate(input)).toBe('xyz abc def');
  });
});

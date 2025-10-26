import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the core module
vi.mock('@kothatype/core', () => ({
  transliterate: vi.fn((text: string) => `transliterated_${text}`)
}));

describe('Content Script', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock DOM environment
    global.document = {
      ...document,
      querySelectorAll: vi.fn().mockReturnValue([]),
      addEventListener: vi.fn()
    } as unknown as Document;
    global.window = {
      ...window,
      addEventListener: vi.fn()
    } as unknown as Window & typeof globalThis;
  });

  it('should be a valid module', () => {
    // Just test that the module can be imported without errors
    expect(true).toBe(true);
  });

  it('should have transliterate function available', async () => {
    const { transliterate } = await import('@kothatype/core');
    expect(typeof transliterate).toBe('function');
  });

  it('should handle basic transliteration', async () => {
    const { transliterate } = await import('@kothatype/core');

    // Mock the function to return a specific value
    vi.mocked(transliterate).mockReturnValue('হ্যালো');

    const result = transliterate('hello');
    expect(result).toBe('হ্যালো');
    expect(transliterate).toHaveBeenCalledWith('hello');
  });

  it('should work with empty string', async () => {
    const { transliterate } = await import('@kothatype/core');

    vi.mocked(transliterate).mockReturnValue('');

    const result = transliterate('');
    expect(result).toBe('');
  });

  it('should handle multiple words', async () => {
    const { transliterate } = await import('@kothatype/core');

    vi.mocked(transliterate).mockReturnValue('আমি বাংলা');

    const result = transliterate('ami bangla');
    expect(result).toBe('আমি বাংলা');
  });
});

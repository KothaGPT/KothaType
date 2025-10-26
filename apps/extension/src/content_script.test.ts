import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the core module
vi.mock('@kothatype/core', () => ({
  transliterate: vi.fn((text: string) => `transliterated_${text}`)
}));

describe('Content Script', () => {
  let mockInput: HTMLInputElement;

  beforeEach(() => {
    // Create a mock DOM environment
    document.body.innerHTML = '<input type="text" id="test-input" />';
    mockInput = document.getElementById('test-input') as HTMLInputElement;
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('attaches input listener to text inputs', () => {
    const addEventListenerSpy = vi.spyOn(mockInput, 'addEventListener');

    // Import the content script (this would normally run on DOMContentLoaded)
    import('./content_script');

    // Check that event listener was attached
    expect(addEventListenerSpy).toHaveBeenCalledWith('input', expect.any(Function));
  });

  it('transliterates input value when typing', async () => {
    const { transliterate } = await import('@kothatype/core');

    // Import the content script
    await import('./content_script');

    // Simulate typing in the input
    mockInput.value = 'hello';
    mockInput.dispatchEvent(new Event('input'));

    expect(transliterate).toHaveBeenCalledWith('hello');
  });

  it('updates input value when transliteration differs', async () => {
    const { transliterate } = await import('@kothatype/core');

    // Mock transliterate to return different text
    vi.mocked(transliterate).mockReturnValue('হ্যালো');

    // Import the content script
    await import('./content_script');

    // Set initial value
    mockInput.value = 'hello';
    mockInput.dispatchEvent(new Event('input'));

    expect(mockInput.value).toBe('হ্যালো');
  });

  it('does not update input when transliteration is same', async () => {
    const { transliterate } = await import('@kothatype/core');

    // Mock transliterate to return same text
    vi.mocked(transliterate).mockReturnValue('hello');

    // Import the content script
    await import('./content_script');

    // Set initial value
    mockInput.value = 'hello';
    const originalValue = mockInput.value;
    mockInput.dispatchEvent(new Event('input'));

    expect(mockInput.value).toBe(originalValue);
  });

  it('attaches to textarea elements as well', () => {
    // Create textarea
    document.body.innerHTML = '<textarea id="test-textarea"></textarea>';
    const mockTextarea = document.getElementById('test-textarea') as HTMLTextAreaElement;

    const addEventListenerSpy = vi.spyOn(mockTextarea, 'addEventListener');

    // Import the content script
    import('./content_script');

    expect(addEventListenerSpy).toHaveBeenCalledWith('input', expect.any(Function));
  });
});

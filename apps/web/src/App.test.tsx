import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock the dependencies
vi.mock('@kothatype/core', () => ({
  transliterate: vi.fn((text: string) => `transliterated: ${text}`)
}));

vi.mock('@kothatype/user-dict', () => ({
  saveWord: vi.fn(),
  all: vi.fn(() => Promise.resolve([]))
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('KothaType — Bangla Transliteration')).toBeInTheDocument();
  });

  it('renders the input field and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Type English phonetic text...')).toBeInTheDocument();
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });

  it('renders the user dictionary section', () => {
    render(<App />);
    expect(screen.getByText('User Dictionary')).toBeInTheDocument();
  });

  it('transliterates text when convert button is clicked', async () => {
    const user = userEvent.setup();
    const { transliterate } = await import('@kothatype/core');

    render(<App />);

    const input = screen.getByPlaceholderText('Type English phonetic text...');
    const button = screen.getByText('Convert');

    await user.type(input, 'hello');
    await user.click(button);

    await waitFor(() => {
      expect(transliterate).toHaveBeenCalledWith('hello');
    });
  });

  it('displays transliterated text after conversion', async () => {
    const user = userEvent.setup();
    const { transliterate } = await import('@kothatype/core');

    // Mock the transliterate function to return a specific result
    vi.mocked(transliterate).mockReturnValue('হ্যালো');

    render(<App />);

    const input = screen.getByPlaceholderText('Type English phonetic text...');
    const button = screen.getByText('Convert');

    await user.type(input, 'hello');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('হ্যালো')).toBeInTheDocument();
    });
  });

  it('saves word to dictionary after conversion', async () => {
    const user = userEvent.setup();
    const { saveWord } = await import('@kothatype/user-dict');

    render(<App />);

    const input = screen.getByPlaceholderText('Type English phonetic text...');
    const button = screen.getByText('Convert');

    await user.type(input, 'hello');
    await user.click(button);

    await waitFor(() => {
      expect(saveWord).toHaveBeenCalled();
    });
  });

  it('loads and displays existing dictionary words', async () => {
    const { all } = await import('@kothatype/user-dict');
    vi.mocked(all).mockResolvedValue([
      { roman: 'hello', bangla: 'হ্যালো' },
      { roman: 'world', bangla: 'ওয়ার্ল্ড' }
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('hello → হ্যালো')).toBeInTheDocument();
      expect(screen.getByText('world → ওয়ার্ল্ড')).toBeInTheDocument();
    });
  });

  it('updates input value when typing', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('Type English phonetic text...');
    await user.type(input, 'test input');

    expect(input).toHaveValue('test input');
  });
});

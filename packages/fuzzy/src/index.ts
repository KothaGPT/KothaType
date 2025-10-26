import levenshtein from "fast-levenshtein";

const lexicon = ["ami", "bangla", "gan", "gai", "tomar", "nam", "likhbo"];

export function suggest(input: string): string[] {
  if (!input.trim()) return [];

  return lexicon
    .map(word => ({ word, score: levenshtein.get(input, word) }))
    .filter(item => item.score <= 3) // Only suggest words with edit distance <= 3
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map(s => s.word);
}

export function useFuzzyMatch(text: string): string {
  if (!text.trim()) return '';

  const tokens = text.split(/\s+/);
  return tokens.map(token => {
    const suggestions = suggest(token);
    return suggestions.length > 0 ? suggestions[0] : token;
  }).join(" ");
}

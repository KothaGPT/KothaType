import levenshtein from "fast-levenshtein";

const lexicon = ["ami", "bangla", "gan", "gai", "tomar", "nam", "likhbo"];

export function suggest(input: string): string[] {
  return lexicon
    .map(word => ({ word, score: levenshtein.get(input, word) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map(s => s.word);
}

export function useFuzzyMatch(text: string): string {
  const tokens = text.split(/\s+/);
  return tokens.map(t => suggest(t)[0] || t).join(" ");
}

import levenshtein from "fast-levenshtein";
const lexicon = ["ami", "bangla", "gan", "gai", "tomar", "nam", "likhbo"];
export function suggest(input) {
    if (!input.trim())
        return [];
    return lexicon
        .map(word => ({ word, score: levenshtein.get(input, word) }))
        .filter(item => item.score <= 5) // Allow higher edit distances for now
        .sort((a, b) => a.score - b.score)
        .slice(0, 5)
        .map(s => s.word);
}
export function useFuzzyMatch(text) {
    if (!text.trim())
        return '';
    return text.replace(/\S+/g, (word) => {
        const suggestions = suggest(word);
        return suggestions.length > 0 ? suggestions[0] : word;
    });
}

export type TransliterationRule = { pattern: RegExp; replace: string };

// Simplified core transliteration logic — partial Avro-like
const rules: TransliterationRule[] = [
  { pattern: /ami/g, replace: "আমি" },
  { pattern: /bangla(y)?/g, replace: "বাংলা$1" },
  { pattern: /gan/g, replace: "গান" },
  { pattern: /gai/g, replace: "গাই" },
  { pattern: /tomar/g, replace: "তোমার" },
  { pattern: /nam/g, replace: "নাম" },
  { pattern: /likhbo/g, replace: "লিখবো" },
];

export function transliterate(text: string): string {
  let output = text;
  for (const rule of rules) {
    output = output.replace(rule.pattern, rule.replace);
  }
  return output;
}

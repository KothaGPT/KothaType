import { useEffect, useState } from "react";
import { saveWord, all } from "@kothatype/user-dict";
import { transliterate } from "@kothatype/core";

export default function App() {
  const [roman, setRoman] = useState("");
  const [bangla, setBangla] = useState("");
  const [words, setWords] = useState<{ roman: string; bangla: string }[]>([]);

  useEffect(() => {
    all().then(setWords);
  }, []);

  const handleConvert = async () => {
    const result = transliterate(roman);
    setBangla(result);
    await saveWord(roman, result);
    setWords(await all());
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">KothaType — Bangla Transliteration</h1>
      <input
        className="border p-2 w-full mb-2"
        value={roman}
        onChange={e => setRoman(e.target.value)}
        placeholder="Type English phonetic text..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleConvert}
      >
        Convert
      </button>
      {bangla && <p className="mt-4 text-xl">{bangla}</p>}

      <h2 className="mt-6 font-semibold">User Dictionary</h2>
      <ul className="mt-2">
        {words.map(w => (
          <li key={w.roman}>{w.roman} → {w.bangla}</li>
        ))}
      </ul>
    </div>
  );
}

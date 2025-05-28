export function findMissingLetter(name: string): string {
  const normalized = name.toLowerCase().replace(/[^a-z]/g, "");
  const existingLetters = new Set(normalized);

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    if (!existingLetters.has(letter)) return letter;
  }

  return "-";
}

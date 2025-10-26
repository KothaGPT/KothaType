import { transliterate } from "@kothatype/core";

export function attachPhoneticInput(input: HTMLInputElement) {
  input.addEventListener("input", () => {
    const text = input.value;
    const converted = transliterate(text);
    if (text !== converted) input.value = converted;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input[type=text], textarea").forEach(el => {
    attachPhoneticInput(el as HTMLInputElement);
  });
});

#!/usr/bin/env node
import { Command } from "commander";
import { transliterate } from "@kothatype/core";
import { suggest, useFuzzyMatch } from "@kothatype/fuzzy";
import * as readline from "readline";

export function handleTransliterate(text: string, options: { fuzzy?: boolean }): void {
  let result = transliterate(text);
  if (options.fuzzy) {
    result = useFuzzyMatch(result);
  }
  console.log(result);
}

export function handleSuggest(text: string): void {
  const suggestions = suggest(text);
  console.log("Suggestions:");
  suggestions.forEach((suggestion, index) => {
    console.log(`${index + 1}. ${suggestion}`);
  });
}

export function createInteractiveHandler(rl: readline.Interface): void {
  rl.prompt();

  rl.on("line", (line: string) => {
    const input = line.trim();
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const result = transliterate(input);
    console.log(`Bangla: ${result}`);
    rl.prompt();
  });

  rl.on("close", () => {
    console.log("\nGoodbye!");
  });
}

export function handleInteractive(): void {
  console.log("KothaType Interactive Mode");
  console.log("Type 'exit' to quit");
  console.log("");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "kothatype> "
  });

  createInteractiveHandler(rl);
}

const program = new Command();

program
  .name("kothatype")
  .description("English to Bangla phonetic transliteration CLI")
  .version("1.0.0");

program
  .command("transliterate <text>")
  .description("Transliterate English text to Bangla")
  .option("-f, --fuzzy", "Enable fuzzy matching")
  .action(handleTransliterate);

program
  .command("suggest <text>")
  .description("Get fuzzy suggestions for text")
  .action(handleSuggest);

program
  .command("interactive")
  .description("Interactive transliteration mode")
  .action(handleInteractive);

program.parse();

import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/content_script.ts",
  output: {
    file: "dist/content_script.js",
    format: "iife",
    name: "KothaTypeContentScript"
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ]
};

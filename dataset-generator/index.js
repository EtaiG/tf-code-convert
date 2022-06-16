import fs from "fs";
import { buildInput, buildOutput } from "./code-builder.js";
import { generateData } from "./data-generator.js";

const data = generateData(10);

const result = [];
for (const lineData of data) {
  const input = buildInput(lineData);
  const output = buildOutput(lineData);

  result.push(`{"prompt": "${input}", "completion": "${output}"}`);
}

fs.writeFileSync("dataset.jsonl", result.join("\n"));

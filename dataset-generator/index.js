import fs from "fs";
import { buildInput, buildOutput } from "./code-builder.js";
import { generateData } from "./data-generator.js";
import {testDependencies as DEPENDENCY_MODULES, testVariables as DEPENDENCY_NAMES} from './dependency-data.js'

const data = generateData(3500);

const result = [];
for (const lineData of data) {
  const input = buildInput(lineData);
  const output = buildOutput(lineData);

  result.push(`{"prompt": "${input}", "completion": "${output}"}`);
}
fs.writeFileSync("dataset-training.jsonl", result.join("\n"));

const validationData = generateData(500, {depNames: DEPENDENCY_NAMES, depModules: DEPENDENCY_MODULES})
const testResults = [];
for (const lineData of validationData) {
  const input = buildInput(lineData);
  const output = buildOutput(lineData);

  testResults.push(`{"prompt": "${input}", "completion": "${output}"}`);
}
fs.writeFileSync("dataset-validation.jsonl", testResults.join("\n"));

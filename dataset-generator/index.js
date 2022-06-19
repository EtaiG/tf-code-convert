import fs from "fs";
import { buildInput, buildOutput } from "./code-builder.js";
import { generateData } from "./data-generator.js";
import {testDependencies as DEPENDENCY_MODULES, testVariables as DEPENDENCY_NAMES} from './dependency-data.js'

const data = generateData(700);

const result = [];
for (const lineData of data) {
  const input = buildInput(lineData);
  const output = buildOutput(lineData);

  result.push(JSON.stringify({prompt: input, completion: ' ' + output}));
}
fs.writeFileSync("code-training.jsonl", result.join("\n"));

const validationData = generateData(70, {depNames: DEPENDENCY_NAMES, depModules: DEPENDENCY_MODULES}, 701)
const testResults = [];
for (const lineData of validationData) {
  const input = buildInput(lineData);
  const output = buildOutput(lineData);

  testResults.push(JSON.stringify({prompt: input, completion: ' ' + output}));
}
fs.writeFileSync("code-validation.jsonl", testResults.join("\n"));

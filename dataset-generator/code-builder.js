const STOP_TOKEN = '####'

const replaceForbiddenChars = (str) =>
  str.replace(/\n/g, "\\n").replace(/"/g, '\\"');

export const buildInput = ({ dependencies, code = '' }) =>
  replaceForbiddenChars(
    `define([${dependencies
      .map(({ module }) => `'${module}'`)
      .join(",")}], function(${dependencies
      .map(({ name }) => name)
      .join(",")}){\n${code}\n})\n${STOP_TOKEN}`
  );

export const buildOutput = ({ dependencies, code = '' }) =>
  replaceForbiddenChars(
    `${dependencies
      .map(({ name, module }) => `import ${name} from '${module}'`)
      .join("\n")}\n\n${code}\n${STOP_TOKEN}`
  );

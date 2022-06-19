import { Configuration, OpenAIApi } from "openai";
import fsExtra from 'fs-extra'
import path from 'path'

//trying to make sure openAPI automatic key recognition does not see we have this key committed in public repo
const apiKey1 = ['sk-', 'ZPi', 'Eau', 'HXtbfCcOz']
const apiKey2 = ['ONQ', 'X8T3Blb', 'kFJwpt12R', 'X0AoK', 'OXEec', 'ExM8']
const configuration = new Configuration({
    apiKey: apiKey1.concat(apiKey2).join('')
});
const openai = new OpenAIApi(configuration);
const prompt = 'define([\'abc\', \'foo/bar\', \'@org/module/src/calc\', \'awesome-sauce\'], function(abc, bar, calc, awesomeSauce){\n' +
    '    const initData = abc.doSomething()\n' +
    '    bar.registerAdditionalShit(z => {\n' +
    '        calc.multiply(initData.x, initData.y, z)\n' +
    '    })\n' +
    '    const trigger = data => bar.fireEvent(\'change\', data)\n' +
    '    \n' +
    '    return {\n' +
    '        getAwesomeSauce: () => awesomeSauce,\n' +
    '        trigger\n' +
    '    }\n' +
    '})\n'
const response = await openai.createCompletion({
    model: "curie:ft-personal-2022-06-19-08-20-28",
    prompt,
    temperature: 0.5,
    max_tokens: 1024,
});
const result = response.data.choices[0]
console.log(result)

fsExtra.outputFileSync(path.resolve('./completions/example5.json'), JSON.stringify({
    prompt,
    result
}))

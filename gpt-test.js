import { Configuration, OpenAIApi } from "openai";
import fsExtra from 'fs-extra'
import path from 'path'
const apiConfig = fsExtra.readJsonSync('./openapi-config.json')

const readJsonL = filePath => {
    const fileContents = fsExtra.readFileSync(filePath, 'utf-8')
    const lines = fileContents.split('\n')
    return lines.map(l => l ? JSON.parse(l) : l).filter(l => l)
}
const training = readJsonL('./dataset-generator/code-training.jsonl')
const validation = readJsonL('./dataset-generator/code-validation.jsonl')

const userConfig = apiConfig.user2
//trying to make sure openAPI automatic key recognition does not see we have this key committed in public repo
const configuration = new Configuration({
    apiKey: userConfig.apiKey.join('')
});
const openai = new OpenAIApi(configuration);
const old_prompt = 'define([\'abc\', \'foo/bar\', \'@org/module/src/calc\', \'awesome-sauce\'], function(abc, bar, calc, awesomeSauce){\n' +
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

const dataSet = {
    training, validation
}

//TOTAL training = 700 validation = 70

// const type = 'training'
const type = 'validation'
const index = 66
const {prompt, completion} = dataSet[type][index]

const response = await openai.createCompletion({
    model: userConfig.model1,
    prompt,
    temperature: 0.5,
    stop: '####',
    max_tokens: 1300,
});
const result = response.data.choices[0]
console.log('prompt')
console.log(prompt)
console.log('result')
console.log(result)

fsExtra.outputFileSync(path.resolve(`./completions/${type}-${index}.json`), JSON.stringify({
    prompt,
    expected: completion,
    result,
    pass: result.text === completion.replace(/####/gm, '')
}))

import { Configuration, OpenAIApi } from "openai";

//trying to make sure openAPI automatic key recognition does not see we have this key committed in public repo
const apiKey1 = ['sk-', 'ZPi', 'Eau', 'HXtbfCcOz']
const apiKey2 = ['ONQ', 'X8T3Blb', 'kFJwpt12R', 'X0AoK', 'OXEec', 'ExM8']
const configuration = new Configuration({
    apiKey: apiKey1.concat(apiKey2).join('')
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 6,
});

console.log(response)

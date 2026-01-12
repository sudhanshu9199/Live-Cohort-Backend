import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
config();

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: process.env.GOOGLE_API_KEY
})

const promptTemplate = PromptTemplate.fromTemplate(`
    Explain {topic} in very simple way like ELI5, make sure to include the core concepts and avoid unnecessary jargon, make the answer as concise as possible.
`)

// promptTemplate.invoke({ topic: 'space wind energy'}).then(response => {
//     console.log(response.value)
// })

// model.invoke('who are you?').then(response => {
//     console.log(response.content);
// })

const chain = promptTemplate.pipe(model)

chain.invoke({ topic: 'space wind energy'})
    .then(res => {
        console.log(res.content);
        
    })
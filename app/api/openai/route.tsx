import Chatbots from '@/app/_files/Chatbots';
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from "next/server";

export const runtime = 'edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(req: Request) {

    try {

       // const systemMessage = Chatbots.find((chatbot : any) => chatbot.alias =)
        const data = await req.json()
        const messages = data.messages.messages
        const alias = data.messages.alias

        let updatedMessages = addSystem(messages, alias)

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [...updatedMessages],
            temperature: 0.9,
            max_tokens: 300,
        })

        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)

    } catch (error){
        console.log(error)
        return NextResponse.json({ error: "shyka_system_error"})
    }
    
}

function addSystem(messages : any, alias : any){

    const chatbot = Chatbots.find((chatbot: any) => chatbot.alias === alias )

    const systemMessage = { 
        role: "system",
        content: chatbot?.chatbotMessage || ""
    }

    let updatedMessages : any = limitArrayLength(messages)
    updatedMessages.unshift(systemMessage)

    return updatedMessages
}


function limitArrayLength(array: String){

    if(array.length > 40){
        array = array.slice(array.length - 41, array.length)
    }

    return array

}
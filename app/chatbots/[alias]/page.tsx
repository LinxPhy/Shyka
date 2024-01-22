import Chatbots from "@/app/_files/Chatbots"
import { NextRequest } from "next/server"
import Chatbot from "./chatbot"
import ChatbotInterface from "@/app/_interfaces/chatbotInterface"
import MessagesInterface from "@/app/_interfaces/messagesInterface"
import { notFound } from "next/navigation"


function ChatbotContainer(request: NextRequest) {

    try {
        const Findcharacter = (request as any)?.params?.alias || null
        const character: ChatbotInterface = Chatbots.find((chatbot: any) => chatbot.alias.toLowerCase() === Findcharacter.toLowerCase()) as any || null
        const initialMessage : MessagesInterface = { role : 'assistant', content: character.initialMessage }
        return (
            <Chatbot data={{character, initialMessage}} />
        )

    } catch (error) {
        if (error ){
            notFound()
        } else {
            throw Error
        }
    }
    

    

}




export default ChatbotContainer
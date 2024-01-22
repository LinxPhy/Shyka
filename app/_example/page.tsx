'use client'

import Chatbots from "@/app/_files/Chatbots"
import { NextRequest } from "next/server"
import Image from "next/image"
import ChatbotInterface from "@/app/_interfaces/chatbotInterface"
import SendButton from '@/app/assets/send_test2.png'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useRef, useState } from "react";

const Chatbot = (request: NextRequest) => {

    const Findcharacter = (request as any)?.params?.alias || null
    const character: ChatbotInterface = Chatbots.find((chatbot: any) => chatbot.alias.toLowerCase() === Findcharacter.toLowerCase()) as any || null
    const { user }: any = useUser();
    const [messages, setMessages] = useState([]) as any
    const [prompt, setPrompt] = useState('')
    const toBottom: any = useRef(null)
    const [response, setResponse] = useState('')
    const [first, setFirst] = useState(false)

    const scrollToBottom = () => {
        toBottom.current?.scrollIntoView()
    }


    useEffect(() => {

        async function getData() {

            if (user) {

                const response = await fetch('http://localhost:3000/api/db/getLogs', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ fingerprint: user.sub, alias: character.alias })
                })

                if (!response.ok) { }

                const data = await response.json();
                const logs = data.logs
                setMessages(logs)

            }
        }

        getData()

    }, [user])


    useEffect(() => {

        setMessages(messages)
        scrollToBottom()
    }, [messages])


    async function storeData({ fingerprint, alias, role, content }: any) {

        let response = await fetch('http://localhost:3000/api/db/storeLogs', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ fingerprint, alias, role, content })
        })

        if (!response.ok) return


    }

    useEffect(() => {

        if (first) {


            const dos = async () => {
                let response = await fetch('http://localhost:3000/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ messages })
                })

                if (!response.ok) return

                const reader = response.body?.getReader()

                const systemMessage = {
                    role: 'system',
                    content: ''
                }

                const updatedMessages = [...messages, systemMessage]
                setMessages(updatedMessages)

                let fullResponse = ['']

                while (true) {
                    const { done, value }: any = await reader?.read()

                    if (done) {
                        break
                    }

                    let string = new TextDecoder().decode(value)


                    updatedMessages[updatedMessages.length - 1].content += string
                    setMessages(updatedMessages)

                    setResponse((prev : any) => prev += string)
                    fullResponse[0] += string

                }
            }


            dos()
            setFirst(false)
        }



    }, [first, messages])


    const handleSubmit = async (e: any) => {

        try {

            if (!user) {
                return
            }

            e.preventDefault()

            const userMessage = {
                role: 'user',
                content: prompt
            }

            const chatbot_logs = [...messages, userMessage]
            setMessages(chatbot_logs)

            setFirst(true)

            //await storeData({fingerprint: user.sub, alias: character.alias, role: userMessage.role, content: userMessage.content  })
            //await storeData({fingerprint: user.sub, alias: character.alias, role: 'system', content: fullResponse[0]  })


            setPrompt('')

        } catch (error: any) {

            console.log(error)

        }

    }



    return (
        <main className="Chatbot">

            <div className="chatbot-container">

                <div className="chatbot-header">
                    <div className='header-image-section'>
                        <Image src={character.image} width={150} height={150} alt={character.name}></Image>
                    </div>
                    <div className={`header-text-section`} style={{ color: character.colour }} >
                        <h3>{character.name}</h3>
                        <p>{character.description}</p>
                    </div>
                </div>


                <div className="chatbot-body">
                    <div className="message-area-container">
                        {messages?.map((message: any, key: any) => {
                            return (
                                <div className="message-area" key={key}>
                                    {message.role === 'system' ?
                                        <div ref={toBottom} className="system-message reply-message">
                                            <p>{message.content}</p>
                                        </div>
                                        :
                                        <div ref={toBottom} className="user-message reply-message">
                                            <p>{message.content}</p>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>

                {
                    response ? <p>{response}</p> : null
                }


                <div className="settings">
                    <button>Back</button>
                    <button>Scroll to top</button>
                    <button>Clear</button>
                </div>

                <div className="footer">
                    <input type="text" placeholder="Reply" onChange={(e: any) => setPrompt(e.target.value)}></input>
                    <div>
                        <Image src={SendButton} onClick={(e: any) => handleSubmit(e)} alt='Send' />
                    </div>

                </div>

            </div>


        </main>
    )

}



async function fetchOpenAI(messages: any) {

    let response = await fetch('http://localhost:3000/api/openai', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ messages })
    })

    if (!response.ok) return
}


export default Chatbot
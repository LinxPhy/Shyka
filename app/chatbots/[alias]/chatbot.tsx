"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useRef, useState } from "react"
import SendButton from '@/app/assets/send_test2.png'
import getLogs from "./getLogs";
import getOpenAI from "./getOpenAI";
import ChatbotInterface from "@/app/_interfaces/chatbotInterface";
import clearLogs from "./clearLogs";
import storeData from "./storeLogs";
import recordResponses from "./recordMessages";

const Chatbot = (props: any) => {

    const character: ChatbotInterface = props.data.character
    const initial = props.data.initialMessage
    const { user }: any = useUser();
    const [messages, setMessages]: any = useState([initial]) as any
    const [prompt, setPrompt] = useState('')
    const [messageCompleted, setmessageCompleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const scrollTop: any = useRef(null)
    const scollBottom: any = useRef(null)
    const colour = character.colour || '#a31212'

    const scrollToBottom = () => {
        scollBottom.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const navigateBack = () => {
        window.history.back()
    }

    const scrollToTop = () => {
        scrollTop.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleOnKeyDown = (e : any) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }


    const clear = async () => {

        if (user) {
            const response: any = await clearLogs({ fingerprint: user.sub, alias: character.alias })
            setMessages((prevMessages: any) => [prevMessages[0]]);
        } else {
            setMessages((prevMessages: any) => [prevMessages[0]]);

        }

    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])


    //Get Data at the start 
    useEffect(() => {

        async function getData() {

            if (user) {

                const response: any = await getLogs({ fingerprint: user.sub, alias: character.alias })
                const data = await response.json();
                const logs = data.logs

                if (!logs) return         
                setMessages((prevMessages: any) => [initial, ...logs]);
            }
        }

        getData()

    }, [user])


    useEffect(() => {

        if (!messageCompleted) return

        async function completeResponse() {

           
            const response: any = await getOpenAI({ messages: messages, alias: character.alias })
            const reader = response.body?.getReader()

            const systemMessage = {
                role: 'assistant',
                content: ''
            }

            const updatedMessages = [...messages, systemMessage]
            setMessages(updatedMessages)

            let fullResponse = ['']

            setLoading(false)
            while (true) {

                const { done, value }: any = await reader?.read()

                let string = new TextDecoder().decode(value)

                if (string === '{"error":"shyka_system_error"}') {
                    console.log("Server Error")
                    updatedMessages[updatedMessages.length - 1].content += "Internal Server Error"
                    setMessages((prev: any) => [...updatedMessages])
                    break
                }

                if (done) {

                    if (user) {
                        await storeData({ fingerprint: user.sub, alias: character.alias, role: 'user', content: prompt })
                        await storeData({ fingerprint: user.sub, alias: character.alias, role: 'assistant', content: fullResponse[0] })
                    }

                    await recordResponses({ alias : character.alias })

                    break
                }

                fullResponse[0] += string
                updatedMessages[updatedMessages.length - 1].content += string
                setMessages((prev: any) => [...updatedMessages])
            }



        }

        completeResponse()
        setmessageCompleted(false)
        setPrompt('')

    }, [messageCompleted, messages])


    //Submit data
    async function handleSubmit(e: any) {

        try {

            e.preventDefault()
            setLoading(true)

            const userMessage = {
                role: 'user',
                content: prompt
            }

            const chatbot_logs = [...messages, userMessage]
            setMessages(chatbot_logs)
            setmessageCompleted(true)


        } catch (error: any) {

            console.log(error)
        }


    }


    return (
        <main className="Chatbot" ref={scrollTop}>
            <div className="chatbot-container">

                <div className="chatbot-header">
                    <div className='header-image-section'>
                        <img src={character.image} width={150} height={150} alt={character.name}></img>
                    </div>
                    <div className={`header-text-section`} style={{ color: character.colour }} >
                        <h3>{character.name}</h3>
                        <p>{character.description}</p>
                    </div>
                </div>

                {!user ?
                    <div className="chatbot-login-banner">
                        <p>Please login to have your chat-logs stored</p>
                    </div>
                    :
                    null
                }

                <div className="chatbot-body">
                    <div className="message-area-container">
                        {messages && messages.map((message: any, key: any) => {
                            return (
                                <div className="message-area" key={key}>
                                    {message.role === 'assistant' ?
                                        <div ref={scollBottom} className="system-message reply-message" style={{ backgroundColor: colour }}>
                                            <img src={character.image} className="chatbot-image" width={40} height={40} alt={character.name}></img>
                                            <p>{message.content}</p>
                                        </div>
                                        :
                                        <div ref={scollBottom} className="user-message reply-message">
                                            <p>{message.content}</p>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="settings">
                    <button onClick={() => navigateBack()}>Back</button>
                    <button onClick={() => scrollToTop()}>Scroll to top</button>
                    <button onClick={() => clear()}>Clear</button>
                </div>

                <div className="footer">
                    <input type="text" placeholder="Reply..." onChange={(e: any) => setPrompt(e.target.value)}  onKeyDown={(e : any) => handleOnKeyDown(e)} ></input>

                    {loading && loading ? (
                        <div className='animationHolder'>
                            <div className='loadingAnimation'>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
                    )
                        :
                        null
                    }

                    <div>
                        <img src={SendButton.src} className="submit-button" onClick={(e: any) => handleSubmit(e)} alt='Send' />
                    </div>

                </div>

            </div>


        </main>
    )

}


export default Chatbot
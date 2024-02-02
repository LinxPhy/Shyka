'use client'

import { useEffect, useState } from "react";
import Chatbots from "../_files/Chatbots"
import Link from "next/link"
import saveToRecent from "./saveToLocalStorage";


const AllChatbots = () => {

    const [loading, setLoading] = useState(false)
    const chatbots = Chatbots.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    useEffect(() => {
        setLoading(true);
    }, []);


    const handleImageLoad = () => {
        setLoading(true);
    };

    return (
        <section className="AllChatbots">

            <div className="title-section">
                <h2>All Chatbots</h2>
            </div>
            
            <div className="chatbots-reccomendations">
                {chatbots.map((chatbot: any) => {
                    return (
                        <Link href={`/chatbots/${chatbot.alias}`} key={chatbot.id}>
                            <div className="chatbot-option" onClick={() => saveToRecent(chatbot.alias)}>
                                <img src={chatbot.image} alt="ChatbotImage" loading="lazy" className={`smooth-image image-${loading ? 'visible' : 'hidden'}`} onLoad={() => handleImageLoad}></img>
                                <h3>{chatbot.name}</h3>
                                {chatbot.anime? <p>{chatbot.anime}</p> : <p>{chatbot.category}</p>}
                            </div>
                        </Link>
                    )
                })}
            </div>



            
        </section>
    )

}

export default AllChatbots
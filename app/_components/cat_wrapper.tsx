'use client'
import Chatbots from "../_files/Chatbots"
import { useEffect, useRef, useState } from "react"

import Link from "next/link"
import saveToRecent from "./saveToLocalStorage"

function Wrapper(props : any) {

    const categories = props.data.categories

    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState('celebrities')
    const ref = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    
    const unfiltered = Chatbots.filter((chatbot : any) => {
        return chatbot.category === selection
    }) 

    const chatbots = unfiltered.sort((a : any, b : any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) 
    

    const scrollX = (amount: number) => {

        const value = (wrapper.current?.clientWidth) as number * amount || 1000

        if (ref && ref.current) {
            ref.current.scrollLeft += value;
        }
    }

    const resetScrollX = () => {

        if (ref && ref.current) {
            ref.current.scrollLeft = 0
        }

    }

    

    useEffect(() => {
        setLoading(true);
    }, []);


    return (
        <div className="reccomendations-wrapper category-wrapper" ref={wrapper}>

            <div className="recc-buttons buttons-target" >
                {categories.map((category : any, key : number) => {
                    return(
                        <button className={`buttonStyle2 ${selection === category? 'selected' : ''}`} key={key} onClick={() => {setSelection(category);resetScrollX()}}>{category}</button>
                    )
                })}
            </div>
            
            <div className="chatbots-reccomendations" ref={ref}>
                {chatbots.map((chatbot: any) => {
                    return (
                        <Link href={`/chatbots/${chatbot.alias}`} key={chatbot.id}>
                            <div className="chatbot-option" onClick={() => saveToRecent(chatbot.alias)}>
                                <img src={chatbot.image} alt="ChatbotImage" loading="lazy"></img>
                                <h3>{chatbot.name}</h3>
                                <p>{chatbot.anime}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
           

            <div className= {`left-button nav-buttons`} onClick={() => scrollX(-1)}>
                <span className="material-symbols-rounded arrow">
                    chevron_left
                </span>
            </div>

            <div className="right-button nav-buttons" onClick={() => scrollX(1)}>
                <span className="material-symbols-rounded arrow">
                    chevron_right
                </span>
            </div>
        </div>
    )
}

export default Wrapper
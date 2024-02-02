'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Chatbots from "../_files/Chatbots"
import saveToRecent from "./saveToLocalStorage"

function Recent() {

    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [items, setItems]: any = useState([])
    const [checkStorage, setStorage]: any = useState("")
    const ref = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)

    const scrollX = (amount: number) => {

        const value = (wrapper.current?.clientWidth) as number * amount || 1000

        if (ref && ref.current) {
            ref.current.scrollLeft += value;
        }
    }

    // useEffect(() => {
    //     let check = localStorage.getItem("Items")
    //     setStorage(check)
    // }, [])

    useEffect(() => {
        setPageLoading(true)
        const getItems: any = localStorage.getItem("Items")
        const list: any = getItems && getItems.split(',') ? getItems.split(',') : getItems || []

        const chatbot: any = Chatbots.filter((chatbot: any) => {
            return list.includes(chatbot.alias.toLowerCase())
        })

        setItems(chatbot)
        setPageLoading(false)

    }, [])

    useEffect(() => {
        setLoading(true);
    }, []);

    const handleImageLoad = () => {
        setLoading(true);
    };

    console.log(items.length)

    return (

        <>
            <section className="recommendations reccomendations-wrapper recent" ref={wrapper}>

                {items.length > 0 && (

                    <div className="title-section">
                        <h2>Recent</h2>
                    </div>

                )}


                <div className="chatbots-reccomendations" ref={ref}>

                    {(pageLoading && items.length > 0) ? (
                        
                        <>      
                            {[1, 2].map((val: any, key: number) => {
                                return (
                                    <div className="chatbot-option-nothing" key={key}></div>
                                )

                            })}
                        
                        </>
                     
                    ) : (
                        <>
                            {
                                items.map((chatbot: any) => {
                                    return (
                                        <Link href={`/chatbots/${chatbot.alias}`} key={chatbot.id}>
                                            <div className="chatbot-option" onClick={() => saveToRecent(chatbot.alias)}>
                                                <img src={chatbot.image} alt="ChatbotImage" className={`smooth-image image-${loading ? 'visible' : 'hidden'}`} onLoad={() => handleImageLoad}></img>
                                                <h3>{chatbot.name}</h3>
                                                <p>{chatbot.anime}</p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </>
                    )}

                </div>

                {items.length > 0 && (

                    <>
                        <div className="left-button nav-buttons" onClick={() => scrollX(-1)}>
                            <span className="material-symbols-rounded arrow">
                                chevron_left
                            </span>
                        </div>

                        <div className="right-button nav-buttons" onClick={() => scrollX(1)}>
                            <span className="material-symbols-rounded arrow">
                                chevron_right
                            </span>
                        </div>
                    </>
                )}

            </section>
        </>
    )

}

export default Recent
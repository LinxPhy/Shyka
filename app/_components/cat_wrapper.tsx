'use client'
import Chatbots from "../_files/Chatbots"
import { useEffect, useRef, useState } from "react"

import Link from "next/link"

function Wrapper(props : any) {

    const categories = props.data.categories

    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState('anime')
    const ref = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
  
    const [startX, setStartX] = useState<number | null>(null);
    
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


    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startX !== null) {
            let diff = startX - e.touches[0].clientX ;
            diff = diff > 0 ? diff + 300 : diff - 300
            if (ref && ref.current) {
                ref.current.scrollLeft += diff;
            }
        }
    };

    const handleTouchEnd = () => {
        setStartX(null);
    };


    useEffect(() => {
        setLoading(true);
    }, []);


    const handleImageLoad = () => {
        setLoading(true);
    };

    const handleSelection = (category : string) => {
        localStorage.setItem('selection', category )
    }

    return (
        <div className="reccomendations-wrapper category-wrapper" ref={wrapper}>

            <div className="recc-buttons buttons-target" >
                {categories.map((category : any, key : number) => {
                    return(
                        <button className={`buttonStyle2 ${selection === category? 'selected' : ''}`} key={key} onClick={() => {setSelection(category);resetScrollX()}}>{category}</button>
                    )
                })}
            </div>
            
            <div className="chatbots-reccomendations" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} ref={ref}>
                {chatbots.map((chatbot: any) => {
                    return (
                        <Link href={`/chatbots/${chatbot.alias}`} key={chatbot.id}>
                            <div className="chatbot-option" >
                                <img src={chatbot.image} alt="ChatbotImage" className={`smooth-image image-${loading ? 'visible' : 'hidden'}`} onLoad={() => handleImageLoad}></img>
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
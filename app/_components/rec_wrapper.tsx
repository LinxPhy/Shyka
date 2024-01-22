'use client'
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

function Wrapper(props: any) {

    const [loading, setLoading] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const [startX, setStartX] = useState<number | null>(null);
    const data = props.data

    const scrollX = (amount: number) => {

        const value = (ref.current?.clientWidth) as number * amount || 1000

        if (ref && ref.current) {
            ref.current.scrollLeft += value;
        }

    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startX !== null) {
            let diff = startX - e.touches[0].clientX;
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


    return (
        <div className="reccomendations-wrapper" ref={wrapper}>

            <div className="chatbots-reccomendations" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
                ref={ref}>
                {data.map((chatbot: any) => {
                    return (
                        <Link href={`/chatbots/${chatbot.alias}`} key={chatbot.id}>
                            <div className="chatbot-option" >
                                <img src={chatbot.image} className={`smooth-image image-${loading ? 'visible' : 'hidden'}`} onLoad={() => handleImageLoad} alt="ChatbotImage"></img>
                                <h3>{chatbot.name}</h3>
                            </div>
                        </Link>
                    )
                })}
            </div>

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
        </div>
    )
}

export default Wrapper
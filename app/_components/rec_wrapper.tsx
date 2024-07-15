'use client'
import { useRef} from "react"
import Link from "next/link"

function Wrapper(props: any) {
    const ref = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const data = props.data

    const scrollX = (amount: number) => {

        const value = (ref.current?.clientWidth) as number * amount || 1000

        if (ref && ref.current) {
            ref.current.scrollLeft += value;
        }

    }

    return (
        <div className="reccomendations-wrapper" ref={wrapper}>

            <div className="chatbots-reccomendations"
                ref={ref}>
                {data.map((chatbot: any) => {   
                    return (
                        <Link href={`/chatbots/${chatbot.alias}`} key={chatbot.id}>
                            <div className="chatbot-option">
                                <img src={chatbot.image} loading="eager" alt="ChatbotImage"></img>
                                <div className="chatbot-option-area">
                                    <h3>{chatbot.name}</h3>
                                    <p>{chatbot.description}</p>
                                </div>
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
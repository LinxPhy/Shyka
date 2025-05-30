import Link from "next/link"
import Chatbot from "@/app/components/chatbot/chatbot"
import styles from '@/app/(pages)/(home)/home.module.css'
import Carousel from "@/app/components/carousel/carousel"

export default function Flavour({ chatbots }: { chatbots: Chatbot[] }) {

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <h2>Flavour of the week</h2>
            </div>
            <Carousel>
                <div className={styles.flavourChatbot}>
                    {chatbots && chatbots.map((chatbot: Chatbot) => (
                        <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                            <Chatbot chatbot={chatbot} />
                        </Link>
                    ))}
                </div>
            </Carousel>
        </section>
    )

}


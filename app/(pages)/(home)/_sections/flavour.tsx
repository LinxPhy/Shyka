'use client'
import Link from "next/link"
import Chatbot from "@/app/components/chatbot/chatbot"
import styles from '@/app/(pages)/(home)/home.module.css'
import Carousel from "@/app/components/carousel/carousel"
import { useQuery } from "@tanstack/react-query";

export default function Flavour({ chatbots }: { chatbots: Chatbot[] }) {

    const { data } = useQuery({
        queryKey: ['flavour'],
        queryFn: () => {
            return chatbots
        },
        initialData: chatbots,
    })

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <h2>Flavour of the week</h2>
            </div>
            <Carousel>
                <div className={styles.flavourChatbot}>
                    {data && data.map((chatbot: Chatbot) => (
                        <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                            <Chatbot chatbot={chatbot} />
                        </Link>
                    ))}
                </div>
            </Carousel>
        </section>
    )

}


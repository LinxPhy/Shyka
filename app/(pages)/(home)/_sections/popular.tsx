'use client'
import Chatbot from "@/app/components/chatbot/chatbot"
import styles from '@/app/(pages)/(home)/home.module.css'
import Link from 'next/link'
import { useQuery } from "@tanstack/react-query"

export default function Popular({ chatbots }: { chatbots: Chatbot[] }) {

    const { data } = useQuery({
        queryKey: ['popular'],
        queryFn: () => {
            return chatbots
        },
        initialData: chatbots,
    })

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <h2>Popular</h2>
            </div>
            <div className={styles.chatbots}>
                { data && data.slice(0, 14).map((chatbot: Chatbot) => (
                    <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                        <Chatbot chatbot={chatbot}/>
                    </Link>
                ))}
            </div>
        </section>
    )

}


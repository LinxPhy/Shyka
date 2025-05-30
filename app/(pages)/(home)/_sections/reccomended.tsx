'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Chatbot from "@/app/components/chatbot/chatbot"
import styles from '@/app/(pages)/(home)/home.module.css'
import axios from 'axios'

async function getChatbots({ category }: { category: string }) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${category}`, { withCredentials: true })
    return response.data
}

export default function Reccomended({ chatbots, category }: { chatbots: Chatbot[], category: string[] }) {

    const [items, setItems] = useState(chatbots)
    const [selection, setSelection] = useState('reccomended')

    useEffect(() => {
        if (selection === 'reccomended') { setItems(chatbots); return }

        const handleRequest = async () => {
            const data = await getChatbots({ category: selection })
            setItems(data)
        }

        handleRequest()

    }, [selection])

return (
    <section className={styles.container}>
        <div className={styles.title}>
            <h2>Reccomendations</h2>
        </div>
        <div className={styles.categories}>
            <button 
                className={`${styles.category} ${selection === 'reccomended' && styles.active}`}
                onClick={() => setSelection('reccomended')}
            >
                Reccomended
            </button>

            {category && category.map((category: string) => (
                <button
                    className={`${styles.category} ${selection === category && styles.active}`}
                    key={category}
                    onClick={() => setSelection(category)}
                >
                    {category}
                </button>
            ))}
        </div>
        <div className={styles.chatbots}>
            {items && items.slice(0, 21).map((chatbot: Chatbot) => (
                <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                    <Chatbot chatbot={chatbot} />
                </Link>
            ))}
        </div>
    </section>
)


}
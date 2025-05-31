'use client'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Chatbot from "@/app/components/chatbot/chatbot"
import styles from '@/app/(pages)/(home)/home.module.css'
import axios from 'axios'

async function getChatbots({ category }: { category: string }) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${category}`)
    return response.data
}

export default function Reccomended({ chatbots, category }: { chatbots: Chatbot[], category: string[] }) {

    const query = useQueryClient();
    const [selection, setSelection] = useState('reccomended')

    useEffect(() => {
        query.setQueryData(['reccomended'], chatbots);
    }, [chatbots, query]);


    const { data : items, isLoading } = useQuery({
        queryKey: ['reccomended', selection],
        queryFn: async () => {
            if (selection === 'reccomended') {
                return chatbots
            } else {
                return await getChatbots({ category: selection })
            }
        },
        initialData: chatbots,
    })

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
                {items && items.map((chatbot: Chatbot) => (
                    <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                        <Chatbot chatbot={chatbot} />
                    </Link>
                ))}
            </div>
        </section>
    )


}


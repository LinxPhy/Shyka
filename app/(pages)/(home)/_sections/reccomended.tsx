'use client'
import { useContext, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '@/app/components/contextProvider'
import Link from 'next/link'
import Chatbot from "@/app/components/chatbot/chatbot"
import styles from '@/app/(pages)/(home)/home.module.css'
import axios from 'axios'

async function getChatbots({ category, user_id }: { category: string, user_id: string }) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${category}`, { params: { user_id } })
    return response.data
}

export default function Reccomended({ chatbots, category }: { chatbots: Chatbot[], category: string[] }) {

    const { signedIn, user: { user_id } } = useContext(AuthContext) as AuthContext;

    const query = useQueryClient();
    const [selection, setSelection] = useState('reccomended')

    useEffect(() => {
        query.setQueryData(['reccomended', selection], chatbots);
    }, [chatbots, selection, query]);


    const { data: items, isLoading, error } = useQuery({
        queryKey: ['reccomended', selection],
        queryFn: async () => {
            if (selection === 'reccomended') {
                return chatbots
            } else {
                return await getChatbots({ category: selection, user_id })
            }
        },
        placeholderData: chatbots,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

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


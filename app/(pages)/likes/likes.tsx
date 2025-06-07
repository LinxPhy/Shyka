'use client'
import Link from 'next/link'
import styles from './likes.module.css'
import Chatbot from '@/app/components/chatbot/chatbot'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import axios from 'axios'

const getChatbotLikes = async ({ user_id, page }: { user_id: string, page: number }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/chatbot_likes`, { params: { user_id, page } })
    return response.data
}

export default function Likes({ chatbots, user_id, hasMore }: { chatbots: Chatbot[], hasMore: boolean, user_id: string }) {

    const [items, setItems] = useState(chatbots)
    const [page, setPage] = useState(1)

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['likes', page],
        queryFn: () => getChatbotLikes({ user_id, page }),
        initialData: [],
        enabled: page > 1
    })

    useEffect(() => {
        if (!data || data.length === 0) return
        setItems((prev) => [...prev, ...data.likes])
    }, [data])

    const moreData = () => {
        if (page === 1) { return hasMore }
        return data.hasMore
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>"An error has occurred"</div>

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <h1>Likes</h1>
            </div>

            <div className={styles.chatbots}>
                {items && items.map((chatbot: Chatbot) => (
                    <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                        <Chatbot chatbot={chatbot} />
                    </Link>
                ))}
            </div>

            <div className={styles.loadMore}>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={isFetching || !moreData()}>
                    Load more
                </button>
            </div>

        </section>
    )


}
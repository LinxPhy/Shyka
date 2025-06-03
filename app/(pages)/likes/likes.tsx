'use client'
import Link from 'next/link'
import styles from './likes.module.css'
import Chatbot from '@/app/components/chatbot/chatbot'
import InfiniteScrollContainer from '@/app/components/infiniteScroll'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'

const getChatbotLikes = async (page: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/chatbot_likes`, { params: { page } })
    return response.data
}

export default function Likes({ chatbots }: { chatbots: Chatbot[] }) {

    const { data, status, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['chatbot_likes'],
        queryFn: ({ pageParam = 1 }) => getChatbotLikes(pageParam),
        initialPageParam: 1,
        initialData: { pages: [chatbots], pageParams: [1] },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    if ((status as 'idle' | 'pending' | 'error' | 'success') === 'pending') {
        return <div>Loading...</div>;
    }
    if (status === 'error') return (<div>"An error has occurred"</div>)

    const bots = data.pages.flatMap(page => page)

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <h1>Likes</h1>
            </div>

            <div className={styles.chatbots}>
                <InfiniteScrollContainer onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
                    {bots.map((chatbot: Chatbot) => (
                        <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                            <Chatbot chatbot={chatbot} />
                        </Link>
                    ))}
                </InfiniteScrollContainer>
            </div>
        </section>
    )


}
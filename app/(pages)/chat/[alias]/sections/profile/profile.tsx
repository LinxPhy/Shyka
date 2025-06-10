'use client'
import CommentsArea from "./comments/comments_area"
import Image from "next/image"
import styles from "./profile.module.css"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getStats = async (alias: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/stats`, { params: { alias } });
    return response.data
}


export default function Profile({ chatbot }: { chatbot: Chatbot }) {

    const { data, isLoading, error } = useQuery({
        queryKey: ['stats', chatbot.alias],
        queryFn: () => getStats(chatbot.alias),
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>


    return (
        <aside className={styles.profile}>
            <div className={styles.image}>
                <Image src={chatbot.image} alt={chatbot.name} width={231} height={320} />
            </div>

            <div className={styles.info}>
                <h4>{chatbot.name}</h4>
                <p className={styles.description}>{chatbot.description}</p>
            </div>


            <div className={styles.stats}>

                <div>
                    <h4>Messages</h4>
                    <p>{data.messages}</p>
                </div>

                <div>
                    <h4>Comments</h4>
                    <p>{data.comments}</p>
                </div>

                <div>
                    <h4>Likes</h4>
                    <p>{data.likes}</p>
                </div>

            </div>

            <CommentsArea />

        </aside>
    )

}
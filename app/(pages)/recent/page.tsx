'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/app/components/contextProvider';
import axios from "axios"
import styles from './recent.module.css'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Chatbot from '@/app/components/chatbot/chatbot';



const getRecentChatbots = async (user_id: string, recent: string[]) => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/recent`, { params: { user_id, recent: recent.toString() } })
    return response.data
}

export default function Recent(){

    const { user: { user_id } } = useContext(AuthContext) as AuthContext;
    
    let [recent, setRecent] = useState<string[]>([])

    const { data, isLoading, error } = useQuery({
        queryKey: ['recent', recent],
        queryFn: () => recent.length > 0 ? getRecentChatbots(user_id, recent) : [],
        initialData: [],
        enabled: recent.length > 0 
    })

    useEffect(() => {
        try {
            setRecent(JSON.parse(localStorage.getItem('recent') as string))
        } catch (error) {
            setRecent([])
            localStorage.setItem('recent', JSON.stringify([]))
        }
    }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>"An error has occurred"</div>

    return (
        <main className={styles.container}>
            <div className='content'>
                <div className={styles.title}>
                    <h1>Recent</h1>
                </div>

                <div className={styles.chatbots}>
                    {data && Array.isArray(data) && data.map((chatbot: Chatbot) => (
                        <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                            <Chatbot chatbot={chatbot} />
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )



}
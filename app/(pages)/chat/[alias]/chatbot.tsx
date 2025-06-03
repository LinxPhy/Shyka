'use client'
import axios from "axios"
import Header from "./sections/header"
import Footer from "./sections/footer"
import Body from "./sections/body"
import styles from "./chat.module.css"
import Description from "./sections/description"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/app/components/contextProvider"

const getLogs = async (alias: string, user_id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/logs/${alias}`, { params: { user_id } })
    return response.data
}

export default function Chatbot({ chatbot }: { chatbot: Chatbot }) {

    const { signedIn, user: { user_id } } = useContext(AuthContext) as AuthContext;

    const alias = chatbot.alias

    const { data: logs, isLoading, error } = useQuery({
        queryKey: ['logs', chatbot.alias],
        queryFn: () => getLogs(alias, user_id),
    })

    useEffect(() => {

        try{
            let recent : string = localStorage.getItem('recent') as string
            let recentArray : string[] = recent ? JSON.parse(recent) : []
            
            if (recentArray.includes(alias)){
            
                recentArray.splice(recentArray.indexOf(alias), 1)
                recentArray.unshift(alias)
                localStorage.setItem('recent', JSON.stringify(recentArray))

            } else {

                if (recentArray.length >= 9) {
                    recentArray = recentArray.slice(0, 9)
                }
                recentArray.unshift(alias)
                localStorage.setItem('recent', JSON.stringify(recentArray))    
            }
            

        } catch (e) {
            localStorage.setItem('recent', JSON.stringify([]))
        }
        
    }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (

        <div className={styles.chatbot}>
            <Header chatbot={chatbot} />
            <Description chatbot={chatbot} />
            <Body chatbot={chatbot} logs={logs} />
            <Footer chatbot={chatbot} />
        </div>

    )
}
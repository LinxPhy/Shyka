'use client'
import axios from "axios"
import Header from "./header/header"
import Footer from "./footer/footer"
import Body from "./body/body"
import styles from "./chat.module.css"
import { useQuery } from "@tanstack/react-query"
import Description from "./description/description"
import { useContext } from "react"
import { AuthContext } from "@/app/components/contextProvider"

const getLogs = async (alias: string, user_id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/logs/${alias}`, { params: { user_id } })
    return response.data
}

export default function Chatbot({ chatbot }: { chatbot: Chatbot }) {

    const { signedIn, user: { user_id } }: any = useContext(AuthContext);

    const alias = chatbot.alias

    const { data: logs, isLoading, error } = useQuery({
        queryKey: ['logs', chatbot.alias],
        queryFn: () => getLogs(alias, user_id),
    })

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
import { NextRequest } from "next/server"
import axios from "axios"
import styles from "./chat.module.css"
import Chatbot from "./chatbot"
import Image from "next/image"
import ReactQueryProvider from "@/app/components/reactQueryProvider"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/app/auth"


export default async function Chat(request: NextRequest) {

    const alias = await (request as any)?.params
    const aliasName = alias?.alias

    const session = await auth() 
    const user_id = session?.user?.user_id;

    const data = await axios.get(`${process.env.SERVER_URL}/chatbot/${aliasName}`, { params: { user_id } })
    const chatbot = data.data

    return (
        <main className={styles.chatbot_page}>
            <div className={`${styles.container} `}>
                <Image className={styles.background_image} src={chatbot.image} alt={''} width={1664} height={2304} />
                <SessionProvider>
                    <ReactQueryProvider>
                        {chatbot && <Chatbot chatbot={chatbot} />}
                    </ReactQueryProvider>
                </SessionProvider>
            </div>
            <aside>
            </aside>
        </main>
    )

}
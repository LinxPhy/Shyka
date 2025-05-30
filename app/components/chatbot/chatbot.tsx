import styles from "./chatbot.module.css"
import Image from "next/image"
import Messages from "./stats/messages"
import Likes from "./stats/likes" 

export default function Chatbot({ chatbot }: { chatbot: Chatbot }) {

    return (
        <div className={styles.chatbot} key={chatbot.chatbot_id}>
            <Image className={styles.chatbot_image} src={chatbot.image} alt={chatbot.name} width={1664} height={2304} quality={100} />

            <div className={styles.info}>
                <div className={styles.name}>
                    <h4>{chatbot.name}</h4>
                    <p>{chatbot.description}</p>
                </div>

                <div className={styles.stats}>
                    <Messages message={chatbot.messages} />
                    <Likes userLikes={chatbot.likes} userVote={chatbot.voted} alias={chatbot.alias} email={''} />
                </div>
            </div>
        </div>
    )

}
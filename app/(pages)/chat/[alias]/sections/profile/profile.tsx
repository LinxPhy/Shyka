import Image from "next/image"
import styles from "./profile.module.css"

export default function Profile({ chatbot }: { chatbot: Chatbot }) {
    
    return (
        <aside className={styles.profile}>
            <Image src={chatbot.image} alt={chatbot.name} width={231} height={320} />
        </aside>
    )

}
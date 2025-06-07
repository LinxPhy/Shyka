import Image from "next/image"
import styles from "./profile.module.css"
import Comments from "./comments/comments"

export default function Profile({ chatbot }: { chatbot: Chatbot }) {

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
                    <p>50</p>
                </div>

                <div>
                    <h4>Comments</h4>
                    <p>50</p>
                </div>

                <div>
                    <h4>Likes</h4>
                    <p>50</p>
                </div>

            </div>

            <Comments />

        </aside>
    )

}
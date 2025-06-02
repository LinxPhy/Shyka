import Image from "next/image"
import styles from '../chat.module.css'

export default function Body({ chatbot, logs }: { chatbot: Chatbot, logs: Log[] }) {

    const { name, image, initialMessage, colour } = chatbot


    return (
        <section className={styles.body}>

            {logs && logs.map((log: Log, index: number) => (
                log.role === 'user' ? (
                    <div key={index} className={`${styles.message} ${styles.userMessage}`}>
                        <p>{log.content}</p>
                    </div>
                ) : (
                    <div key={index} className={`${styles.message} ${styles.systemMessage}`}>
                        <Image src={image} width={30} height={30} alt={""} loading='lazy' />
                        <p style={{ backgroundColor: colour }}>{log.content}</p>
                    </div>
                )
            ))}

            <div className={`${styles.message} ${styles.systemMessage}`}>
                <Image src={image} width={30} height={30} alt={name} loading='eager' />
                <p style={{ backgroundColor: colour }}>{initialMessage}</p>
            </div>

        </section>
    )
}
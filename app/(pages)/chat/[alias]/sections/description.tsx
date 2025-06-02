import styles from '../chat.module.css'

export default function Description({ chatbot }: { chatbot: Chatbot }) {
    
    const { description, colour } = chatbot

    return (
        <section className={styles.description} style={{ backgroundColor: colour }}>
            <p ><span>Description:</span> {description}</p>
        </section>
    )

}
import Chat from '@/app/icons/chat.png'
import Heart from '@/app/icons/heart.png'
import styles from '../chat.module.css'
import Image from "next/image"

export default function Header({ chatbot }: { chatbot: Chatbot }) {

    const { image, name } = chatbot

    return (
        <section className={styles.header}>
            <Image src={image} alt={name} width={60} height={60} />
            <h2>{name}</h2>
            
            <div className={styles.stats}>
                <div>
                    <Image src={Chat} alt="" width={10} height={10} />
                    <span>10.5k</span>
                </div>

                <span>|</span>

                <div>
                    <Image src={Heart} alt="" width={10} height={10} />
                    <span>10.5k</span>
                </div>
            </div>
        </section>
    )
}
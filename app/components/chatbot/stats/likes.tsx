'use client'
import Image from "next/image"
import GreyHeart from '@/app/icons/grey_heart.png'
import RedHeart from '@/app/icons/red_heart.png'
import { AuthContext } from '../../contextProvider';
import { useState, useContext, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import styles from '../chatbot.module.css'
import axios from "axios"

const likeButton = async (email: string, alias: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/likes`, { email, alias })
    return response.data
}

export default function Likes({ userLikes, userVote, alias }: { userLikes: number, userVote: number, alias: string }) {


    const [likes, setLikes] = useState(userLikes)
    const [voted, setVoted] = useState(userVote)
    const [loading, setLoading] = useState(false)
    const { signedIn, user: { email } } : any = useContext(AuthContext);
    const router = useRouter()

    const handleLike = async (event: MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        event.stopPropagation()
        if (loading) return
        if (!signedIn) return router.push('/api/auth/login')

        setLoading(true)

        try {
            const response = await likeButton(email, alias)
            if (response) {
                setLikes(response.likes)
                setVoted(response.voted)
            }
        } catch (err) {
            console.error("Failed to like:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.likes}>
            <Image onClick={(e) => handleLike(e)} src={voted ? RedHeart : GreyHeart} alt="Heart" width={10} height={10} />
            <span>{likes}</span>
        </div>
    )

}
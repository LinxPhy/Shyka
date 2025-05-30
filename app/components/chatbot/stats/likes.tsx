'use client'
import Image from "next/image"
import GreyHeart from '@/app/icons/grey_heart.png'
import RedHeart from '@/app/icons/red_heart.png'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const likeButton = async (email: string, alias: string) => {
    const response = await axios.post(`${process.env.SERVER_URL}/likes`, { email, alias })
    return response.data
}

export default function Likes({ userLikes, userVote, alias, email }: { userLikes: number, userVote: number, alias: string, email: string }) {

    const [likes, setLikes] = useState(userLikes)
    const [voted, setVoted] = useState(userVote)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLike = async () => {
        if (loading) return
        if (!email) return router.push('/api/auth/login')

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
        <div>
            <Image onClick={() => handleLike()} src={voted ? RedHeart : GreyHeart} alt="Heart" width={10} height={10} />
            <span>{likes}</span>
        </div>
    )

}
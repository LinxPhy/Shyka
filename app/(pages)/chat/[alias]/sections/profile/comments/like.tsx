'use client'
import Image from "next/image"
import GreyHeart from '@/app/icons/grey_heart.png'
import RedHeart from '@/app/icons/red_heart.png'
import styles from '../profile.module.css'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const likeButton = async(user_id: number, comment_id: number) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/like_comment`, { user_id, comment_id });
    return response.data
}

export default function CommentLike({ likes, voted, comment_id, user_id, alias }: { likes: number, voted: number, comment_id: number, user_id: number, alias: string}) {

    const [liked, setLiked] = useState(voted);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async () => {
            if (loading) return
            if (!user_id) return router.push('/api/auth/login')

            setLoading(true)
            const response = await likeButton(user_id, comment_id)
            if (response) {
                return ({
                    likes: response.likes,
                    voted: response.voted
                })
            }
        
            
        },
        onSuccess: (data) => {
            if (!data) return
            
            const { likes, voted } = data

            queryClient.setQueryData(['comments', alias], (oldData: any) => {
                return oldData.map((comment: any) => {
                    if (comment.comment_id === comment_id) {
                        return {
                            ...comment,
                            likes,
                            voted
                        }
                    }
                    return comment
                })
            })

            setLiked(voted)
            
            
        }, onError: (error) => { console.log(error) },
        onSettled: () => { setLoading(false) }
    })


    return (
        <div className={styles.icon}>
            <Image onClick={() => mutation.mutate()} src={liked ? RedHeart : GreyHeart} alt="" width={10} height={10} />
            <span>{likes}</span>
        </div>
    )

}
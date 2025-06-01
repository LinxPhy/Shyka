'use client'
import Image from "next/image"
import GreyHeart from '@/app/icons/grey_heart.png'
import RedHeart from '@/app/icons/red_heart.png'
import { AuthContext } from '../../contextProvider';
import { useState, useContext, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import styles from '../chatbot.module.css'
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const likeButton = async (user_id: string, alias: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/likes`, { user_id, alias })
    return response.data
}

export default function Likes({ userLikes, userVote, alias }: { userLikes: number, userVote: number, alias: string }) {

    const { signedIn, user: { user_id } }: any = useContext(AuthContext);

    const queryClient = useQueryClient();

    // const [likes, setLikes] = useState(userLikes)
    // const [voted, setVoted] = useState(userVote)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const getChatbotData = (): { likes: number; voted: number } => {
        const queryCache = queryClient.getQueryCache();

        for (const query of queryCache.getAll()) {
            const chatbots = query.state.data as Chatbot[];

            if (!Array.isArray(chatbots)) continue;

            const found = chatbots.find((cb) => cb.alias === alias);
            if (found) return { likes: found.likes, voted: found.voted };
        }

        // fallback to initial props
        return { likes: userLikes, voted: userVote };
    };

    const { likes, voted } = getChatbotData();

    const mutation = useMutation({

        mutationFn: async () => {

            if (loading) return
            if (!signedIn) return router.push('/api/auth/login')
            setLoading(true)
            const response = await likeButton(user_id, alias)

            if (response) {
                return ({
                    likes: response.likes,
                    voted: response.voted
                })
            }

        },
        onSuccess: async (data) => {
            if (!data) return
            const { likes, voted } = data

            // setLikes(likes);
            // setVoted(voted);

            const queryCache = queryClient.getQueryCache()

            for (const query of queryCache.getAll()) {
                const queryKey = query.queryKey
                const chatbots = query.state.data as Chatbot[]

                if (!Array.isArray(chatbots)) continue;

                const updated = chatbots.map((chatbot: Chatbot) => {
                    if (chatbot.alias === alias) {
                        return {
                            ...chatbot,
                            likes,
                            voted
                        };
                    }
                    return chatbot;
                })

                queryClient.setQueryData(queryKey, updated)

            }
        },
        onError: async (err) => {
            console.error("Failed to like:", err)
        },
        onSettled: async () => {
            setLoading(false)
        }
    })



    const handleLike = async (event: MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        event.stopPropagation()
        mutation.mutate()
    }

    return (
        <div className={styles.likes}>
            <Image onClick={(e) => handleLike(e)} src={voted ? RedHeart : GreyHeart} alt="Heart" width={10} height={10} />
            <span>{likes}</span>
        </div>
    )

}


// const handleLike = async (event: MouseEvent<HTMLImageElement>) => {
//     event.preventDefault();
//     event.stopPropagation()
//     if (loading) return
//     if (!signedIn) return router.push('/api/auth/login')

//     setLoading(true)

//     try {
//         const response = await likeButton(user_id, alias)
//         if (response) {
//             setLikes(response.likes)
//             setVoted(response.voted)
//         }
//     } catch (err) {
//         console.error("Failed to like:", err)
//     } finally {
//         setLoading(false)
//     }
// }
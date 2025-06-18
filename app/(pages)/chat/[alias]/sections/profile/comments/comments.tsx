import Image from "next/image"
import timeAgo from "@/app/components/timeAgo"
import { usePathname } from 'next/navigation'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import styles from "../profile.module.css"
import Footer from "./footer"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/components/contextProvider"
import ReplyArea from "../replies/reply_area"

const getComments = async ({ user_id, alias, page }: { user_id: string, alias: string, page: number }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${alias}`, { params: { user_id, page } });
    console.log(response.data)
    return response.data
}

export default function Comments() {

    const { signedIn, user: { user_id } }: any = useContext(AuthContext);

    const pathname = usePathname();

    const [page, setPage] = useState(1)
    const [items, setItems] = useState<Comments[]>([]);
    const alias: string = pathname.split('/')[2];

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['comments', alias, page],
        queryFn: () => getComments({ user_id, alias, page }),
        // refetchInterval: 30000
    })

    useEffect(() => {
        if (!data || data.length === 0) return
        setItems((prev) => [...prev, ...data.data])
    }, [data])


    const moreData = () => {
        return data.hasMore
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <div className={styles.comments}>
            {items && items.map((comment: Comments) => (
                <div className={styles.main} key={comment.comment_id}>

                    <div className={styles.comment}>

                        <div className={styles.avatar}>
                            <Image src={comment.image} alt={comment.username} width={40} height={40} />
                        </div>

                        <div className={styles.content}>

                            <div className={styles.header}>
                                <p className={styles.username}>{comment.username}</p>
                                <span className={styles.time}>&#8226; {timeAgo(comment.created_at)}</span>
                            </div>

                            <div className={styles.body}>
                                <p className={styles.text}>{comment.content}</p>
                            </div>

                            <Footer user_id={user_id} comment_id={comment.comment_id} voted={comment.voted} likes={comment.likes} alias={alias} />

                        </div>

                    </div>

                    {/* {comment.replies && comment.replies.map((reply: Replies) => (
                        <ReplyArea
                            key={reply.reply_id}
                            comment_id={comment.comment_id}
                            user_id={user_id}
                            alias={alias}
                            reply={reply}
                            likes={reply.likes}
                            voted={reply.voted}
                        />
                    ))} */}

                </div>

            ))}


            <div>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={isFetching || !moreData()}
                >
                    Load More
                </button>
            </div>
        </div>
    )
}
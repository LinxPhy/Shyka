import Image from "next/image"
import Chat from '@/app/icons/chat.png'
import GreyHeart from '@/app/icons/grey_heart.png'
import Report from '@/app/icons/report.png'
import timeAgo from "@/app/components/timeAgo"
import { usePathname } from 'next/navigation'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import styles from "../profile.module.css"
import Footer from "./footer"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/app/components/contextProvider"

const getComments = async ({ alias }: { alias: string }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${alias}`);
    return response.data
}

export default function Comments() {

    const { signedIn, user: { user_id } }: any = useContext(AuthContext); 
    
    const pathname = usePathname();
    const alias: string = pathname.split('/')[2];

    const { data, isLoading, error } = useQuery({
        queryKey: ['comments', alias],
        queryFn: () => getComments({ alias }),
    })

    useEffect(() => {
        // 
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <div className={styles.comments}>
            {data && data.map((comment: Comments) => (
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

                            <Footer user_id={user_id} comment_id={comment.comment_id} alias={alias} />
                            

                        </div>
                    </div>

                    {comment.replies && comment.replies.map((reply: Replies) => (
                        <div className={styles.replies} key={reply.reply_id}>
                            <div className={styles.reply}>
                                <div className={styles.avatar}>
                                    <Image src={reply.image} alt={reply.username} width={40} height={40} />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.header}>
                                        <p className={styles.username}>{reply.username}</p>
                                        <span className={styles.time}>{timeAgo(reply.created_at)}</span>
                                    </div>
                                    <div className={styles.body}>
                                        <p className={styles.text}>{reply.content}</p>
                                    </div>

                                    <div className={styles.footer}>
                                        <div className={styles.icon}>
                                            <Image src={Chat} alt="" width={10} height={10} />
                                            <span>Reply</span>
                                        </div>
                                        <div className={styles.icon}>
                                            <Image src={GreyHeart} alt="" width={10} height={10} />
                                            <span>7</span>
                                        </div>
                                        <div className={styles.icon}>
                                            <Image src={Report} alt="" width={10} height={10} />
                                            <span>Report</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}



                </div>

            ))}
        </div>
    )
}
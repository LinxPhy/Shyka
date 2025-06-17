import Chat from '@/app/icons/chat.png'
import GreyHeart from '@/app/icons/grey_heart.png'
import Report from '@/app/icons/report.png'
import Image from 'next/image'
import timeAgo from "@/app/components/timeAgo"
import styles from "../profile.module.css"
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import CommentLike from '../comments/like'
import ReplyLike from './like'

export default function ReplyArea({ comment_id, user_id, alias, reply, likes, voted }: { comment_id: number, user_id: number, alias: string, reply: Replies, likes: number, voted: number }) {

    const [replying, setReplying] = useState(false);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const messages = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ( reply_id: number ) => {
            setDisabled(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/add_reply`, { user_id, reply_id, comment_id, message });
            const data = response.data;
            return data
        },
        onSuccess: (data) => {
            messages.setQueryData(['comments', alias], (oldData: any) => {
                return oldData.map((comment: any) => {
                    if (comment.comment_id === comment_id) {
                        return {
                            ...comment,
                            replies: [data, ...comment.replies],
                        }
                    }
                    return comment
                })

            })
            setMessage('')
        },
        onError: (error) => { console.log(error) },
        onSettled: () => { 
            setDisabled(false) 
            setReplying(false)
        }
    })



    return (
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
                        {reply.parent_reply_id &&
                            <div className={styles.replying}>
                                <span>@{reply.replying_username}</span>
                                <p>{reply.replying_content}</p>
                            </div>
                        }
                        <p className={styles.text}>{reply.content}</p>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.icon}>
                            <Image src={Chat} alt="" width={10} height={10} />
                            <span onClick={() => setReplying(!replying)}>Reply</span>
                        </div>
                    
                        <ReplyLike comment_id={comment_id} user_id={user_id} reply_id={reply.reply_id} alias={alias} likes={likes} voted={voted} />

                        <div className={styles.icon}>
                            <Image src={Report} alt="" width={10} height={10} />
                            <span>Report</span>
                        </div>
                    </div>

                    {
                        replying && (
                            <div className={styles.replyInput}>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && mutation.mutate( reply.reply_id )}
                                    disabled={disabled}
                                    maxLength={300}
                                    placeholder="Write a reply..." />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )


}
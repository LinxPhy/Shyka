'use client'
import Image from "next/image"
import Chat from '@/app/icons/chat.png'
import Report from '@/app/icons/report.png'
import axios from "axios"
import styles from "../profile.module.css"
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import CommentLike from "./like"

export default function Footer({ user_id, comment_id, voted, alias, likes }: { user_id: number, comment_id: number, alias: string, voted: number, likes: number }) {

    const [reply, setReply] = useState(false);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const messages = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            setDisabled(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/add_reply`, { user_id, comment_id, message });
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
            setReply(false)
        }
    })


    return (
        <>

            <div className={styles.footer}>

                <div className={styles.icon}>
                    <Image src={Chat} alt="" width={10} height={10} />
                    <span onClick={() => setReply(!reply)} >Reply</span>
                </div>
                
                <CommentLike likes={likes} voted={voted} comment_id={comment_id} user_id={user_id} alias={alias} reply_id={0} />

                <div className={styles.icon}>
                    <Image src={Report} alt="" width={10} height={10} />
                    <span>Report</span>
                </div>

            </div>

            {
                reply && (
                    <div className={styles.replyInput}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && mutation.mutate()}
                            disabled={disabled}
                            maxLength={300}
                            placeholder="Write a reply..." />
                    </div>
                )
            }

        </>
    )


}
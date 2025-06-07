'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import styles from "../profile.module.css"
import Comments from "./comments"
import { useContext, useState } from "react";
import { AuthContext } from "@/app/components/contextProvider";
import axios from "axios";



export default function CommentsArea() {

    const { signedIn, user: { user_id } }: any = useContext(AuthContext);

    const [comment, setComment] = useState('');
    const [disabled, setDisabled] = useState(false);
    const messages = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            setDisabled(true)
            const alias = window.location.pathname.split('/')[2];
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/add_comment`, { user_id, alias, comment });
            const data = response.data;
            return data

        },
        onSuccess: (data ) => { 
            const alias = window.location.pathname.split('/')[2];
            messages.setQueryData(['comments', alias], (oldData: any) => [data, ...oldData]);   
            setComment('')
        },
        onError: (error) => console.log(error),
        onSettled: () => { setDisabled(false) }
    })


    return (
        <div className={styles.commentsContainer}>

            <div className={styles.commentArea}>
                <div className={styles.placeholder}></div>
                <input 
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && mutation.mutate()}
                    disabled={disabled}
                    maxLength={300}
                    placeholder="Write a comment..." 
                />
            </div>

            <Comments />

        </div>
    )


}
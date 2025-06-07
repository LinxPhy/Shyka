'use client'
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import styles from "../profile.module.css"
import axios from "axios"

const getComments = async () => {
    const aliasName = window.location.pathname.split('/')[2];
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${aliasName}`);
    console.log(response.data)
    return response.data
}

export default function Comments() {

    const { data, isLoading, error} = useQuery({
        queryKey: ['comments'],
        queryFn: () => getComments(),
    })
    
    return (
        <div className={styles.commentsContainer}>
            
            <div className={styles.commentArea}>
                <div className={styles.placeholder}></div>
                <input type="text" placeholder="Write a comment..."  />
            </div>

            <div className={styles.comments}>
                {data && data.map((comment: Comments) => (
                    <div className={styles.comment} key={comment.comment_id}>
                        <div className={styles.header}>
                            <div className={styles.placeholder2}></div>
                            
                            <div className={styles.userInfo}>
                                <h4>{comment.username}</h4>
                                <p>{comment.date}</p>
                            </div>
                            
                        </div>
                        <div className={styles.body}>
                            <p>{comment.content}</p>
                        </div>
                        <div className={styles.footer}></div>
                    </div>

                ))}
            </div>

        </div>
    )


}
'use client'
import Image from "next/image"
import GreyHeart from '@/app/icons/grey_heart.png'
import styles from '../profile.module.css'

export default function CommentLike() {

    


    return (
        <div className={styles.icon}>
            <Image src={GreyHeart} alt="" width={10} height={10} />
            <span>7</span>
        </div>
    )

}
import Link from "next/link"
import Image from "next/image"
import Coins from '@/app/icons/coins.png'
import LoginButton from "@/app/components/header/login/login"
import { SessionProvider } from 'next-auth/react'
import styles from "./top-bar.module.css"

export default function TopBar() {

    return (
        <header className={styles.header}>
            <ul>
                <li>
                    <Link href={'/search'}>
                        <input type="text" placeholder="Search" />
                    </Link>
                </li>

                <li className={styles.credits}>
                    <Link href={'/'}>
                        250
                        <Image src={Coins} alt='' width={14} height={14}></Image>
                    </Link>
                </li>

                <SessionProvider>
                    <LoginButton />
                </SessionProvider>

            </ul>
        </header>
    )

}
'use client'
import Image from 'next/image'
import Link from 'next/link'
import Coins from '@/app/icons/coins.png'
import Discover from '@/app/icons/discover.png'
import Home from '@/app/icons/home.png'
import Heart from '@/app/icons/heart.png'
import Prev from '@/app/icons/prev.png'
import Search from '@/app/icons/search.png'
import styles from './header.module.css'
import LoginButton from './login/login'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'

export default function Header() {

    const pathname = usePathname();
    // if (pathname.split('/')[1] === 'chat') return (<></>)

    return (
        <header className={styles.header}>

            <h1>
                <Link href={'/'}>
                    Shyka
                </Link>
            </h1>
            <div className={styles.content}>
                <div className={styles.main}>
                    <ul>
                        <li className={pathname === '/' ? styles.active : ''}>
                            <Link href={'/'}>
                                <Image src={Home} alt='' width={14} height={14}></Image>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className={pathname === '/likes' ? styles.active : ''}>
                            <Link href={'/likes'}>
                                <Image src={Heart} alt='' width={14} height={14}></Image>
                                <p>Likes</p>
                            </Link>
                        </li>
                        <li className={pathname === '/recent' ? styles.active : ''}>
                            <Link href={'/recent'}>
                                <Image src={Prev} alt='' width={14} height={14}></Image>
                                <p>Recent</p>
                            </Link>
                        </li>
                        <li className={pathname === '/explore' ? styles.active : ''}>
                            <Link href={'/explore'}>
                                <Image src={Discover} alt='' width={14} height={14}></Image>
                                <p>Explore</p>
                            </Link>
                        </li>
                        <li className={pathname === '/search' ? styles.active : ''}>
                            <Link href={'/search'}>
                                <Image src={Search} alt='' width={14} height={14}></Image>
                                <p>Search</p>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.more}>
                    <ul>
                        <li className={styles.credits}>
                            <Link href={'/'}>
                                <Image src={Coins} alt='' width={14} height={14}></Image>
                                250 Credits
                            </Link>
                        </li>
                        <SessionProvider>
                            <LoginButton />
                        </SessionProvider>
                    </ul>
                </div>
            </div>

        </header>
    )

}
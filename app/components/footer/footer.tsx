'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "./footer.module.css"
import Twitter from '@/app/icons/twitter_3.png'
import Instagram from '@/app/icons/instagram_3.png'
import { usePathname } from "next/navigation"

export default function Footer() {

    const pathname = usePathname()
    if (pathname.split('/')[1] === 'chat') return (<></>)

    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link href="/">HomePage</Link></li>
                        <li><Link href="/likes">Likes</Link></li>
                        <li><Link href="/recent">Recent</Link></li>
                        <li><Link href="/explore">Explore</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Additional Links</h4>
                    <ul>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/rules">Rules</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href='/search'>Search</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Authentication</h4>
                    <ul>
                        <li><Link href='/login'>Login</Link></li>
                        <li><Link href='/account'>Account</Link></li>
                    </ul>
                </div>

                <div>
                    <h4>Extra Content</h4>
                    <ul>
                        <li><a href='https://www.youranimesanctuary.com/' target='_blank' >YourAnimeSanctuary</a></li>
                        <li><a href='https://www.footiehangout.com/' target='_blank'>FootieHangout</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Support Us</h4>
                    <ul>
                        <li><a href='https://buymeacoffee.com/footiehangout' target='_blank' >Donate</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.socials}>

                <div>
                    <ul>
                        <li>
                            <Link href='https://twitter.com/FootieHangout' target='_blank'>
                                <Image src={Twitter} alt="twitter" width={32} height={32} />
                                Twitter
                            </Link>
                        </li>
                        <li>
                            <Link href='https://www.instagram.com/footiehangout/' target='_blank'>
                                <Image src={Instagram} alt="instagram" width={32} height={32} />
                                Instagram
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>support@footiehangout.com</p>
                <p>Shyka © 2025 - All Rights Reserved.</p>
            </div>
        </footer>
    )


}
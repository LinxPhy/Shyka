'use client'
import { signIn, signOut } from 'next-auth/react'
import { useState, useContext } from 'react';
import styles from '../header.module.css'
import Image from 'next/image';
import { AuthContext } from '../../contextProvider';

export default function LoginButton() {

    const { signedIn, user: { name, image } } = useContext(AuthContext) as AuthContext;
    const [loading, setLoading] = useState(false)

    async function handleGoogleSignin() {

        setLoading(true);
        try {
            await signIn("google", { redirect: true, callbackUrl: `/` });
        } finally {
            setLoading(false);
        }
    }

    return (
        <li>

            {signedIn ?
                <div className={styles.user} onClick={() => signOut()}>
                    <Image src={image as string} alt={name as string} width={30} height={30} />
                    <p>Signed in</p>
                </div>
                :
                <button
                    disabled={loading}
                    onClick={() => handleGoogleSignin()}
                >
                    Login
                </button>
            }

        </li>
    )

}
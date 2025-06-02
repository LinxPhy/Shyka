import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Send from '@/app/icons/send.png'
import Heart from '@/app/icons/heart.png'
import Image from "next/image"
import styles from '../chat.module.css'

export default function Footer({ chatbot }: { chatbot: Chatbot }) {

    const { alias } = chatbot

    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)
    const logs = useQueryClient();

    const mutation = useMutation({

        mutationFn: async () => { 
            setDisabled(true)

            const uid = localStorage.getItem('uid')
            logs.setQueryData(['logs', alias], (oldData: Log[]) => [{role: 'user', content: message}, ...oldData])
            
            const completion = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/completion`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ logs: logs.getQueryData(['logs', alias]), alias })
            })

            logs.setQueryData(['logs', alias], (oldData: Log[]) => [{role: 'assistant', content: ''}, ...oldData])
            const reader = completion?.body?.getReader() as { read: () => Promise<{ done: boolean, value: Uint8Array }> }
            const decoder = new TextDecoder()
            let response = ''

            while (true) {
                const { done, value } = await reader?.read()
                if (done) break;
                let chunk = decoder.decode(value, { stream: true })
                response += chunk
                logs.setQueryData(['logs', alias], (oldData: any) => [{ role: "assistant", content: response }, ...oldData.slice(1)])
            }

            return ({ assistantMessage: response, userMessage: message, alias })
        },

        onSuccess: async(data) => { 
            const { assistantMessage, userMessage, alias } = data
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/save_message`, { assistantMessage, userMessage, alias })
            setMessage('')
        },
        onError: (error) => console.log(error),
        onSettled: () => setDisabled(false),

    })


    return (
        <div className={styles.footer_container}>
            <input
                type="text"
                value={message}
                className={styles.footer}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && disabled === false && mutation.mutate()}
                placeholder="Search"
                disabled={disabled}
                maxLength={300}
            />
            <div className={styles.icons}>
                <Image src={Send} alt="" width={16} height={16} onClick={() => mutation.mutate()} />
                <span>|</span>
                <Image src={Heart} alt="" width={16} height={16} />
            </div>
        </div>
    )


}
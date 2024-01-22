'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Footer from "../_components/footer"
import Chatbots from "../_files/Chatbots"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';



function Search() {


    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    const query = searchParams.get('query') || ''
    const [chatbots, setChatbots] = useState([]) as any

    useEffect(() => {
        const alias = query

        if (alias === '') {
            setChatbots([])

        } else {

            let chats = Chatbots.filter((chatbot: any) => {
                return (
                    chatbot.alias.toLowerCase().includes(alias?.toLowerCase())
                )
            })

            let alph = chats.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).slice(0, 5)

            setChatbots(alph)
        }

    }, [query])


    return (

        <>

            <main className="Search">
                <section>
                    <div className="title-section">
                        <h1>Search</h1>
                    </div>

                    <div className="search-area">
                        <input className="seach-section" onChange={(e) => {
                            router.push(pathName + '?' + 'query=' + e.target.value)
                        }} type="search"></input>
                    </div>

                    <div className='search-results'>
                        {chatbots && chatbots.map((chatbot: any) => {
                            return (
                                <Link href={`/chatbots/${chatbot.alias}`}>
                                    <div className='search-result' key={chatbot.id}>
                                        <p>{chatbot.name}</p>
                                        <span>{chatbot.category}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                </section>
            </main>

            <Footer />
        </>
    )

}

export default Search
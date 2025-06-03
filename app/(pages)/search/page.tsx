'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import Chatbot from "@/app/components/chatbot/chatbot"
import styles from './search.module.css'

const getSearch = async (query: string) => {
    if (!query) {return []}
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/search/${query}`)
    return response.data
}

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialQuery = searchParams.get('query') || '';
    const [inputValue, setInputValue] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

    // Debounce search input
    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedQuery(inputValue);
        }, 300); // debounce delay

        return () => clearTimeout(delay);
    }, [inputValue]);

    // Sync query string with search
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (debouncedQuery) {
            params.set('query', debouncedQuery);
        } else {
            params.delete('query');
        }
        router.replace(`?${params.toString()}`);
    }, [debouncedQuery]);

    const {
        data = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => getSearch(debouncedQuery),
        enabled: !!debouncedQuery,
    });

    return (
        <main>
            <div className='content'>

                <section className={styles.title}>
                    <h1>Search</h1>
                    <span>{data.length} results</span>
                </section>

                <div className={styles.search_container}>
                    <section>
                        <input
                            type="text"
                            placeholder="Search"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className={styles.search}
                        />
                    </section>

                    <section className={styles.chatbots}>
                        {data && data.map((chatbot: Chatbot) => (
                            <Link href={`/chat/${chatbot.alias}`} key={chatbot.chatbot_id}>
                                <Chatbot chatbot={chatbot} />
                            </Link>
                        ))}
                    </section>
                </div>
            </div>
        </main>
    )

}

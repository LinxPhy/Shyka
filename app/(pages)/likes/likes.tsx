'use client'
import { useQueryClient } from "@tanstack/react-query"

export default function Likes({ chatbots }: { chatbots: Chatbot[] }) {

    const query = useQueryClient();
    query.setQueryData(['likes'], chatbots);

    return (
        <></>
    )

    
}
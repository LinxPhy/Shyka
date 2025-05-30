import Chat from '@/app/icons/chat.png'
import Image from "next/image"

export default function Messages({ message } : { message: number }) {

    return (
        <div>
            <Image src={Chat} alt="" width={10} height={10} />
            <span>{message}</span>
        </div>
    )

}
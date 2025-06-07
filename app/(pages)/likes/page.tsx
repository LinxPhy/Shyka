import axios from "axios"
import Likes from "./likes"
import { auth } from "@/app/auth"
import { redirect } from "next/navigation";

export default async function LikePage() {

    const session = await auth()
    if (!session) return redirect('/api/auth/login')

    const user_id = session?.user?.user_id;
    const response = await axios.get(`${process.env.SERVER_URL}/chatbot_likes`, { params: { user_id, page: 1 } })
    const {likes, hasMore} = response.data

    return (
        <main>
            <div className='content'>
                <Likes chatbots={likes} hasMore={hasMore} user_id={user_id} />
            </div>
        </main>
    )

}

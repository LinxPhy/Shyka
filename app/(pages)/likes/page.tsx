import axios from "axios"
import Likes from "./likes"

export default async function LikePage() {

    const response = await axios.get(`${process.env.SERVER_URL}/chatbot_likes`)
    const likes = response.data

    return (
        <main>
            <Likes chatbots={likes} />
        </main>
    )


}
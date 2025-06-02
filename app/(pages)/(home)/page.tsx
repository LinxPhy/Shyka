import axios from "axios"
import Flavour from "./_sections/flavour"
import Reccomended from "./_sections/reccomended"
import Popular from "./_sections/popular"
import { auth } from "@/app/auth"

export default async function Home() {

    const session = await auth() 
    const user_id = session?.user?.user_id;

    const reccomendations = await axios.get(`${process.env.SERVER_URL}/reccomendations`, { params: { user_id } })
    const flavourList = await axios.get(`${process.env.SERVER_URL}/flavour`, { params: { user_id } })
    const categoryList = await axios.get(`${process.env.SERVER_URL}/categories`)
    const popularList = await axios.get(`${process.env.SERVER_URL}/popular`, { params: { user_id } })

    const chatbots = reccomendations.data
    const categories = categoryList.data
    const flavours = flavourList.data
    const popular = popularList.data


    return (
        <main>
            <div className='content' style={{ gap: '5rem' }}>
                <Reccomended chatbots={chatbots} category={categories} />
                <Flavour chatbots={flavours} /> 
                <Popular chatbots={popular} /> 
            </div>
        </main>
    );
}

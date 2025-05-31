import axios from "axios"
import Flavour from "./_sections/flavour"
import Reccomended from "./_sections/reccomended"
import Popular from "./_sections/popular"

export default async function Home() {

    const reccomendations = await axios.get(`${process.env.SERVER_URL}/reccomendations`)
    const flavourList = await axios.get(`${process.env.SERVER_URL}/flavour`)
    const categoryList = await axios.get(`${process.env.SERVER_URL}/categories`)

    const categories = categoryList.data
    const flavours = flavourList.data
    const chatbots = reccomendations.data

    return (
        <main>
            <div className='content' style={{ gap: '5rem' }}>
                <Reccomended chatbots={chatbots} category={categories} />
                <Flavour chatbots={flavours} />
                <Popular chatbots={chatbots} />
            </div>
        </main>
    );
}

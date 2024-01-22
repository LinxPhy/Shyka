
import Chatbots from "../_files/Chatbots"
import Wrapper from "./rec_wrapper"

const Reccomendations = () => {

    const ids = [47, 49, 51, 21, 33, 7, 25, 37, 18];

    const idIndexMap = new Map();
    ids.forEach((id, index) => idIndexMap.set(id, index));

    const chatbots = Chatbots.filter((chatbot: any) => ids.includes(chatbot.id));

    chatbots.sort((a, b) => {
        const indexA = idIndexMap.get(a.id);
        const indexB = idIndexMap.get(b.id);
        return indexA - indexB;
    });


    return (
        <section className="recommendations">

            <div className="title-section">
                <h2>Popular</h2>
            </div>

            <Wrapper data={chatbots} />

        </section>
    )

}




export default Reccomendations
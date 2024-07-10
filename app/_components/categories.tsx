


import Wrapper from "./cat_wrapper"
import Chatbots from "../_files/Chatbots"

const Categories = () => {
    
    const categories = Chatbots.map(chatbot => chatbot.category)
    const unique_categories : any = Array.from(new Set(categories))

    return (
        <section className="categories recommendations">

            <div className="title-section">
                <h2>Categories</h2>
            </div>

            {/* <Wrapper data={{categories: unique_categories}} /> */}
        </section>
    )

}




export default Categories
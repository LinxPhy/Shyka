import Chatbots from "./_files/Chatbots"
import AllChatbots from "./_components/chatbots"
import Reccomendations from "./_components/recommendations"
import Categories from "./_components/categories"
import Footer from "./_components/footer"
import Recent from "./_components/recent"
import Innovation from "./_components/innovation"

export default function Home() {

  return (
    <>
      <main className="Home">

        <section>
          <div className="title-section">
            <h1>Your Favourite AI Chatbots</h1>
          </div>

          <div className="intro">
            <div className="intro-text">
              <p>Welcome to the world of AI chatbots. Here you can find a list of chatbots that you can talk to about anything you want. They will respond to you based on their character and personality.</p>
              <br />
              <p>Just remember that these chatbots are not real. They are just a simulation, so don't get too attached to them. <b>Have Fun!</b></p>
            </div>
          </div>
        </section>

        {/* <Recent /> */}
        <Reccomendations />
        {/* <Innovation />
        <Categories /> */}
        {/* <AllChatbots /> */}


      </main>


      <Footer />
    </>
  )
}

import Hangman from '@/app/images/hangman.png'
import Country from '@/app/images/countries.png'
import RPS from '@/app/images/rock-paper-scissors.png'
import Trip from '@/app/images/trip.png'
import Ideas from '@/app/images/lightbulb.png'
import Meeting from '@/app/images/meeting.png'
import Image from 'next/image'
import Link from "next/link"

export default function Innovation() {

    return (
        <section className="innovation">

            <div className="title-section">
                <h2>Innovation</h2>
            </div>

            <div className='chatbots-reccomendations'>
                <Link href={`/chatbots/`}>
                    <div className="chatbot-option">
                        <Image src={Hangman} width={48} height={48} alt=''></Image>
                        <h5>Hangman </h5>
                    </div>
                </Link>

                <Link href={`/chatbots/`}>
                    <div className="chatbot-option">
                        <Image src={Country} width={48} height={48} alt=''></Image>
                        <h5>Guess The Country </h5>
                    </div>
                </Link>


                <Link href={`/chatbots/`}>
                    <div className="chatbot-option">
                        <Image src={RPS} width={48} height={48} alt=''></Image>
                        <h5>Rock Paper Scissors </h5>
                    </div>
                </Link>

                <Link href={`/chatbots/`}>
                    <div className="chatbot-option">
                        <Image src={Trip} width={48} height={48} alt=''></Image>
                        <h5>Plan a Trip  </h5>
                    </div>
                </Link>

                <Link href={`/chatbots/`}>
                    <div className="chatbot-option">
                        <Image src={Ideas} width={48} height={48} alt=''></Image>
                        <h5>Brainstorm ideas  </h5>
                    </div>
                </Link>

                <Link href={`/chatbots/`}>
                    <div className="chatbot-option">
                        <Image src={Meeting} width={48} height={48} alt=''></Image>
                        <h5>Interviewing Practice  </h5>
                    </div>
                </Link>

            </div>


        </section>
    )

}


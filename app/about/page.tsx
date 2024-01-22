import Link from "next/link";
import Footer from "../_components/footer";


function About() {

    return (
        <>
            <main className="About">
                <section>
                    <div className="title-section">
                        <h1>About</h1>
                    </div>

                    <div className="intro">
                        <div className="intro-text">
                            This is a product from a graduate student powered by a deep learning model, built and trained to
                            generate creative messages besed on the input of the user and the character's personality.
                            <br></br>
                            <br></br>
                            This system is free to use and is intended for entertainment purposes only.
                        </div>
                    </div>

                    <div className="title-section">
                        <h1>Terms & Conditions</h1>
                    </div>

                    <div className="intro">
                        <div className="intro-text">
                            <p>
                                By using our website, you agree to the following terms and conditions:
                                <br></br>
                                <br></br>
                                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service,
                                violate any laws in your jurisdiction.
                                <br></br>
                                <br></br>
                                You must abide to all laws and regulations while using our website. Which includes attempting to gain unauthorized
                                access to our website, servers, or any other computer systems or networks connected to our website.
                                <br></br>
                                <br></br>
                                Do not engage in any activity that may be deemed as harmful to our website.
                                <br></br>
                                <br></br>
                                We reserve the right to refuse service to anyone for any reason at any time.
                                <br></br>
                                <br></br>
                                We reserve the right to modify or terminate the Service for any reason, without notice at any time.
                                <br></br>
                                <br></br>
                                For any questions or concerns, feel free to <Link className='about-href' href="/contact">contact us</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )

}

export default About;
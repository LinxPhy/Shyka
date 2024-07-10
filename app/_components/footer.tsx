import Link from "next/link"

const Footer = () => {

    return (


        <footer>
            <div className="footer-main">
                <div>
                    <h3>Useful Links</h3>

                    <div className='footer-main-children'>
                        <ul>
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/chatbots'>Chatbots</Link></li>
                            <li><Link href="/about">Terms of Service</Link></li>
                        </ul>

                    </div>
                </div>

            </div>

            <div className='footer-message'>
                <p>Shyka © 2024 - All Rights Reserved</p>
            </div>
        </footer>
    )

}

export default Footer
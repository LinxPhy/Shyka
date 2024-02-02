

import Link from "next/link"
import AuthButtons from "./AuthButtons"
import Hamburger from "./Hamburger"


const Header = () => {


    return (
        <header>
            <nav>
                <div className="title">
                    <Link href={'/'}>
                        <span>Shyka</span>
                    </Link>
                </div>

                <div>
                    <ul>
                        <li><Link href={'/about'}>About</Link></li>
                        <li><Link href={'/chatbots'}>Chatbots</Link></li>
                    </ul>
                </div>

                <div>
                    <ul>
                        <li>
                            <Link href={'/search'}>
                                <span className="material-symbols-rounded">
                                    search
                                </span>
                            </Link>
                        </li>

                        <AuthButtons />

                    </ul>
                </div>
            </nav>
        </header>
    )


}

export default Header
import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

const AuthButtons = async () => {

    const session = await getSession();
    const user = session ? session.user : null;

    return (
        <>
            {user ?
                (
                    <li>
                        <Link href={'/api/auth/logout'}>
                            <Image src={user.picture} alt={user.name} width={40} height={40} />
                        </Link>
                    </li>
                )
                :
                (
                    <li>
                        <Link href={'/api/auth/login'}>
                            <button className="buttonStyle1">
                                Login
                            </button>
                        </Link>
                    </li>
                )
            }
        </>
    )


}

export default AuthButtons
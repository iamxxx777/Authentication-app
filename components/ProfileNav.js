import { useState } from "react"
import { signOut, useSession } from "next-auth/client"
import Link from "next/link"
import navStyles from "../styles/Nav.module.css"

const ProfileNav = () => {

    const [drop, setDrop] = useState(false);

    const [session] = useSession();

    const logOut = async (e) => {
        e.preventDefault();
        await signOut({ callbackUrl: 'http://localhost:3000/signup' });
    }

    return (
        <header className={navStyles.header}>
                <div className={navStyles.logo}>
                    <img src="/devchallenges-light.svg" alt="logo" />
                </div>

                <div className={navStyles.user}>
                    <div className={navStyles.user_img}>
                        <img src={session ? `${session.user.image}` : "/Mio.jpg"} alt="user image" />
                    </div>

                    <div className={navStyles.name}>
                        <h3>{session ? `${session.user.name || session.user.email}` : "John Doe"}</h3>
                    </div>

                    <div className={navStyles.drop}>
                        <button onClick={() => setDrop(!drop)} className={`${drop && navStyles.active}`}><i className="fa fa-caret-down" aria-hidden="true"></i></button>
                        {drop && 
                            <div className={navStyles.dropdown}>
                                <ul>
                                    <li>
                                        <Link href="/profile"><div><i className="fa fa-user-circle" aria-hidden="true"></i> <p>My Profile</p></div></Link>
                                    </li>
                                    <li>
                                        <Link href="/"><div><i className="fa fa-users" aria-hidden="true"></i> <p>Group Chat</p></div></Link>
                                    </li>
                                    <hr />
                                    <li className={navStyles.logout}>
                                        <a href="/api/auth/signout" onClick={(e) => logOut(e)}>
                                            <div>
                                                <i className="fa fa-sign-out" aria-hidden="true"></i> 
                                                <p>Logout</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </header>
    )
}

export default ProfileNav

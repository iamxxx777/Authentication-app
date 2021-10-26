import { useState } from "react"
import navStyles from "../styles/Nav.module.css"

const ProfileNav = () => {

    const [drop, setDrop] = useState(false);

    return (
        <header className={navStyles.header}>
                <div className={navStyles.logo}>
                    <img src="/devchallenges-light.svg" alt="logo" />
                </div>

                <div className={navStyles.user}>
                    <div className={navStyles.user_img}>
                        <img src="/Mio.jpg" alt="user image" />
                    </div>

                    <div className={navStyles.name}>
                        <h3>Hope Tomiwa</h3>
                    </div>

                    <div className={navStyles.drop}>
                        <button onClick={() => setDrop(!drop)} className={`${drop && navStyles.active}`}><i className="fa fa-caret-down" aria-hidden="true"></i></button>
                        {drop && 
                            <div className={navStyles.dropdown}>
                                <ul>
                                    <li><i className="fa fa-user-circle" aria-hidden="true"></i> <p>My Profile</p></li>
                                    <li><i className="fa fa-users" aria-hidden="true"></i> <p>Group Chat</p></li>
                                    <hr />
                                    <li className={navStyles.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> <p>Logout</p></li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </header>
    )
}

export default ProfileNav

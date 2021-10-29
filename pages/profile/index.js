import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Link from "next/link"
import axios from "axios"

import ProfileFooter from "../../components/ProfileFooter"
import ProfileNav from "../../components/ProfileNav"
import Unauthorized from '../../components/UnAuthorized'
import Meta from "../../components/Meta"

import profileStyles from "../../styles/Profile.module.css"


const Profile = ({  }) => {

    const [user, setUser] = useState([]);
    const [session] = useSession();

    // I choose to fetch the user data from the database instead of using the session data.
    // I couldn't figure out a way to dynamically update the session data after an update.
    // If you figured it out, please comment how

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user/profile');

            if(data.err) {
                alert(data.err);
            }

            setUser(data.user);
        } catch (error) {
            console.error(error.response.data.err);
        }
        
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className={profileStyles.container}>
            <Meta title={session ? `${session.user.name}'s profile` : "Unauthorized"} />
            <ProfileNav src={user.image} name={user.name} />

            <main className={profileStyles.prof}>
                {!session && <Unauthorized /> }

                {session && (
                    <section className={profileStyles.profile}>
                        <h1>Personal Info</h1>
                        <h3>Basic info, like your name and photo</h3>

                        <div className={profileStyles.user_info}>
                            <div className={profileStyles.info_head}>
                                <div className={profileStyles.left}>
                                    <h2>Profile</h2>
                                    <h4>Some info may be visible to other people</h4>
                                </div>
                                <div className={profileStyles.right}>
                                    <Link href="/profile/edit">
                                        <button>Edit</button>
                                    </Link>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Photo</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <img src={user.image} alt="user profile photo" />
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Name</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>{user.name}</h5>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Bio</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>{user.bio ? user.bio : "Not specified"}</h5>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Email</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>{user.email ? user.email : "Not Specified"}</h5>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Phone</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>{user.phone ? `0${user.phone}` : "Not Specified"}</h5>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Password</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>*********</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <ProfileFooter />
            </main>
        </div>
    )
}





export default Profile

import { useSession } from 'next-auth/client'
import Link from "next/link"

import ProfileFooter from "../../components/ProfileFooter"
import ProfileNav from "../../components/ProfileNav"
import Unauthorized from '../../components/UnAuthorized'
import Meta from "../../components/Meta"

import profileStyles from "../../styles/Profile.module.css"


const Profile = () => {

    const [session] = useSession();
    console.log(session);


    return (
        <div className={profileStyles.container}>
            <Meta title={`${session.user.name}'s Profile`} />
            <ProfileNav />

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
                                    <img src={session.user.image} at="user profile photo" />
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Name</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>{session.user.name}</h5>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Bio</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>I am a MERN stack developer with a passion for solving problems</h5>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Email</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>{session.user.email}</h5>
                                </div>
                            </div>
                            <div className={profileStyles.info}>
                                <div className={profileStyles.left}>
                                    <h2>Phone</h2>
                                </div>
                                <div className={profileStyles.right}>
                                    <h5>08166179988</h5>
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

import ProfileNav from "../../components/ProfileNav"
import ProfileFooter from "../../components/ProfileFooter"
import Meta from "../../components/Meta"
import editStyles from "../../styles/Edit.module.css"


const Edit = () => {
    return (
        <div className={editStyles.container}>
            <Meta title={"Hope's Profile"} />
            <ProfileNav />

            <main className={editStyles.prof}>
                <section className={editStyles.profile_edit}>
                    <h1>Change Info</h1>
                    <h3>Changes will be reflected to every services</h3>

                    <div className={editStyles.profile_info}>
                        <form action="#">
                            <div className={editStyles.form_img}>
                                <div className={editStyles.form_img_div}>
                                    <img src="/Mio.jpg" alt="user image" />
                                </div>
                                <div className={editStyles.img_text}>
                                    <p>Change Photo</p>
                                </div>
                            </div>

                            <div className={editStyles.form_control}>
                                <label htmlFor="#">Name</label>
                                <input type="text" name="name" placeholder="Enter your name..." />
                            </div>
                            <div className={editStyles.form_control}>
                                <label htmlFor="#">Bio</label>
                                <textarea type="text" name="bio" placeholder="Enter your bio..."></textarea>
                            </div>
                            <div className={editStyles.form_control}>
                                <label htmlFor="#">Phone</label>
                                <input type="text" name="phone" placeholder="Enter your phone number..." />
                            </div>
                            <div className={editStyles.form_control}>
                                <label htmlFor="#">Email</label>
                                <input type="email" name="email" placeholder="Enter your email..." />
                            </div>
                            <div className={editStyles.form_control}>
                                <label htmlFor="#">Password</label>
                                <input type="password" name="password" placeholder="Enter your password..." />
                            </div>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>

                <ProfileFooter />
            </main>
        </div>
    )
}

export default Edit

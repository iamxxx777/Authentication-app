import { useSession, getSession } from "next-auth/client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import axios from "axios"
import { toast } from 'react-toastify';

import ProfileNav from "../../components/ProfileNav"
import ProfileFooter from "../../components/ProfileFooter"
import Meta from "../../components/Meta"
import Unauthorized from '../../components/UnAuthorized'
import Loading from "../../components/Loading"

import editStyles from "../../styles/Edit.module.css"
import { useRouter } from "next/router"


const Edit = () => {

    const [ session ] = useSession();
    
    const router = useRouter();

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user/profile');

            if(data.err) {
                alert(data.err);
            }

            setUser(data.user);

            return data.user;

        } catch (error) {
            console.error(error.response.data.err);
        }
        
    }


    const setVariables = (data) => {
        setName(data.name);
        setEmail(data.email);

        if(data.phone) {
            setPhone(data.phone);
        }
        if(data.bio) {
            setBio(data.bio);
        }
    }


    const submitImage = async (image) => {

        try {
            let formData = new FormData();
            formData.append("image", image);

            const config = {
                headers: {
                'content-type': 'multipart/form-data'
                }
            };

            setLoading(true);
            const { data } = await axios.put("/api/user/image", formData, config);

            if(data.success) {
               const res = await getUser();
            }

            setLoading(false);
            toast.success("Image upload successful");

        } catch (error) {
            console.error(error);
            toast.error('Error uploading image, please select again');
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const editData = { id: session.user.id, name, email, password, bio, phone };
            const config = {
                headers: {
                'content-type': 'application/json'
                }
            };

            setLoading(true);
            const { data } = await axios.put("/api/user/profile", editData);
            setLoading(false);

            if(data.error) {
                toast.error(data.error);
            } 

            toast.success('Profile update successful')
            await getSession();
            router.push("/profile");

        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
            toast.error(error.response.data.error);
        }
        
    }

    // When user clicks on the button, open the input file tag
    const handleInput = () => {
        inputRef.current.click();
        setError("");
    }

    // Submit the file and clear data
    const handleChange = (e) => {
        submitImage(e.target.files[0]);
        e.target.value = "";
    }
    

    useEffect(async () => {
        const data = await getUser();
        setVariables(data);
    }, []);




    return (
        <div className={editStyles.container}>
            <Meta title={`${user.name}'s Profile`} />
            <ProfileNav src={user.image} name={user.name} />
            
            {loading && <Loading />}

            <main className={editStyles.prof}>
                {!session && <Unauthorized /> }

                {session && (         
                <>       
                    <Link href="/profile">
                        <div className={editStyles.back}>
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            <span>Back</span>
                        </div>
                    </Link>
                    <section className={editStyles.profile_edit}>
                        <h1>Change Info</h1>
                        <h3>Changes will be reflected to every services</h3>

                        <div className={editStyles.profile_info}>
                            <form onSubmit={(e) => e.preventDefault()} className={editStyles.image}>
                                <div className={editStyles.form_img}>
                                    <div className={editStyles.form_img_div}>
                                        <img src={user.image} alt={`${user.name} image`} />
                                        <button ref={buttonRef} onClick={handleInput} ><i className="fa fa-camera" aria-hidden="true"></i></button>
                                        <input ref={inputRef} onChange={handleChange} type="file" name="image" />
                                    </div>
                                    <div className={editStyles.img_text}>
                                        <p>Change Photo</p>
                                    </div>
                                </div>
                            </form>

                            <form onSubmit={(e) => submitForm(e)} className={editStyles.form}>
                                {error && (<small>{error}</small>)}
                                <div className={editStyles.form_control}>
                                    <label htmlFor="#">Name</label>
                                    <input 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" name="name" placeholder="Enter your name..." />
                                </div>

                                <div className={editStyles.form_control}>
                                    <label htmlFor="#">Bio</label>
                                    <textarea 
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        type="text" name="bio" placeholder="Enter your bio..."></textarea>
                                </div>

                                <div className={editStyles.form_control}>
                                    <label htmlFor="#">Phone</label>
                                    <input 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text" name="phone" placeholder="Enter your phone number..." />
                                </div>

                                <div className={editStyles.form_control}>
                                    <label htmlFor="#">Email</label>
                                    <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" name="email" placeholder="Enter your email..." />
                                </div>
                                
                                <div className={editStyles.form_control}>
                                    <label htmlFor="#">Password</label>
                                    <input 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" name="password" placeholder="Enter new password..." />
                                </div>

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </section>
                </>
                )}

                <ProfileFooter />
            </main>
        </div>
    )
}

export default Edit

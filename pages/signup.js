import { getProviders, signIn } from "next-auth/client"
import { useState } from 'react'
import Link from "next/link"

import Meta from "../components/Meta"
import Provider from "../components/Provider"

import styles from '../styles/Signup.module.css';

const signUp = ({ providers }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        signIn("credentials", { email, password});
    }


    return (
        <main className={styles.container}>
            <Meta title="Sign Up" />
            <section className={styles.signup_page}>
                <div className={styles.signup_logo}>
                    <img src="/devchallenges-light.svg" alt="logo" />
                </div>
                <h1>Join thousands of learners from around the world </h1>
                <p>
                    Master web development by making real-life projects. 
                    There are multiple paths for you to choose
                </p>
                <div className={styles.form}>
                    <form onClick={handleSubmit}>
                        <div className={styles.form_control}>
                            <label htmlFor="#"><i className="fa fa-envelope" aria-hidden="true"></i></label>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.form_control}>
                            <label htmlFor="#"><i className="fa fa-lock" aria-hidden="true"></i></label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Start Coding now</button>
                    </form>
                </div>
                <div className={styles.oauth}>
                    <p>Or continue with this social profiles</p>

                    <div className={styles.auth}>
                    {Object.values(providers)
                        .filter((provider) => provider.name !== "Credentials")
                        .map((provider) => (
                        <Provider provider={provider} key={provider.name} />
                      ))}
                    </div>


                    <div className={styles.or}>
                        <p>Already a member? <Link href="/signin">Login</Link></p>
                    </div>
                </div>
            </section>

            <section className={styles.footer}>
                <div>
                    <p>Created by <a href="https://github.com/iamxxx777" target="_blank">Dayo-Ajobiewe Hope</a></p>
                    <p><a href="https://devchallenges.io/challenges" target="_blank">devChallenges.io</a></p>
                </div>
            </section>
        </main>
    )
}

export default signUp

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }
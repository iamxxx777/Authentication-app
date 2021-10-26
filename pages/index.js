import { useEffect } from "react"
import { useRouter } from "next/router"
import Meta from '../components/Meta'
import styles from '../styles/Home.module.css'

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push("/signup");
  }, []);

  return (
    <div className={styles.container}>
      <Meta />

      <main className={styles.main}>
        <h1 className={styles.title}>
           This is the main page
        </h1>

        
      </main>
    </div>
  )
}

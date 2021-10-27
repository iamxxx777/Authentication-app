import { getSession } from "next-auth/client"
import Meta from '../components/Meta'
import Loading from "../components/Loading"
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <Meta />

      <main className={styles.main}>
          <Loading />
      </main>
    </div>
  )
}


export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      }
    }
  } 

  return {
    redirect: {
      destination: '/profile',
      permanent: false,
    },
    props: {
      session,
    }
  }
}
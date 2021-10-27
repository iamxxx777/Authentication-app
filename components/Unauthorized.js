import Link from "next/link"
import styles from "../styles/Unauthorized.module.css"

const Unauthorized = () => {
    return (
        <div className={styles.unauthorize}>
            <h1>Unauthorized access</h1>
            <p>You are not authorized to view this page, click <Link href="/signup">here to login</Link> </p>
        </div>
    )
}

export default Unauthorized

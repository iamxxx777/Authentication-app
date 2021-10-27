import styles from "../styles/Loading.module.css"

const Loading = () => {
    return (
        <div className={styles.loading}>

            <svg width="105" height="150" viewBox="0 0 40 50">
                <polygon stroke="#fff" strokeWidth="1" fill="none"
                points="20,1 40,40 1,40" />
                <text fill="#fff" x="5" y="47">Loading...</text>
            </svg>
            
        </div>
    )
}

export default Loading
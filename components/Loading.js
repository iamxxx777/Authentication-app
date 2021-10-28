import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "../styles/Loading.module.css"

const Loading = () => {
    return (
        <div className={styles.loading}>

            <Loader 
                type="ThreeDots" 
                color="#BDBDBD" 
                height={100} 
                width={100} 
            />
            
        </div>
    )
}

export default Loading
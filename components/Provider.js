import { signIn } from "next-auth/client"
import { useState } from "react"
import { toast } from "react-toastify"
import Loading from "./Loading"

const Provider = ({ provider }) => {

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const res = await signIn(provider.id, { callbackUrl: 'http://localhost:3000/profile' });
        setTimeout(() => {
            setLoading(false);
            toast.success('Login successful');
        }, 2500);

    }

    return (
        <div>
            <button onClick={handleClick}>
                <img src={`/${provider.name}.svg`} />
            </button>

            {loading && <Loading />}
        </div>
    )
}

export default Provider

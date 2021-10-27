import { signIn } from "next-auth/client"

const Provider = ({ provider }) => {
    return (
        <div>
            <button onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/profile' })}>
                <img src={`/${provider.name}.svg`} />
            </button>
        </div>
    )
}

export default Provider

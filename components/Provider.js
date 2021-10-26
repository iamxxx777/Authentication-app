import React from 'react'

const Provider = ({ provider }) => {
    return (
        <div>
            <button onClick={() => signIn(provider.id)}>
                <img src={`/${provider.name}.svg`} />
            </button>
        </div>
    )
}

export default Provider

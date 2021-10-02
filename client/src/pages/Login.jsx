import React, { useContext, useState } from 'react'
import { authContext } from '../contexts/authContext'

const Login = () => {
    const {login} = useContext(authContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button >login</button>
            </form>
        </div>
    )
}

export default Login

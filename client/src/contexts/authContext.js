import React, {context, createContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import appService, {setToken} from '../services/appService';

export const authContext = createContext()


export const AuthProvider = ({children}) => {
    const history = useHistory()
    const [auth, setAuth] = useState({
        token: null,
        expiresAt: null,
        user: null
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const expiresAt = localStorage.getItem('expiresAt')
        const user = localStorage.getItem('user') 
        const userParse = user ? JSON.parse(user) : null
        setAuth({
            token,
            expiresAt,
            user: userParse
        })
        setLoading(false)
        
    }, [])

    useEffect(() => {
        
        setToken(auth.token)
        console.log(`grabbign from local storage ${auth.token}`)
    },[auth])

    
    const updateAuth = (token, expiresAt, user) => {
        localStorage.setItem('token', token)
        localStorage.setItem('expiresAt', expiresAt)
        localStorage.setItem('user', JSON.stringify(user))
        setAuth({
            token,
            expiresAt,
            user
        })
    }
    const isAuthenticated = () => {
        if (!auth.token || !auth.expiresAt) {
            return false
        }
        return Date.now() < auth.expiresAt
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')
        localStorage.removeItem('user')
        setAuth({
            token: null,
            expiresAt: null,
            user: null
        })
        history.push("/")
    }

    const login = async (username, password) => {
        try {
            const res = await appService.post("/users/login", {
                    username,
                    password
                })
                console.log(res)
                const {token, expiresAt, user} = res.data
                updateAuth(token, expiresAt, user)
                history.push("/posts")

        } catch (err) {

        }
                
    }
    return (
        <authContext.Provider value={{auth, updateAuth, isAuthenticated, logout, login, loading}}>
            {children}
        </authContext.Provider>
    )
}


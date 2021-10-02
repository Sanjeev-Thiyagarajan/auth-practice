import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../contexts/authContext'

const Profile = () => {
    const {logout} =  useContext(authContext)
    return (
        <div>
            <h1>Profile</h1>
            <Link to="/" onClick={logout}>Logout</Link> 
        </div>
    )
}

export default Profile

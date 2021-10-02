import React, { useContext, useEffect } from 'react'
import { authContext, AuthProvider } from './contexts/authContext'
import appService from './services/appService'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Pages from './Pages'


const ProtectedRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext(authContext)
    // return isAuthenticated()

    return (
         <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
   )
}

const App = () => {
    // const {updateAuth, isAuthenticated, auth} = useContext(authContext)

    
    return (
        <Router>
        {/* <div>
            asdf
            <h1>{isAuthenticated() ? auth.user.username : 'nothing'}</h1>
        </div> */}
        <AuthProvider>
            <Pages/>  
        </AuthProvider>  
        </Router>
        
        
    )
}

export default App

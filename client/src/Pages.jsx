import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { authContext } from "./contexts/authContext";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, auth } = useContext(authContext);
  // return isAuthenticated()

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const Pages = () => {
  const { loading, auth } = useContext(authContext);
  const renderPages = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* <ProtectedRoute path="/profile" component={Profile}/>    */}
        <ProtectedRoute exact path="/posts" component={Posts} />
        <ProtectedRoute exact path="/posts/create" component={CreatePost} />
      </>
    );
  };
  return renderPages();
};

export default Pages;

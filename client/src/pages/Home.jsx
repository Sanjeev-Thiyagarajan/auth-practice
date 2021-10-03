import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import appService from "../services/appService";

const Home = () => {
  const { isAuthenticated, auth, logout } = useContext(authContext);

  const fetchData = async () => {
    try {
      console.log(isAuthenticated());

      const res = await appService.get("/");
      // const {token, expiresAt, user} = res.data
      // updateAuth(token, expiresAt, user)
      //
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderUser = () => {
    if (isAuthenticated()) {
      return (
        <div>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
          <h2>user: {auth?.user?.username}</h2>
          <Link to="/posts">See posts</Link>
        </div>
      );
    }
    return (
      <div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h1>Home</h1>
      {renderUser()}
    </div>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import appService from "../services/appService";
import DOMPurify from "dompurify";

const Posts = () => {
  const { logout, clearAuth } = useContext(authContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await appService.get("/posts");
        setPosts(results.data);
      } catch (err) {
        if (err.message === "User is not logged in") {
          clearAuth();
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
      <div>
        <Link to="/posts/create">Create New Post</Link>
      </div>

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            {/* <div>{post.content}</div> */}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import appService from "../services/appService";
import DOMPurify from "dompurify";

const Posts = () => {
  const { logout } = useContext(authContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const results = await appService.get("/posts");
      setPosts(results.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
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

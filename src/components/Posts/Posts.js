import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import axios from "axios";

const Posts = () => {
   const baseUrl = "http://localhost:5000";
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchPosts = async () => {
         const res = await axios.get(
            "http://localhost:5000/post/random/allposts"
         );
         setPosts(res.data);
      };
      fetchPosts();
   }, []);

   return (
      <div className="posts">
         {posts.map((data) => (
            <Post data={data}></Post>
         ))}
      </div>
   );
};

export default Posts;

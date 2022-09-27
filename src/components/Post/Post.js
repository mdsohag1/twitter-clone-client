import React, { useState } from "react";
import "./Post.css";
import like from "../../img/blue-heart.png";
import comment from "../../img/comment.png";
import share from "../../img/share.png";
import notLike from "../../img/notlike.png";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
   const { currentUser } = useSelector((state) => state.user);
   const [liked, setLikeed] = useState(
      data.likes.includes(currentUser._id) ? true : false
   );
   const authAxios = axios.create({
      baseURL: "http://localhost:5000",
      headers: {
         Authorization: `Bearer ${currentUser ? currentUser.token : null}`,
      },
   });

   const handleLike = () => {
      const fetchLike = async () => {
         const res = await authAxios.put(`/post/${data._id}/like`);
         setLikeed(res.data === "post liked" ? true : false);
      };
      fetchLike();
   };

   return (
      <div className="post">
         <div className="details">
            {/* <span><b>{data.name}</b></span> */}
            <span> {data.desc}</span>
         </div>
         <img src={data.image} alt="" />

         <div className="postReact">
            <img
               src={liked ? like : notLike}
               alt=""
               onClick={handleLike}
               style={{ cursor: "pointer" }}
            />
            <img src={comment} alt="" />
            <img src={share} alt="" />
         </div>
         <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {data.likes.length} likes.
         </span>
      </div>
   );
};

export default Post;

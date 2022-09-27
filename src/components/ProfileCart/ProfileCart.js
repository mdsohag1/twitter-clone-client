import React, { useEffect } from "react";
import "./ProfileCart.css";
import banner from "../../img/cover.jpg";
import logo from "../../img/img1.png";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProfileCart = ({ location }) => {
   const { profileId } = useParams();
   console.log(profileId);
   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();
   const baseUrl = "http://localhost:5000";

   useEffect(() => {
      const fetchPosts = async () => {
         const res = axios.get(
            `http://localhost:5000/post/yourPost/${profileId}`
         );
         console.log(res.data);
      };
      fetchPosts();
   }, [profileId]);

   return (
      <div className="profileCart">
         <div
            className="coverImg"
            style={{
               height: location === "profilePage" ? "400px" : "180px",
               width: location === "profilePage" ? "100%" : "23rem",
            }}
         >
            <img src={currentUser.coverPicture} alt="" />
         </div>
         <div className="profileImages">
            <img
               style={{
                  width: location === "profilePage" ? "8rem" : "5rem",
                  height: location === "profilePage" ? "8rem" : "5rem",
               }}
               src={currentUser.profilePicture}
               alt=""
            />
         </div>
         <div className="profileName">
            <span>{currentUser.firstname + " " + currentUser.lastname}</span>
            <span>{currentUser.bio}</span>
         </div>
         <div className="flowStatus">
            <hr />
            <div>
               <div className="follow">
                  <span>{currentUser.followings.length}</span>
                  <span>Following</span>
               </div>
               <div className="vl"></div>
               <div className="follow">
                  <span>{currentUser.followers.length}</span>
                  <span>Followers</span>
               </div>
               {location === "profilePage" && (
                  <>
                     <div className="vl"></div>
                     <div className="follow">
                        <span></span>
                        <span>Posts</span>
                     </div>
                  </>
               )}
            </div>
            <hr />

            <Link
               to={`/profile/${currentUser._id}`}
               style={{ textDecoration: "none", color: "inherit" }}
            >
               <h6>My Profile</h6>
            </Link>
         </div>
      </div>
   );
};

export default ProfileCart;

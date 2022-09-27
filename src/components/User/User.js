import React, { useState } from "react";
import { Link } from "react-router-dom";

const User = ({ person }) => {
   return (
      <div className="followList">
         <div>
            <Link
               to={`/profile/${person._id}`}
               style={{ textDecoration: "none", color: "inherit" }}
            >
               <img
                  src={person.profilePicture}
                  alt=""
                  className="followers-img"
               />
            </Link>
            <div className="name">
               <span>{person.firstname + " " + person.lastname}</span>
               <span>@{person.firstname}</span>
            </div>
         </div>
         <button className="button">Follow</button>
      </div>
   );
};

export default User;

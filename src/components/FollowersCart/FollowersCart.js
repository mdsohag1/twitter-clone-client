import React, { useEffect, useState } from "react";
import "./FollowersCart.css";
import axios from "axios";
import { useSelector } from "react-redux";
import User from "../User/User";

const FollowersCart = () => {
   const { currentUser } = useSelector((state) => state.user);
   const [users, setUsers] = useState([]);
   const baseUrl = "http://localhost:5000";
   useEffect(() => {
      const fetchUsers = async () => {
         const res = await axios.get(`${baseUrl}/user/allusers`);
         setUsers(res.data);
      };
      fetchUsers();
   }, []);
   console.log(users);
   return (
      <div className="followersCart">
         <h3>People you may know</h3>
         {users.map((person, id) => {
            if (users._id !== currentUser._id) {
               return <User person={person} key={id} />;
            }
         })}
      </div>
   );
};

export default FollowersCart;

import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/twitterb.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/userSlice";

const Auth = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { currentUser } = useSelector((state) => state.user);

   const [newUser, setNewUser] = useState(true);
   const [confirmPass, setConfirmPass] = useState(true);
   const [data, setData] = useState({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
   });

   const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (data.password !== data.confirmpass) {
         setConfirmPass(false);
      }
      try {
         if (newUser && data.password === data.confirmpass) {
            const res = await axios.post(
               "http://localhost:5000/auth/register",
               {
                  firstname: data.firstname,
                  lastname: data.lastname,
                  username: data.username,
                  password: data.password,
               }
            );
            dispatch(loginSuccess(res.data));
            navigate("/");
         }
         if (!newUser) {
            const res = await axios.post("http://localhost:5000/auth/login", {
               username: data.username,
               password: data.password,
            });
            dispatch(loginSuccess(res.data));
            navigate("/");
         }
      } catch (error) {}
   };

   const resetForm = () => {
      setConfirmPass(true);
      setData({
         firstname: "",
         lastname: "",
         username: "",
         password: "",
         confirmpass: "",
      });
   };

   return (
      <div className="auth">
         {/* left side */}
         <div className="a-left">
            <img src={Logo} alt="" />
            <div className="webName">
               <h1>AS Media</h1>
               <h6>Explore the Ideas throughtout the world</h6>
            </div>
         </div>
         {/* right side */}
         <div className="a-right">
            <form className="infoForm auth-form">
               <h4 style={{ marginTop: "10px" }}>
                  {newUser ? "Sign Up" : "Login"}
               </h4>
               {newUser && (
                  <div>
                     <input
                        type="text"
                        className="infoInput"
                        placeholder="First Name"
                        name="firstname"
                        onChange={handleChange}
                     />
                     <input
                        type="text"
                        className="infoInput"
                        placeholder="Last Name"
                        name="lastname"
                        onChange={handleChange}
                     />
                  </div>
               )}
               <div>
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="UserName"
                     name="username"
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <input
                     type="password"
                     name="password"
                     id=""
                     placeholder="Password"
                     className="infoInput"
                     onChange={handleChange}
                  />
                  {newUser && (
                     <input
                        type="password"
                        name="confirmpass"
                        id=""
                        placeholder="Confirm Password"
                        className="infoInput"
                        onChange={handleChange}
                     />
                  )}
               </div>
               <span
                  style={{
                     display: confirmPass ? "none" : "block",
                     color: "red",
                     fontSize: "12px",
                     alignSelf: "flex-end",
                     marginRight: "5px",
                  }}
               >
                  *confirm password is not same
               </span>
               <div>
                  <spam
                     onClick={() => {
                        setNewUser(!newUser);
                        resetForm();
                     }}
                     style={{
                        fontSize: "14px",
                        cursor: "pointer",
                        color: "red)",
                     }}
                  >
                     {newUser
                        ? "Already have an account! Login"
                        : "Dont have An account! Sign Up"}
                  </spam>
               </div>

               <button className="button infoButton" onClick={handleSubmit}>
                  {newUser ? "signup" : "login"}
               </button>
            </form>
         </div>
      </div>
   );
};

export default Auth;

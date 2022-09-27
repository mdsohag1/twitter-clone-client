import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useSelector } from "react-redux";

const InfoCard = () => {
   const { currentUser } = useSelector((state) => state.user);
   const [open, setOpen] = useState(false);

   return (
      <>
         <div className="infoCard">
            <div className="infoHead">
               <h5>Profile Info</h5>
               <div onClick={() => setOpen(true)}>
                  <UilPen width="2rem" height="1.2rem" />
               </div>
            </div>
            <div className="info">
               <span>
                  <b>Status </b>
               </span>
               <span>{currentUser.relationship}</span>
            </div>
            <div className="info">
               <span>
                  <b>Lives In </b>
               </span>
               <span>{currentUser.livesin}</span>
            </div>
            <div className="info">
               <span>
                  <b>Works at </b>
               </span>
               <span>{currentUser.worksat}</span>
            </div>
            <div className="info">
               <span>
                  <b>Country </b>
               </span>
               <span>{currentUser.country}</span>
            </div>
            <button className="button logout-button">Logout</button>
         </div>
         {open && <ProfileModal setOpen={setOpen}></ProfileModal>}
      </>
   );
};

export default InfoCard;

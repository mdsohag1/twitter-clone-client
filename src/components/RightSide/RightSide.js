import React from "react";
import "./RightSide.css";
import noti from "../../img/noti.png";
import comment from "../../img/comment.png";
import home from "../../img/home.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";

const RightSide = () => {
   return (
      <div className="rightSide">
         <div className="navIcons">
            <img src={home} alt="" />
            <UilSetting />
            <img src={noti} alt="" />
            <img src={comment} alt="" />
         </div>
         <TrendCard></TrendCard>
         <button className="button r-button">Share</button>
      </div>
   );
};

export default RightSide;

import React from "react";
import "./TrendCard.css";
import { TrendData } from "../../Data/TrendData";

const TrendCard = () => {
   return (
      <div className="trensCard">
         <h4>Trends For You</h4>
         <div className="trend">
            <span>#{TrendData.name}</span>
            <span>{TrendData.shares}k shares</span>
         </div>
      </div>
   );
};

export default TrendCard;

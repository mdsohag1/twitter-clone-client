import React from "react";
import "./ProfileLeft.css";
import LogoSearch from "./../LogoSearch/LogoSearch";
import FollowersCart from "./../FollowersCart/FollowersCart";
import InfoCard from "../InfoCard/InfoCard";

const ProfileLeft = () => {
   return (
      <div className="profileSide">
         <LogoSearch></LogoSearch>
         <InfoCard></InfoCard>
         <FollowersCart></FollowersCart>
      </div>
   );
};

export default ProfileLeft;

import React from "react";
import "./LogoSearch.css";
import logo from "../../img/twitterb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LogoSearch = () => {
   return (
      <div className="logoSearch d-flex">
         <Link to={"/"}>
            <img src={logo} alt="" />
         </Link>
         <div className="search">
            <input type="text" placeholder="#Explore" />
            <div className="s-icon">
               <FontAwesomeIcon icon={faSearch} />
            </div>
         </div>
      </div>
   );
};

export default LogoSearch;

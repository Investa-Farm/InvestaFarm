import React from "react";
import './Profile.css'

const Profile = ({ farmerdashboard, investordashboard, loggedInFarmerDetails, loggedInInvestorDetails }) => {
  // console.log("Logged in farmer details PROFILE: ", loggedInFarmerDetails.address1); 
  return (
    <div className="profile-div">

      <div>
        <img src="/profile2.svg" alt="Avatar" className="avatar" />
      </div>

      <div className="profile-info">
          {
            loggedInFarmerDetails && (
              <h3 className="name">{ loggedInFarmerDetails.name1 } </h3>
            ) 
          }
          {
            loggedInInvestorDetails && (
              <h3 className="name">{ loggedInInvestorDetails.name } </h3>
            )
          }
          <h3 className="title">{ farmerdashboard ? "Farmer" : "Investor" }<p>Pro +</p></h3>
      </div>

    </div>
  );
};

export default Profile;

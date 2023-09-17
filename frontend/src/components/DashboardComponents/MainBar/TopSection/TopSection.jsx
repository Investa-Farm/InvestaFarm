import React from 'react'
import './TopSection.css'

const TopSection = ({ loggedInFarmerDetails, loggedInInvestorDetails, isInvestor }) => {
  console.log("Logged in farmer: ", loggedInFarmerDetails); 
  return (
    <div className='topsection-container'>
        <div className='topsection-title'>
            {
              loggedInInvestorDetails && (
                <p className='topsection-title1'>Hello, { loggedInInvestorDetails.name }</p>
              )
            }
            {
              loggedInFarmerDetails && (
                <p className='topsection-title1'>Hello, { loggedInFarmerDetails.name1 }</p>
              )
            }
            <p className='tagline'>Welcome to your profile <b>Edit now</b></p>
        </div>
        
        <div className='topsection-images'>
           <div>
                <img src="/setting.png" alt="settings"/>
           </div>
           <div>
                <img src="/notification.png" alt="notifications"/>
           </div>
        </div>
    </div>

  )
}

export default TopSection
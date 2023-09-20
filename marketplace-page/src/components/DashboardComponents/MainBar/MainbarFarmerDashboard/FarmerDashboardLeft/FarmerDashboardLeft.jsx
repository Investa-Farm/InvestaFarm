import React from 'react'
import './FarmerDashboardLeft.css'
import daos from '../dao.json';

const FarmerDashboardLeft = ({ loggedInFarmerDetails }) => {

  return (
    <div className="farmersdashboardleft-container">
      <h1>{loggedInFarmerDetails.financialReports}</h1>

      <div className='farmersdashboardleft-image-container'>
        <img src={daos[loggedInFarmerDetails.id].image} alt="DAO image" />
      </div>

      {/* <div className="light-green-spots"></div> */}
      
      <div className='farmersdashboardleft-description'>
        <p>{ loggedInFarmerDetails.name2 }</p>
      </div>

      <div>
        <a href={loggedInFarmerDetails.name} target="_blank">Farm Reports</a>
        <a href={loggedInFarmerDetails.farmReports} target="_blank">Financial Reports</a>
      </div>

    </div>
  )
}

export default FarmerDashboardLeft
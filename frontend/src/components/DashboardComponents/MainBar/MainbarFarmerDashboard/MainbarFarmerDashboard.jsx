import React from 'react'
import './MainbarFarmerDashboard.css'
import FarmerDashboardLeft from './FarmerDashboardLeft/FarmerDashboardLeft'
import FarmerDashboardRight from './FarmerDashboardRight/FarmerDashboardRight'
import TopSection from '../TopSection/TopSection'

const MainbarFarmerDashboard = ( { loggedInFarmerDetails, amountInvestedInDao, setLoading }) => {
  return (
    <div className='mainbarfarmerdashboard-container'>
        <TopSection 
          loggedInFarmerDetails={loggedInFarmerDetails}
        /> 
        <div className='farmersdashboard-main-container'>
            <FarmerDashboardLeft 
               loggedInFarmerDetails={loggedInFarmerDetails}
            /> 
            <FarmerDashboardRight 
              loggedInFarmerDetails={loggedInFarmerDetails}
              amountInvestedInDao={amountInvestedInDao}
              setLoading={setLoading}
            /> 
        </div>
    </div>
  )
}

export default MainbarFarmerDashboard
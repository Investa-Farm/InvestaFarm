import React from 'react'
import './FarmerDashboard.css'
import MainBar from '../DashboardComponents/MainBar/MainBar'
import Sidebar from '../DashboardComponents/SideBar/Sidebar'
import MainbarFarmerDashboard from '../DashboardComponents/MainBar/MainbarFarmerDashboard/MainbarFarmerDashboard'

const FarmerDashboard = ({ loggedInFarmerDetails, amountInvestedInDao, setLoading, walletBalance, investorDashboard, isInvestor, registeredDAOs, setRegisteredDAOs, setInvestorDashboard }) => {
  // console.log("FARMER DASHBOARD: ", loggedInFarmerDetails); 

  return (
    <div className='farmerdashboard-container'>
        {
          loggedInFarmerDetails == null ? (
            <div>
               FETCHING DAO DETAILS...
            </div>
          ) : (
            <>
               <Sidebar 
                farmerdashboard={true}
                investordashboard={false}
                loggedInFarmerDetails={loggedInFarmerDetails}
                walletBalance={walletBalance}
                setInvestorDashboard={setInvestorDashboard}
                investorDashboard={investorDashboard}
              /> 
              {
                investorDashboard && (
                  <MainbarFarmerDashboard 
                    loggedInFarmerDetails={loggedInFarmerDetails}
                    amountInvestedInDao={amountInvestedInDao}
                    setLoading={setLoading}
                  /> 
                )
              }
              {
                !investorDashboard && (
                  <MainBar 
                    loggedInFarmerDetails={loggedInFarmerDetails}
                    isInvestor={isInvestor}
                    registeredDAOs={registeredDAOs}
                    setRegisteredDAOs={setRegisteredDAOs}
                  /> 
                )
              }
              
            </>
          )
        }
    </div>
  )
}

export default FarmerDashboard
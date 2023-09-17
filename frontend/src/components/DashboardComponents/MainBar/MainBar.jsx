import React from 'react'
import './Mainbar.css'
import TopSection from './TopSection/TopSection'
import Marketplace from './MarketPlace/Marketplace'
// import MainBarInvestorDashboard from './MainBarInvestorDashboard/MainBarInvestorDashboard'

const MainBar = ({ loggedInInvestorDetails, isInvestor, registeredDAOs, setRegisteredDAOs, loggedInFarmerDetails }) => {
  return (
    <div className='mainbar-container'>
       <TopSection
         loggedInInvestorDetails={loggedInInvestorDetails}
         loggedInFarmerDetails={loggedInFarmerDetails}
         isInvestor={isInvestor}
       /> 
       <Marketplace 
         registeredDAOs={registeredDAOs}
         setRegisteredDAOs={setRegisteredDAOs}
       /> 
       {/* <TopSection />  */}
       {/* <Marketplace />  */}
       {/* <MainBarInvestorDashboard /> */}
    </div>
  )
}

export default MainBar
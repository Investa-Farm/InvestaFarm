import React from 'react'
import './Sidebar.css'
import Profile from './Profile/Profile'
import BalanceComponent from './Balance/Balance'
import NavSection from './NavigationSection/NavSection'


const Sidebar = ({ farmerdashboard, investordashboard, loggedInFarmerDetails, walletBalance, loggedInInvestorDetails, investorDashboard, setInvestorDashboard }) => {
  return (
    <div className='sidebar-main-div'>
        <Profile 
          farmerdashboard={farmerdashboard}
          investordashboard={investordashboard}
          loggedInFarmerDetails={loggedInFarmerDetails}
          loggedInInvestorDetails={loggedInInvestorDetails}
        /> 
        <BalanceComponent 
          walletBalance={walletBalance}
        /> 
        <NavSection 
          setInvestorDashboard={setInvestorDashboard}
          investorDashboard={investorDashboard}
        /> 
    </div>
  )
}

export default Sidebar
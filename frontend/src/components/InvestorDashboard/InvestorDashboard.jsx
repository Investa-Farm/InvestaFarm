import React from 'react'
import './InvestorDashboard.css'
import Sidebar from '../DashboardComponents/SideBar/Sidebar'
import MainBar from '../DashboardComponents/MainBar/MainBar'
import MainInvestorDashboard from '../DashboardComponents/MainBar/MainInvestorDashboard/MainInvestorDashboard'
// import MainBarInvestorDashboard from '../DashboardComponents/MainBar/MainBarInvestorDashboard'

const InvestorDashboard = ({ 
  isInvestor, 
  loggedInInvestorDetails, 
  walletBalance, 
  registeredDAOs,
  setRegisteredDAOs, 
  setInvestorDashboard, 
  investorDashboard,  
  totalInvestmentByInvestor, 
  totalDAOsInvestedByInvestor, 
  setTotalInvestmentByInvestor, 
  setTotalDAOsInvestedByInvestor
 }) => {
  return (
    <div className='investordashboard-container'>
        <Sidebar 
          loggedInInvestorDetails={loggedInInvestorDetails}
          walletBalance={walletBalance}
          setInvestorDashboard={setInvestorDashboard}
          investorDashboard={investorDashboard}
        /> 
        {
          !investorDashboard && (
            <MainBar 
              loggedInInvestorDetails={loggedInInvestorDetails}
              isInvestor={isInvestor}
              registeredDAOs={registeredDAOs}
              setRegisteredDAOs={setRegisteredDAOs}
          />
          )
        } 
        {
          investorDashboard && (
            <MainInvestorDashboard 
              loggedInInvestorDetails={loggedInInvestorDetails}
              registeredDAOs={registeredDAOs}
              setRegisteredDAOs={setRegisteredDAOs}
              totalInvestmentByInvestor={totalInvestmentByInvestor}
              totalDAOsInvestedByInvestor={totalDAOsInvestedByInvestor}
            />
          )
        }
        {/* <Sidebar />  */}
        {/* <MainBar />  */}
        {/* <MainBarInvestorDashboard /> */}
    </div>
  )
}

export default InvestorDashboard
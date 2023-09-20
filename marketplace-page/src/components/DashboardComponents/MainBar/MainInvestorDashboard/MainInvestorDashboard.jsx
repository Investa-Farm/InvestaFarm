import React from 'react'
import './MainInvestorDashboard.css'
import InvestorDashboardTop from './InvestorDashboardTop/InvestorDashboardTop'
import InvestorDashboardBottom from './InvestorDashboardBottom/InvestorDashboardBottom'
import TopSection from '../TopSection/TopSection'

const MainInvestorDashboard = ({ loggedInInvestorDetails, registeredDAOs, setRegisteredDAOs, totalInvestmentByInvestor, totalDAOsInvestedByInvestor }) => {
  return (
    <div className='maininvestordashboard-container'>
       <TopSection 
          loggedInInvestorDetails={loggedInInvestorDetails}
       />
       <div className='investordashboard-main-container'>
          <InvestorDashboardTop
            loggedInInvestorDetails={loggedInInvestorDetails}
            totalDAOsInvestedByInvestor={totalDAOsInvestedByInvestor} 
             totalInvestmentByInvestor={totalInvestmentByInvestor}
          />
          <InvestorDashboardBottom 
             registeredDAOs={registeredDAOs}
             setRegisteredDAOs={setRegisteredDAOs}
          />
       </div>
    </div>
  )
}

export default MainInvestorDashboard
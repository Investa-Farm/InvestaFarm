import React from 'react'
import './MainInvestorDashboard.css'
import InvestorDashboardTop from './InvestorDashboardTop/InvestorDashboardTop'
import InvestorDashboardBottom from './InvestorDashboardRight/InvestorDashboardBottom'
import TopSection from '../TopSection/TopSection'

const MainInvestorDashboard = ({ loggedInInvestorDetails, registeredDAOs, setRegisteredDAOs }) => {
  return (
    <div className='maininvestordashboard-container'>
       <TopSection 
          loggedInInvestorDetails={loggedInInvestorDetails}
       />
       <div className='investordashboard-main-container'>
          <InvestorDashboardTop
            loggedInInvestorDetails={loggedInInvestorDetails}
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
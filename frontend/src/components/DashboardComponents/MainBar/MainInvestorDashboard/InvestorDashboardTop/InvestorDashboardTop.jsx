import React from 'react'
import './InvestorDashboardTop.css'
import daos from '../dao.json';

const InvestorDashboardTop = ({ loggedInInvestorDetails }) => {
  return (
    <div className='investordashboardleft-container'>
        <div className='investortop-div'>
           <div className='investortop-img-container'>
             <img src="./money.png"  alt='money'/>
           </div>
           <p className='investortop-tagline'>Total Amount Invested</p> 
           <p className='investortop-numbers'>$259.45</p>
        </div>

        <div className='investortop-div'>
            <div className='investortop-img-container'>
             <img src="./profits.png"  alt='money'/>
            </div>
            <p className='investortop-tagline'>Current Profits</p> 
            <p className='investortop-numbers'>$---</p>
        </div>

        <div className='investortop-div'>
            <div className='investortop-img-container'>
             <img src="./dao.png"  alt='money'/>
            </div>
            <p className='investortop-tagline'>Total DAOs invested in</p> 
            <p className='investortop-numbers'>3</p>
        </div>

    </div>
  )
}

export default InvestorDashboardTop
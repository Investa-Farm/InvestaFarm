import React, { useState } from 'react'
import getProviderOrSigner from '../../../../../contractInstance';
import './InvestorDashboardTop.css'
// import daos from '../dao.json';

const InvestorDashboardTop = ({ loggedInInvestorDetails, totalDAOsInvestedByInvestor, totalInvestmentByInvestor}) => {
  const [totalnvestment, setTotalInvestment] = useState(0); 

  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000)
    return balance; 
  }

  // Calculate and set the converted amounts
  const calculateConvertedAmounts = async () => {
    const { priceConsumer } = await getProviderOrSigner(false);

    const price = await priceConsumer.getLatestPrice();
    const priceInt = parseInt(price) / 100000000;
    const formatedBalance = await formatBalance(totalInvestmentByInvestor); 
    console.log("Formatted : ", formatedBalance); 
    const convertedAmount = (formatedBalance * priceInt).toFixed(2);
    
    console.log("Converted amount is: ", convertedAmount); 
    setTotalInvestment(convertedAmount); 
  }
  
  calculateConvertedAmounts(); 

  return (
    <div className='investordashboardleft-container'>
        <div className='investortop-div'>
           <div className='investortop-img-container'>
             <img src="./money.png"  alt='money'/>
           </div>
           <p className='investortop-tagline'>Total Amount Invested</p> 
           <p className='investortop-numbers'>$ { totalnvestment }</p>
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
            <p className='investortop-numbers'>{ totalDAOsInvestedByInvestor.toNumber() }</p>
        </div>

    </div>
  )
}

export default InvestorDashboardTop
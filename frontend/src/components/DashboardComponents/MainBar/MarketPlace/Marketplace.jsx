import React from 'react'
import './Marketplace.css'
import MarketplaceHeader from './MarketplaceHeader/MarketplaceHeader'
import MarketplaceDAOs from './MarketplaceDAOs/MarketplaceDAOs'

const Marketplace = ({ registeredDAOs, setRegisteredDAOs }) => {
  return (
    <div className='marketplace-container'>
       <MarketplaceHeader /> 
       <MarketplaceDAOs 
         registeredDAOs={registeredDAOs}
         setRegisteredDAOs={setRegisteredDAOs}
       /> 
    </div>
  )
}

export default Marketplace
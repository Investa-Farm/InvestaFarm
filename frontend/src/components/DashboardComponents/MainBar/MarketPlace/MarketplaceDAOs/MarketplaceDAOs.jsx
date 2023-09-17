import React, { useEffect, useState } from 'react';
import './MarketplaceDAOs.css';
import daos from '../dao.json';
import getProviderOrSigner from '../../../../../contractInstance';
import DAO from '../../../../DAO/DAO';

const MarketplaceDAOs = ({ registeredDAOs, setRegisteredDAOs }) => {
  const [convertedAmounts, setConvertedAmounts] = useState(0); 
  const [showDao, setShowDao] = useState(false); 
  const [daoContent, setDaoContent] = useState(); 
  

  const handleFullDetails = async (daoId) => {
    console.log("DAO: ", daoId); 
    setShowDao(true); 
    setDaoContent(registeredDAOs[daoId.toNumber() - 1]); 
  }

  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000)
    return balance; 
  }

  useEffect(() => {
    // Calculate and set the converted amounts for all registered DAOs
    const calculateConvertedAmounts = async () => {
      const { priceConsumer } = await getProviderOrSigner(false);
      const updatedConvertedAmounts = {};

      for (const dao of registeredDAOs) { 
        const price = await priceConsumer.getLatestPrice();
        const priceInt = parseInt(price) / 100000000;
        const formatedBalance = await formatBalance(dao.amountInvested); 
        // console.log("Amount invested: ", dao.amountInvested);
        // console.log("Formatted : ", formatedBalance); 
        const convertedAmount = (formatedBalance * priceInt).toFixed(2);

        updatedConvertedAmounts[dao.id] = convertedAmount; 
      }
      setConvertedAmounts(updatedConvertedAmounts);
    }

    calculateConvertedAmounts();
  },  [registeredDAOs])


  return (
    <div className='marketplace-daos'>
      
      {registeredDAOs.map((dao, index) => (
        <div className='marketplace-dao' key={index}>
          <div className='marketplacedao-div1'>
            <div className='marketplacedao-image'>
              <img src={daos[dao.id].image} alt={dao.name} />
              <div className='hover-details' onClick={ () => handleFullDetails(dao.id)}>Check full details</div>
            </div>
            <div className='marketplacedao-details'>
              <div className='marketplacedao-texts'>
                <p>{dao.financialReports}</p>
                <p>{dao.name2}</p>
              </div>
              <div className='marketplacedao-icon'>
                <img src={daos[dao.id].image} alt={dao.name} />
              </div>
            </div>
          </div>

          <div className='marketplacedao-div2'>
            <div className='marketplace-funds'>
              <p>Current Fund</p>
              {/* <p>$ {dao.amountInvested.toFixed(2)}</p> */}
              {convertedAmounts[dao.id] && <p> $ {convertedAmounts[dao.id]}</p>}
            </div>
            <div className='marketplace-approval'>
              {dao.verified ? <p className='marketplace-approved'>Approved</p> : <p className='marketplace-not-approved'>Not approved</p>}
            </div>
          </div>
        </div>
      ))}

       {
        showDao && (
          <DAO 
            daoContent={daoContent}
            setShowDao={setShowDao}
            setRegisteredDAOs={setRegisteredDAOs}
          />
        )
      }

    </div>
  );
};

export default MarketplaceDAOs;

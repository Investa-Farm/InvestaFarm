import React, { useState, useEffect } from 'react';
import './DaoMarketplace.css';
// import '../DAO/DAO.css';
import getProviderOrSigner from '../../contractInstance';
import PopupModal from '../PopupModal/PopupModal';
import { BigNumber, utils } from 'ethers';
import connectWallet from '../ConnectWallet/ConnectWallet';
import LoadingModal from '../Loading/Loading';
import PopupDiv from '../PopupDiv/PopupDiv';

function DaoMarketplace({ registeredDAOs, setRegisteredDAOs }) {
  const [showAll, setShowAll] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [loadingStatement, setLoadingStatement] = useState(""); 
  const [showPopup, setShowPopup] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(false); 
  const [investmentAmount, setInvestmentAmount] = useState(0); 
  const [ethPrice, setEthPrice] = useState(); 
  const [showInvest, setShowInvest] = useState(false); 

  let investAMT = 0; 
  // let ethPrice; 


  const getRegisteredDAOs = async () => {
    const { farmDaoContract }  = await getProviderOrSigner(false); 
    console.log("Fetching DAOs...")
    const allDAOs = await farmDaoContract.getAllDaos(); 
    
    console.log("DAOs created are: ", allDAOs)
    setRegisteredDAOs(allDAOs); 
  }
  
  // Remove this function
  const getPriceFeed = async () => {
    const { priceFeed } = await getProviderOrSigner(false);
    console.log("Getting round data..."); 
    const roundData = await priceFeed.latestRoundData(); 
    console.log("Main round data: ", roundData); 
    console.log("Round data: ", utils.formatEther(roundData[0])); 
    // priceFeed.latestRoundData().then((roundData) => {
    //   // Do something with roundData
    //   console.log("Latest Round Data", roundData); 
    // })
  }

  const getPriceConsumer = async (amount) => {
    const { priceConsumer } = await getProviderOrSigner(false); 
    const price = await priceConsumer.getLatestPrice(); 
    const priceInt = parseInt(price) / 100000000;  

    const investAmount = amount / priceInt;
    
    setEthPrice(priceInt); 
    return investAmount.toFixed(5); 
  }

  const investDao = async (investAmt, id) => {
    console.log("Sending funds...")
    setShowModal(false); 
    setLoading(true); 
    setLoadingStatement("Sending funds...")
    try { 
      const investAmount = await getPriceConsumer(investAMT);
      setInvestmentAmount(investAmount); 
      console.log("Investment amount: ", investAmount);
      const { farmDaoContract } = await getProviderOrSigner(true); 
      const tx = await farmDaoContract.addInvestment(id, {
        value: utils.parseEther(investAmount),
        gasLimit: 100000,
      }); 

      await tx.wait(); 
      console.log("Funds sent successfully!"); 
      setLoading(false); 
      console.log("Funds sent succesfully!")
      
      setSuccess(true); 
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false)
        setSuccess(false)
      }, 3000)

      getRegisteredDAOs(); 
    } catch(error) {
      console.error(error); 
      setLoading(false);
      setShowPopup(true);
      setError(true) 
      setTimeout(() => {
        setShowPopup(false); 
        setError(false)
      }, 3000)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = async (title, itemId, item) => {
    
    const hyperlinkTag = item.investors.map((investor) => (
      <a href={`https://sepolia.etherscan.io/address/${investor}`} target='_blank' className='investors'>{investor.slice(0,6)}...{investor.slice(38,42)}</a>
    ));
  
    const contentHeader = (
      <div className='content-container'>
        <h2 className='dao-name'>{item.financialReports}</h2>
        <div className="description">
          <p>{item.description}</p>
        </div>
        <div className="invested-form">
          <p className='descriptionArea'>Total Amount Invested</p>
          <p className='descriptionArea'>{(parseFloat(utils.formatEther(item.amountInvested))*ethPrice).toFixed(5)} USD</p>
        </div>
      </div>
    );
  
    const daoContent = (
      <div className="content-container">
        {contentHeader}
        <div className='reports-container'>
          <div className='reports'>
            <div>
              <a href={item.farmReports} target='_blank'>Financial Reports</a>
            </div>
            <div>
              <a href={item.name} target='_blank'>Farm Reports</a>
            </div>
          </div>
          <div className="invested-form">
            <div>
              <p className='descriptionArea'>Investors</p>
              <div className='descriptionArZea'>
                {hyperlinkTag}
              </div>
            </div>
            <div>
              <p className='descriptionArea'>Owners</p>
              <div className='descriptionArea'>
                <a href={`https://sepolia.etherscan.io/address/${item.address1}`} target='_blank'>{item.address1.slice(0,6)}...{item.address1.slice(38,42)}</a>
                <a href={`https://sepolia.etherscan.io/address/${item.address2}`} target='_blank'>{item.address2.slice(0,6)}...{item.address2.slice(38,42)}</a>
              </div>
            </div>
          </div> 
        </div>
        <div>
          <button className="withdraw-button" onClick={() => setModalContent(investContent)}>Invest in DAO</button>
          <button className="exit-button" onClick={handleCloseModal}>Exit</button>
        </div>
      </div>
    );
  
    const investContent = (
      <div className='content-container'>
        {contentHeader}
        <div>
          {
            item.verified ? (
              <div>
                <label>Amount: </label>
                <input 
                  className='invest-input'
                  type="number" 
                  placeholder="Enter amount to invest in dollars (USD)" 
                  name="DaoName"
                  onChange={async (e) => {
                    investAMT = e.target.value; 
                    const priceInEth = await getPriceConsumer(investAMT); 
                    console.log("Price in eth is: ", priceInEth); 
                    setInvestmentAmount(priceInEth); 
                  }}
                />
              </div>
            ) : (
              <div>
                  This DAO is not yet approved for investment <br/> Contact admin 
              </div>
            )
          }
        </div>
        { 
          item.verified && ( 
            <button className="close-btn" onClick={() => investDao(investAMT, parseInt(itemId))}>INVEST</button> 
          )     
        }
        <div>
          <button className="withdraw-button" onClick={() => setModalContent(daoContent)}>Check DAO details</button>
          <button className="exit-button" onClick={handleCloseModal}>Exit</button>
        </div>
      </div>
    );
    
    // Setting title to Invest 
    setModalTitle(title);

    // Setting the modal content
    setModalContent(daoContent);
    
    setShowModal(true);
  }
  

  useEffect(() => {
    getRegisteredDAOs(); 
    getPriceConsumer(); 
  }, [investmentAmount])

  return (

    <div className='dao-container2' id="daomarketplace">

      <LoadingModal 
        loading={loading}
        loadingStatement={loadingStatement}
      />

      <PopupDiv 
        showPopup={showPopup}
        error={error}
        succes={success}
      />

      <h2 className='dao-heading'>MARKETPLACE</h2>
       
      {registeredDAOs.length > 0 &&
        <div className="card-container">
          {registeredDAOs.map((item, index) => (
            <div key={index} className="card">
              <div className="card-info">
                <h3>{item.financialReports}</h3> {/* THIS IS A BUG -- MAKE CHANGESS */}
                <div>Farmer Address 1: {item.address1.slice(0,6)}...{item.address1.slice(38,42)}<br/>Farmer Address 2: {item.address2.slice(0,6)}...{item.address2.slice(38,42)}</div>
                <p>DESCRIPTION: {item.description}</p>
                <p>FUNDS INVESTED: {(parseFloat(utils.formatEther(item.amountInvested))*ethPrice).toFixed(5)} USD</p>
              </div>
              <div className="card-buttons">
                {/* <button onClick={() => handleShowModal("LOAN", item.id.toString())}>Loan</button> */}
                <button className='details-dao' onClick={() => handleShowModal("INVEST", item.id.toString(), item)}>Check full details</button>
                  { 
                    !item.verified ? (
                      <p className='pending'>Pending Approval</p>
                    ) : (
                      <p className='approved'>Approved!</p>
                    )
                  }
              </div>
            </div>
          ))}
        </div>
      }

      <PopupModal 
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  );
}

export default DaoMarketplace;

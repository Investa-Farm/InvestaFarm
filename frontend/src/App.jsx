import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import partciles from 'particles.js'; // WORK ON THIS IMPORTS
import DaoDashboard from './components/DaoDashboard/DaoDashboard'
// import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import DaoMarketplace from './components/DaoMarketplace/DaoMarketplace'
import { 
  BrowserRouter as Router,  
  Route,
  Routes,
  // Redirect
 } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import connectWallet from './components/ConnectWallet/ConnectWallet'
import TrapezoidalDiv from './components/TrapezoidalDiv/TrapezoidalDiv'
import HowRegistraionWorks from './components/HowRegistrationWorks/HowRegistraionWorks'
import InvestorDashboard from './components/InvestorDashboard/InvestorDashboard'
import FarmerDashboard from './components/FarmerDashboard/FarmerDashboard'

// NEW IMPORTS 
import getProviderOrSigner from './contractInstance'
import PopupDiv from './components/PopupDiv/PopupDiv'
import { ethers } from 'ethers'

import { BigNumber } from 'ethers';

function App() {
  const [address, setAddress] = useState(); 
  const [walletConnected, setWalletConnected] = useState(); 

  // New state variables 
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  const [isFarmer, setIsFarmer] = useState(false); 
  const [isInvestor, setIsInvestor] = useState(false); 
  const [addressRegistered, setAddressRegistered] = useState(true); 
  const [loggedInFarmerDetails, setLoggedInFarmerDetails] = useState(null); 
  const [loggedInInvestorDetails, setLoggedInInvesorDetails] = useState(null); 
  const [daosRegistered, setDaosRegistered] = useState(null); 
  const [amountInvestedInDao, setAmountInvestedInDao] = useState(); 
  const [loading, setLoading] = useState(false); 
  const [walletBalance, setWalletBalance] = useState(null);
  const [investorDashboard, setInvestorDashboard] = useState(false); 

  const getRegisteredFarmers = async () => {
    let isFarmerRegistered; 
    let registeredDAOId;

    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    await connectWallet();
    const { farmDaoContract } = await getProviderOrSigner(false);

    // console.log("Fetching DAO details...");

    // Call the getAllDaos function from the smart contract
    const registeredDAOs = await farmDaoContract.getAllDaos();
    setRegisteredDAOs(registeredDAOs); 

    // console.log("Registered DAOs:", registeredDAOs);
    // console.log("Account is: ", account);

    // Check if the connected account matches any of the farmer addresses in registeredDAOs
    // const isAccountRegistered = registeredDAOs.some((dao) =>
    //     dao.address1.toLowerCase() === account.toLowerCase() ||
    //     dao.address2.toLowerCase() === account.toLowerCase()
    // );

    // Check if the connected account matches any of the farmer addresses in registeredDAOs
    const matchingDAO = registeredDAOs.find((dao) =>
      dao.address1.toLowerCase() === account.toLowerCase() ||
      dao.address2.toLowerCase() === account.toLowerCase()
    );

    // console.log("Matching DAO: ", matchingDAO); 

    if (matchingDAO) {
        isFarmerRegistered = true; 
        registeredDAOId = matchingDAO.id;
        const registeredDAOIdAsNumber = registeredDAOId.toNumber();
        // console.log('Registered DAO id is: ', registeredDAOIdAsNumber); 
        setAddressRegistered(false); 
        getRegisteredDAOs(registeredDAOIdAsNumber);
        return true; 
        // setIsFarmer(true); 
        // setIsInvestor(false); 
    } else {
        isFarmerRegistered = false ; 
        window.alert("You are not registered!");
        console.log("Connected account does not match");
        return false; 
    }
  }


  const getRegisteredDAOs = async (daoId) => {
    await connectWallet(); 
    const { farmDaoContract }  = await getProviderOrSigner(false); 
    console.log("Fetching DAOs...")

    try {
      const allDAOs = await farmDaoContract.getAllDaos(); 
      // console.log("All DAOs are: ", allDAOs); 
      setRegisteredDAOs(allDAOs); 
      const amountInvested = await farmDaoContract.getCurrentAmountAvailable(daoId); 
      setAmountInvestedInDao(amountInvested); 
      // console.log("Amount invested: ", amountInvested); 
      // console.log("All DAOs are: ", allDAOs[0].id); 
      const filteredDAO = allDAOs.find((dao) => dao.id.toNumber() === daoId);
      console.log("DAO created by connected wallet:", filteredDAO);
      setLoggedInFarmerDetails(filteredDAO); 
      // setRegisteredDAOs(allDAOs); 
    } catch (error) {
      console.error(error)
    }

  }

  const getRegisteredInvestors = async () => {
    let isInvestorRegistered = false;  

    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    await connectWallet();
    const { farmDaoContract } = await getProviderOrSigner(false);
    
    // console.log("Fetching investor details...")
    // Call the getAllInvestorInfo function from the smart contract
    const investorInfoList = await farmDaoContract.getAllInvestorInfo();
    const totalInvestment = await farmDaoContract.getTotalInvestmentByInvestor(account);
    const totalNumberOfDaos = await farmDaoContract.getTotalNumberOfDaosByInvestor(account);

    const connectedAccountMatches = investorInfoList.some((info) => info.investorAddress.toLowerCase() === account.toLowerCase());

    // console.log("Account is: ", account); 

    if (connectedAccountMatches) {
      const connectedAccountInfo = investorInfoList.find((info) => info.investorAddress.toLowerCase() === account.toLowerCase());
      setLoggedInInvesorDetails(connectedAccountInfo);  
    }

    for (let i = 0; i < investorInfoList.length; i++){ 

      const isAccountRegistered = investorInfoList.some((info) => info[0].toLowerCase() === account.toLowerCase());

      if (isAccountRegistered) {
        setAddressRegistered(false); 
      }
      return true; 

      // console.log("Is investor registered: ", isAccountRegistered); 
      // isInvestorRegistered = true; 
      // setIsInvestor(true); 
      // setIsFarmer(false); 
    }

    // return isInvestorRegistered; 
  }

  // Function to detect the user's role (farmer or investor)
  const detectUserRole = async () => {
    const isFarmer = await getRegisteredFarmers();
    const isInvestor = await getRegisteredInvestors();
    console.log("Investor: ", isInvestor); 
    
    if (isFarmer) {
      console.log("Connected wallet is a farmer");
      setIsFarmer(true);
      setIsInvestor(false);
    } else if (isInvestor) {
      console.log("Connected wallet is an investor");
      setIsFarmer(false);
      setIsInvestor(true);
    } else {
      console.log("Connected wallet is not registered as a farmer or investor");
      setIsFarmer(false);
      setIsInvestor(false);
    }
  };

  // Formatting balance 
  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance; 
  }
  
  // Getting wallet balance 
  const getWalletBalance = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account); 
      const formattedBalance = await formatBalance(balance); 
      setWalletBalance(formattedBalance); 
      console.log("Balance is: ", formattedBalance); 

    } catch (error) {
      console.error(error); 
    }
  }

  useEffect( () => {
    detectUserRole(); 
    getWalletBalance(); 
  }, []) 
  
  return (
    <div className="App">
            {/* The components commented out will be removed eventually */}
            
            <div className="trapezoid-background">
              {/* <TrapezoidalDiv /> */}
            </div>

            <div className="content-wrapper">
              {/* <Navbar
                ConnectWallet={connectWallet}
                walletConnected={walletConnected}
                setWalletConnected={setWalletConnected}
                setAddress={setAddress}
                address={address}
              />

              <DaoDashboard
                registeredDAOs={registeredDAOs}
                setRegisteredDAOs={setRegisteredDAOs}
                address={address}
                setAddress={setAddress}
              />
              
              <HowRegistraionWorks />

              <DaoMarketplace
                registeredDAOs={registeredDAOs}
                setRegisteredDAOs={setRegisteredDAOs}
              /> */}
              
              { 
                addressRegistered && (
                  <PopupDiv 
                    showPopup={true} 
                    loading={loading}
                    error={false}
                    success={false} 
                  />
                )
              }
              {loggedInFarmerDetails && isFarmer && !isInvestor && (
                <FarmerDashboard 
                  loggedInFarmerDetails={loggedInFarmerDetails} 
                  amountInvestedInDao={amountInvestedInDao}
                  setLoading={setLoading}
                  walletBalance={walletBalance}
                  investorDashboard={investorDashboard}
                  setInvestorDashboard={setInvestorDashboard}
                  registeredDAOs={registeredDAOs}
                  setRegisteredDAOs={setRegisteredDAOs}
                />
              )}

              {!addressRegistered && isInvestor && !isFarmer && (
                <InvestorDashboard 
                   isInvestor={isInvestor}
                   loggedInInvestorDetails={loggedInInvestorDetails}
                   walletBalance={walletBalance}
                   registeredDAOs={registeredDAOs}
                   setRegisteredDAOs={setRegisteredDAOs}
                   investorDashboard={investorDashboard}
                   setInvestorDashboard={setInvestorDashboard}
                />
              )}
            </div>
    </div>
  )
}

export default App

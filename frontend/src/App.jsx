import { useEffect, useState } from 'react'
import './App.css'
import connectWallet from './components/ConnectWallet/ConnectWallet'
import InvestorDashboard from './components/InvestorDashboard/InvestorDashboard'
import FarmerDashboard from './components/FarmerDashboard/FarmerDashboard'
import getProviderOrSigner from './contractInstance'
import PopupDiv from './components/PopupDiv/PopupDiv'
import { ethers } from 'ethers'

function App() {
  // New state variables 
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  const [isFarmer, setIsFarmer] = useState(false); 
  const [isInvestor, setIsInvestor] = useState(false); 
  const [addressRegistered, setAddressRegistered] = useState(true); 
  const [loggedInFarmerDetails, setLoggedInFarmerDetails] = useState(null); 
  const [loggedInInvestorDetails, setLoggedInInvesorDetails] = useState(null); 
  const [amountInvestedInDao, setAmountInvestedInDao] = useState(); 
  const [loading, setLoading] = useState(false); 
  const [walletBalance, setWalletBalance] = useState(null);
  const [investorDashboard, setInvestorDashboard] = useState(false); 
  const [totalInvestmentByInvestor, setTotalInvestmentByInvestor] = useState(0); 
  const [totalDAOsInvestedByInvestor, setTotalDAOsInvestedByInvestor] = useState(0); 

  const getRegisteredFarmers = async () => {
    let isFarmerRegistered; 
    let registeredDAOId;

    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    await connectWallet();
    const { farmDaoContract } = await getProviderOrSigner(false);

    // Call the getAllDaos function from the smart contract
    const registeredDAOs = await farmDaoContract.getAllDaos();
    setRegisteredDAOs(registeredDAOs); 

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
        setAddressRegistered(false); 
        getRegisteredDAOs(registeredDAOIdAsNumber);
        return true; 
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
      setRegisteredDAOs(allDAOs); 
      const dao = await checkInvestmentsInDAOs(allDAOs);
      console.log("Connected account has invested in: ", dao); 
      const amountInvested = await farmDaoContract.getCurrentAmountAvailable(daoId); 
      setAmountInvestedInDao(amountInvested); 
      const filteredDAO = allDAOs.find((dao) => dao.id.toNumber() === daoId);
      console.log("DAO created by connected wallet:", filteredDAO);
      setLoggedInFarmerDetails(filteredDAO); 
      // setRegisteredDAOs(allDAOs); 
    } catch (error) {
      console.error(error)
    }

  }

  const checkInvestmentsInDAOs = async (allDAOs) => {
    console.log("Checking..."); 
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      
      console.log("Checking investments in DAOs for account: ", account);
      for (const dao of allDAOs) {
        const isInvestorInDAO = dao.investors.some((investor) => investor.toLowerCase() === account.toLowerCase());
        if (isInvestorInDAO) {
            console.log("Connected account has invested in DAO:", dao);
            return dao; 
        }
      }

    } catch (error) {
      console.error(error); 
    }
  }

  const getRegisteredInvestors = async () => {
    let isInvestorRegistered = false;  

    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    await connectWallet();
    const { farmDaoContract } = await getProviderOrSigner(false);
    
    // Call the getAllInvestorInfo function from the smart contract
    const investorInfoList = await farmDaoContract.getAllInvestorInfo();
    const totalInvestment = await farmDaoContract.getTotalInvestmentByInvestor(account);
    setTotalInvestmentByInvestor(totalInvestment); 
    const totalNumberOfDaos = await farmDaoContract.getTotalNumberOfDaosByInvestor(account);
    setTotalDAOsInvestedByInvestor(totalNumberOfDaos); 

    const connectedAccountMatches = investorInfoList.some((info) => info.investorAddress.toLowerCase() === account.toLowerCase());
    console.log("Connected account matches ", connectedAccountMatches); 

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

            <div className="content-wrapper">
              
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
                   totalInvestmentByInvestor={totalInvestmentByInvestor}
                   totalDAOsInvestedByInvestor={totalDAOsInvestedByInvestor} 
                   setTotalInvestmentByInvestor={setTotalDAOsInvestedByInvestor} 
                   setTotalDAOsInvestedByInvestor={setTotalDAOsInvestedByInvestor}
                />
              )}
            </div>
    </div>
  )
}

export default App

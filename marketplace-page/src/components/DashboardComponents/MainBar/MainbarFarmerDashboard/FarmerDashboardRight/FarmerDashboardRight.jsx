import React from 'react'
import { useState, useEffect } from 'react'
import { utils } from 'ethers';
import './FarmerDashboardRight.css'
import PopupModal from '../../../../PopupModal/PopupModal'
import getProviderOrSigner from '../../../../../contractInstance'
import PopupDiv from '../../../../PopupDiv/PopupDiv'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FarmerDashboardRight = ( { loggedInFarmerDetails, amountInvestedInDao }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(""); 
    const [showPopup, setShowPopup] = useState(false); 
    const [success, setSuccess] = useState(false); 
    const [error, setError] = useState(false); 
    const [convertedAmount, setConvertedAmount] = useState(0); 
    const [convertedTotal, setConvertedTotal] = useState(0); 
    const [convertedWithdraw, setConvertedWithdraw] = useState(0); 
    
    let withdrawnFromContract; 
    let amountToWithdraw;  
    let amountToPay; 


    const getTotalWithdrawn = async () => {
        console.log("Getting total withdrawn...")
        try {
            const { farmDaoContract }  = await getProviderOrSigner(false); 
            const amountWithdrawn = await farmDaoContract.getTotalAmountWithdrawn(loggedInFarmerDetails.id); 
            withdrawnFromContract = amountWithdrawn; 
        } catch (error) {
            console.error(error); 
        }
    }
    
  const handleWithdraw = async (daoId) => {

    toast.info('Withdrawing funds', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    setLoading(true); 

    try {
        console.log("Amount to withdraw is: ", amountToWithdraw); 
        console.log("Dao id is: ", daoId); 

        const { farmDaoContract }  = await getProviderOrSigner(true); 
        const tx = await farmDaoContract.withDrawDFunds(daoId, amountToWithdraw); 
        await tx.wait(); 

        const allDAOs = await farmDaoContract.getAllDaos(); 
        setRegisteredDAOs(allDAOs); 
        toast.success('Funds withdrawn succesfully!', {
            position: "top-center",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        // setLoading(false); 
    } catch (error) {
        console.error(error); 
        setLoading(false);
        toast.error('Sorry an error occured!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

  }

  const handlePayBack = async (daoId) => {
    const { farmDaoContract }  = await getProviderOrSigner(false); 
    try {
        console.log("Amount to pay is: ", amountToPay); 
        console.log("Dao Id is: ", daoId); 

        setSuccess(true); 
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false)
            setSuccess(false)
        }, 3000)
    } catch (error) {
        console.error(error); 
    }
  }

    // Isolating investors
    const hyperlinkTag = loggedInFarmerDetails.investors.map((investor) => {
        return (
            <a href={`https://sepolia.etherscan.io/address/${investor}`} target='_blank' className='investors'>{investor.slice(0,6)}...{investor.slice(38,42)}</a>
        )
    })

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = async (title) => {
        let daoContent; 

        if (title === "Withdraw"){
            daoContent = (
                <div className='content-container'>
                    <h2 className='dao-name'>WITHDRAW FUNDS</h2>
                    <div className="invested-form">
                        <p className='descriptionArea'>Total Amount Remaining is: $ { convertedAmount - convertedWithdraw } </p><br/>
                        <div>
                            <label>Amount</label>
                            <input 
                            type="text" 
                            placeholder="Enter amount you want to withdraw" 
                            name='amountToWithdraw'
                            onChange={ (e) => {
                                amountToWithdraw = e.target.value
                            }}
                            />
                        </div>
                      
                        <div className='investedform-buttons'>
                            <button className="withdraw-button" onClick={() => handleWithdraw(loggedInFarmerDetails.id, amountToWithdraw)}>Withdraw</button>
                            <button className="exit-button" onClick={handleCloseModal}>Exit</button>
                        </div>
                       
                    </div>
                </div>
            )
        } else if (title === "PayBack"){
            daoContent = (
                <div className='content-container'>
                    <h2 className='dao-name'>PAY BACK</h2>
                    <div className="description">
                    </div>
                    <div className="invested-form">
                        <p className='descriptionArea'>Total Amount due is:</p><br/>
                        <div>
                            <label>Amount</label>
                            <input 
                            type="text" 
                            placeholder="Enter amount you want to pay back" 
                            name='amountToPay'
                            onChange={ (e) => {
                                amountToPay = e.target.value
                            }}
                            />
                        </div>
                        <div className='investedform-buttons'>
                            <button className="withdraw-button" onClick={() => handlePayBack(loggedInFarmerDetails.id)}>Pay Back</button>
                            <button className="exit-button" onClick={handleCloseModal}>Exit</button>
                        </div>
                    </div>
                </div>
            )
        }
        // Setting title to Invest 
        setModalTitle(title);
    
        // Setting the modal content
        setModalContent(daoContent);
        
        setShowModal(true);
    }

    const formatBalance = (rawBalance) => {
        const balance = (parseInt(rawBalance) / 1000000000000000000)
        return balance; 
      }
    
      useEffect(() => {
        // Calculate and set the converted amounts for all registered DAOs
        const calculateConvertedAmount = async () => {
          const { priceConsumer } = await getProviderOrSigner(false);
        //   const updatedConvertedAmounts = {};

            const price = await priceConsumer.getLatestPrice();
            const priceInt = parseInt(price) / 100000000;
            const formatedBalance1 = await formatBalance(amountInvestedInDao); 
            const formatedBalance2 = await formatBalance(withdrawnFromContract)
            // console.log("Amount invested: ", dao.amountInvested);
            // console.log("Formatted : ", formatedBalance); 
            const convertedAmount1 = (formatedBalance1 * priceInt).toFixed(2);
            const convertedAmount2 = (formatedBalance2 * priceInt).toFixed(2);
    
            // updatedConvertedAmounts[dao.id] = convertedAmount; 
            setConvertedAmount(convertedAmount1); 
            setConvertedWithdraw(convertedAmount2); 
          }
  
        calculateConvertedAmount();
        getTotalWithdrawn(); 
      },  [amountInvestedInDao])

  return (
    <div className='farmersdashboardright-container'>

        <div className='ownersdiv'>
            <h3>Owners</h3> 
            <div>
                <p>{ loggedInFarmerDetails.name1 }  <a href={`https://sepolia.etherscan.io/address/${loggedInFarmerDetails.address1}`} target="_blank" >{ loggedInFarmerDetails.address1.slice(0,6)} ... {loggedInFarmerDetails.address1.slice(38,42)}</a></p>
                <p>{ loggedInFarmerDetails.description }  <a href={`https://sepolia.etherscan.io/address/${loggedInFarmerDetails.address2}`} target="_blank" >{ loggedInFarmerDetails.address2.slice(0,6)} ... {loggedInFarmerDetails.address2.slice(38,42)}</a></p>
            </div>
        </div>
        
        <div className='investors-main-container'>
            <div className='invested-container'> 
                <h3>Invested</h3>
                <div>
                    <p>Total: <b> $ { convertedAmount } </b></p>
                    <p>Withdrawn: <b> $ { convertedWithdraw } </b></p>
                    <p>Current: <b> $ { convertedAmount - convertedWithdraw } </b></p>
                    <p>Amount Due: <b> -- </b></p>
                </div>
            </div>
            <div className='investors-container'>
                <h3>Investors</h3>
                <div>
                    { hyperlinkTag }
                </div>
            </div>
        </div>

        <div className='farmer-pay-button'>
            <button onClick={ () => handleShowModal("Withdraw")}>Withdraw</button>
            <button onClick={ () => handleShowModal("PayBack")}>Pay Back</button>
        </div>

        <ToastContainer
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        
        <PopupModal 
           handleShowModal={handleShowModal}
           handleCloseModal={handleCloseModal}
           showModal={showModal}
           modalTitle={modalTitle}
           modalContent={modalContent}
        />

       <PopupDiv 
            showPopup={showPopup}
            error={error}
            succes={success}
        />

    </div>
  )
}

export default FarmerDashboardRight
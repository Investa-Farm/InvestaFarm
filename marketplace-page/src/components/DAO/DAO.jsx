
import React, { useEffect, useState } from 'react';
import { utils } from 'ethers';
import getProviderOrSigner from '../../contractInstance';
import './DAO.css'; // Import the CSS file for styling
import PopupDiv from '../PopupDiv/PopupDiv';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DAO = ({ daoContent, setShowDao, setRegisteredDAOs }) => {
    const [invest, setInvest] = useState(false); 
    const [investmentAmount, setInvestmentAmount] = useState(0); 
    const [convertedAmounts, setConvertedAmounts] = useState(0); 
    const [loading, setLoading] = useState(false); 


    let investAMT = 0; 

    const getPriceConsumer = async (amount) => {
        const { priceConsumer } = await getProviderOrSigner(false); 
        const price = await priceConsumer.getLatestPrice(); 
        const priceInt = parseInt(price) / 100000000;  
    
        const investAmount = amount / priceInt;
        // setEthPrice(priceInt); 
        return investAmount.toString(); 
    }

    const handleInvest = async (amount, daoId) => {
        try {
            toast.info('Sending funds', {
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
            const { farmDaoContract }  = await getProviderOrSigner(true); 
            const tx = await farmDaoContract.addInvestment(daoId, { value: utils.parseEther(amount), gasLimit: 1000000 }); 
            await tx.wait(); 

            const allDAOs = await farmDaoContract.getAllDaos(); 
            setRegisteredDAOs(allDAOs); 

            toast.success('Funds sent succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

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

    const hyperlinkTag = daoContent.investors.map((investor) => {
        return (
            <a href={`https://sepolia.etherscan.io/address/${investor}`} target='_blank' className='investors'>{investor.slice(0,6)}...{investor.slice(38,42)}</a>
        )
    })

    const formatBalance = (rawBalance) => {
        const balance = (parseInt(rawBalance) / 1000000000000000000)
        return balance; 
    }
    
    useEffect(() => {
        // Calculate and set the converted amounts for all registered DAOs
        const calculateConvertedAmounts = async () => {
            const { priceConsumer } = await getProviderOrSigner(false);
            // const updatedConvertedAmounts = {};

            // for (const dao of registeredDAOs) { 
            const price = await priceConsumer.getLatestPrice();
            const priceInt = parseInt(price) / 100000000;
            const formatedBalance = await formatBalance(daoContent.amountInvested); 
            // console.log("Amount invested: ", dao.amountInvested);
            // console.log("Formatted : ", formatedBalance); 
            const convertedAmount = (formatedBalance * priceInt); 
            // }
            setConvertedAmounts(convertedAmount);
        }

        calculateConvertedAmounts();
    },  [daoContent])

    return (
        <div className="login-container"> 

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

            <div className="login-form">
                <h2>{daoContent.financialReports}</h2>

                <div className="description">
                    <p>{daoContent.description}</p>
                </div>

                <div className="invested-form">
                    <p className='descriptionArea' >Total Amount Invested</p>
                    <p className='descriptionArea' >{ convertedAmounts.toFixed(2) } USD</p>
                </div>

                <div className='reports'>
                    <div>
                      <a href={daoContent.farmReports} target='_blank'>Financial Reports</a>
                    </div>
                    <div>
                      <a href={daoContent.name} target='_blank'>Farm Reports</a>
                    </div>
                </div>
                    
                <div className="invested-form">
                    {
                        invest & !loading && (
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
                                    // console.log("Price in eth is: ", priceInEth); 
                                    setInvestmentAmount(priceInEth); 
                                    }}
                               />
                                <button className="close-btn" onClick={() => handleInvest(investmentAmount, parseInt(daoContent.id))}>INVEST</button> 
                            </div>
                        )
                    } 
                    {
                       loading && (
                        <div>
                            Sending funds...
                        </div>
                       )
                    }
                    {
                        !invest && (
                            <div>
                                <div>
                                    <p className='descriptionArea' >Investors</p>
                                    <div  className='descriptionArZea'>
                                        { hyperlinkTag }
                                    </div>
                                </div>

                                <div>
                                    <p className='descriptionArea' >Owners</p>
                                    <div  className='descriptionArea'>
                                        <a href={`https://sepolia.etherscan.io/address/${daoContent.address1}`} target='_blank'>{daoContent.address1.slice(0,6)}...{daoContent.address1.slice(38,42)}</a>
                                        <a href={`https://sepolia.etherscan.io/address/${daoContent.address2}`} target='_blank'>{daoContent.address2.slice(0,6)}...{daoContent.address2.slice(38,42)}</a>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>

                <div>
                    { 
                       daoContent.verified ? (
                        <button className="withdraw-button" onClick={ () => setInvest(current => !current)  }> { !invest ? "Invest" : "Check DAO Details"} </button>
                       ) : (
                        <button className="withdraw-button" onClick={ () => console.error("DAO not verified for withdrawal")}>DAO is not verified for investing!</button>
                       )
                    }
                    <button className="exit-button" onClick={ () => setShowDao(false) }>Exit</button>
                </div>
            </div>

        </div>
    );
};

export default DAO;





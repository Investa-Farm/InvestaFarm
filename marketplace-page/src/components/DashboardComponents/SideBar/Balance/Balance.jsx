import React, { useState } from "react";
import './Balance.css'
import getProviderOrSigner from "../../../../contractInstance";

const BalanceComponent = ({ balance, currency, walletBalance }) => {
  console.log("Wallet Balance is: ", walletBalance); 
  const [wallet, setWallet] = useState(0); 

  let converetedWalletBalance; 

  const getPriceConsumer = async () => {
    const { priceConsumer } = await getProviderOrSigner(false); 
    const price = await priceConsumer.getLatestPrice(); 
    const priceInt = parseInt(price) / 100000000;  

    converetedWalletBalance = walletBalance * priceInt;
    setWallet(converetedWalletBalance.toFixed(2)); 
  }

  getPriceConsumer(); 

  return (
    <div className="balance-main-container">

      <div className="balance-container">
        <p className="balance-text">Your wallet balance</p>
        <h1 className="balance-subtext"> $ { wallet } </h1>
        <img src="./audio-waves.png" alt="Audio waves"/>
      </div>
      
      <a className="button" href="https://sepoliafaucet.com/" target="_balance">Top Up Balance + </a>
    </div>
  );
};

export default BalanceComponent;

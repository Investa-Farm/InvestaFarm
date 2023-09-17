import './ConnectWalletModal.css'; 
import { useEffect, useState } from 'react';
import renderConnectors from './RenderConnectors';
import { connectWallet } from '../../ConnectWallet/ConnectWallet';
import PopupModal from '../PopupModal/PopupModal';


// eslint-disable-next-line react/prop-types
const ConnectWalletModal = ({ closeModal, modalIsOpen, setWalletConnected, setAccount, setErrorMessage, errorMessage, setError, error }) => {
  const [ethereumPresent, setEthereumPresent] = useState(false); 

  const handleMetamaskSignUp = async () => {
    const account = await connectWallet(); 
    
    if(account == undefined){
      setWalletConnected(false); 
      setError(true); 
      setErrorMessage("Account is NOT verified!")
      return; 
    } else {
      setAccount(account)

      setWalletConnected(true)

      setTimeout(() => {
        closeModal()
      }, 3000)
    }

  }

  const checkIfWalletInstalled = () => {
    const ethereum = window.ethereum; 

    if (ethereum !== undefined){
      setEthereumPresent(true)
    }
  }

  useEffect(() => {
    checkIfWalletInstalled(); 
  }, []) 

  return modalIsOpen && (
    <div className="loading-modal">
      { 
         error && (
          <PopupModal 
            message={errorMessage}
          />
         )
      }
      { !error && ( 
        <div className="modal-container">
        
          <div className='modal-button'>
            <div onClick={closeModal}>X</div>
          </div>

          <div className='modal-connectors'>
            <p>Choose your preferred wallet provider</p>
            { 
              ethereumPresent && (
                renderConnectors(handleMetamaskSignUp)
              )
            }
            {
              !ethereumPresent && (
                <>
                  <a className='wallet-button' href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target='_blank'>Metamask</a>
                  <a className='wallet-button' href='https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad' target='_blank'>Coinbase</a>
                  <a className='wallet-button' href='https://explorer.walletconnect.com/' target='_blank'>WalletConnect</a>
                </>
              )
            }
          </div>
        </div>
        )
      }
    </div>
  );
};


export default ConnectWalletModal;
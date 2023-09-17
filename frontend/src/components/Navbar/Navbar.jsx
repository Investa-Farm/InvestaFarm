import React, { useEffect, useState } from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file called Navbar.css for styling

const Navbar = ({ ConnectWallet, walletConnected, setWalletConnected, setAddress, address }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleWalletConnect = async () => {
    console.log("Connecting wallet....");
    const account = await ConnectWallet();
    console.log("Connected account is: ", account);
    setWalletConnected(true);
    setAddress(account);
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', function () {
      window.location.reload();
    })
  }, [])

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  }

  return (
    <nav>
      <div className="navbar-list">

        <div className="navbar-logo">
          <img className="navbar-logo" src="./networking.png" alt="Logo" />
          <h1>Investa Farm</h1>
        </div>

        <div className={`navbar-items ${isDropdownOpen ? 'show-dropdown' : ''}`}>
          <li className="navbar-item">
            <a className="navbar-link" href="/home">Home</a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="/partners">Partners</a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="/about">About</a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="/marketplace">Marketplace</a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="/team">Team</a>
          </li>
          <li className="navbar-item">
            {
              !walletConnected ? (
                <button className="connect-wallet-button" onClick={handleWalletConnect}>Connect Wallet</button>
              ) : (
                <button className="connect-wallet-button">{address.slice(0, 6)}...{address.slice(38, 42)}</button>
              )
            }
          </li>
        </div>

        <div className={`dropdown-menu-icon ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
          <div className={`bar bar1 ${isDropdownOpen ? 'rotate1' : ''}`}></div>
          <div className={`bar bar2 ${isDropdownOpen ? 'hide' : ''}`}></div>
          <div className={`bar bar3 ${isDropdownOpen ? 'rotate2' : ''}`}></div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

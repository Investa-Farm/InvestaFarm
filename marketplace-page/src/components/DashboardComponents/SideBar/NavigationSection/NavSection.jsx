import React from 'react'
import './NavSection.css'

const NavSection = ({ setInvestorDashboard, investorDashboard }) => {

  return (
    <div className='navsection-container'>
        {/* <header>
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Dashboard</h1>
        </header> */}

        <content>
            <menu className='first-menu'>
                <a 
                  onClick={ () => setInvestorDashboard(current => !current)}
                  style={{ backgroundColor: investorDashboard ? "#b3e88a" : "" }}
                >
                    <img src="/dashboard.png" alt="dashboard"/>
                    Dashboard
                </a>
                <a  
                  onClick={ () => setInvestorDashboard(current => !current)}
                  style={{ backgroundColor: !investorDashboard ? "#b3e88a" : "" }}
                >
                    <img src="/market.png" alt="dashboard"/>
                    Market Place
                </a>
                {/* <a href="#">
                    <img src="/t.png" alt="dashboard"/>
                    Active Bids
                </a> */}

                {/* <a href="#">History</a>
                <a href="#">Favorites</a> */}
            </menu>

            <menu className='profile-menu'>
                <p>MY PROFILE</p>
                <a href="#">
                    <img src="/profile.png" alt="dashboard"/>
                    My Portfolio
                </a>
                <a href="#">
                    <img src="/file.png" alt="dashboard"/>
                    History
                </a>
                <a href="#">
                    <img src="/heart.png" alt="dashboard"/>
                    Favorites
                </a>
                <a className='show-more'>
                    <img src="/down-arrow.png" alt="dashboard"/>
                    SHOW MORE
                </a>
            </menu>

            {/* <div className='content-area'>
                <card>
                    <p>Active Bids</p>
                    <value>$100,000</value>
                </card>

                <card>
                    <p>My Portfolio</p>
                    <value>$50,000</value>
                </card>
            </div> */}

        </content>
    </div>
    );

}

export default NavSection
import React from 'react';
import './MainBarInvestorDaos.css';
import daos from '../dao.json';

const MainBarInestorDaos = () => {
    return (
        {
            daos.map((dao, index) => (
                <div className='marketplace-dao' key={index}>
                    <div className='marketplacedao-div1'>
                        <div className='marketplacedao-image'>
                            <img src={dao.image} alt={dao.name} />
                            <div className='hover-details'>Check full details</div>
                        </div>
                        <div className='marketplacedao-details'>
                            <div className='marketplacedao-texts'>
                                <p>{dao.name}</p>
                                <p>{dao.summary}</p>
                            </div>
                            <div className='marketplacedao-icon'>
                                <img src={dao.image} alt={dao.name} />
                            </div>
                        </div>
                    </div>

                    <div className='marketplacedao-div2'>
                        <div className='marketplace-funds'>
                            <p>Current Fund</p>
                            <p>$ {dao.totalfunds.toFixed(2)}</p>
                        </div>
                        <div className='marketplace-approval'>
                            {dao.approved ? <p className='marketplace-approved'>Approved</p> : <p className='marketplace-not-approved'>Not approved</p>}
                        </div>
                    </div>
                </div>
            ))
        }
    );
};

export default MainBarInestorDaos;
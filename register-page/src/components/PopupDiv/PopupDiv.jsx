import React from 'react'
import './PopupDiv.css'

const PopupDiv = ({ showPopup, error, success}) => {
  return (
        showPopup && (
            <div className='popup-modal'>
                <div className='popup-container'>
                  { 
                    !error && (
                        <div className='success'>
                          <p>Success<br/>You can now <button href='https://investafarm-marketplace-eth.vercel.app/'>Login</button> </p>
                        </div>
                    ) 
                  }
                  { 
                    error && (
                        <div className='error'>
                          Sorry an error occured! Please try again
                        </div>
                    ) 
                  }
                </div>
         </div>
        )
  )
}

export default PopupDiv
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
                          <p>Success<br/> <br/> You can now <a href='https://investafarm-marketplace-eth.vercel.app/'>Login</a> </p>
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
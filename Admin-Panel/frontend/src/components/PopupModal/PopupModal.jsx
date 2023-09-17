import React from 'react'
import './PopupModal.css'

const PopupModal = ({ message }) => {
  return (
    <div className="loading-modal">
      <div className="modal-container-error">

        <div className='modal-message'>
          <p>{ message }</p>
        </div>

      </div>
    </div>
  )
}

export default PopupModal
import React from 'react'
import '../HowRegistrationWorks/HowRegistrationWorks.css'

const HowRegistraionWorks = () => {
  return (
    <div className='dao-registration'>

       <h2 className='dao-registration-title'>HOW DAO REGISTRATION WORKS</h2>
       
       <div className='video-section'>
          <video width="50%" height="100%" controls="controls">
            <source src="https://www.loom.com/share/077a7413271d41fb90dbcee884d82c19?sid=29631288-8e26-4303-bb27-e569daa4792f" type="video/mp4" />
          </video>
       </div>

       <div class="circle-container">
            <div class="circle circle1">Make sure you create your DAO</div>
            <hr/>
            {/* <div class="line line1"></div> */}
            <div class="circle circle2">Connect your wallet</div>
            <div class="line line2"></div>
            <div class="circle circle3">Register your DAO after connecting the wallet</div>
            <div class="line line3"></div>
            <div class="circle circle4">Fill in your DAO details, including farm reports</div>
            <div class="line line4"></div>
            <div class="circle circle5">Await for approval and investment</div>
        </div>

    </div>


  )
}

export default HowRegistraionWorks
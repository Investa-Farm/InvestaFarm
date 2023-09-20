import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import partciles from 'particles.js'; // WORK ON THIS IMPORTS
import DaoDashboard from './components/DaoDashboard/DaoDashboard'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import DaoMarketplace from './components/DaoMarketplace/DaoMarketplace'
import Login from './src/components/LoginMini/loginmodule'
import { 
  BrowserRouter as Router,  
  Route,
  Routes,
  // Redirect
 } from 'react-router-dom';


function App() {
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  const [address, setAddress] = useState(); 
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/dao-dashboard' element={
            <DaoDashboard 
              registeredDAOs={registeredDAOs}
              setRegisteredDAOs={setRegisteredDAOs}
              address={address}
              setAddress={setAddress}
            /> 
          }/>
          <Route path="/dao-marketplace" element={
            <DaoMarketplace  
              registeredDAOs={registeredDAOs}
              setRegisteredDAOs={setRegisteredDAOs}
            />
          }/>
          <Routes>
            <Login/>
          </Routes>
        </Routes>
      </Router> 
    </div>
  )
}

export default App

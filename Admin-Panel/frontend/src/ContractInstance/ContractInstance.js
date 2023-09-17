// import { abi as verifyAbi }  from '../contracts/verify.json'; 
import { abi as farmdaoAbi } from '../contracts/FarmDAO.json'; 
// import { verify as verifyContractAddress } from '../contracts/contracts-address.json'; 
import { farmdao as farmDaoContractAddress} from '../contracts/contracts-address.json'; 
import { ethers } from 'ethers';

const contractInstance = async (needSigner = false) => {
    try {
      let verify; 
      let farmDAO; 

      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      const signer = await provider.getSigner(); 

      if (needSigner) {
        // verify = new ethers.Contract(verifyContractAddress, verifyAbi, signer); 
        farmDAO = new ethers.Contract(farmDaoContractAddress, farmdaoAbi, signer); 
      } else {
        // verify = new ethers.Contract(verifyContractAddress, verifyAbi, provider); 
        farmDAO = new ethers.Contract(farmDaoContractAddress, farmdaoAbi, provider);
      }
      
      console.log("Veerify contract address: ", verify); 
      return farmDAO
    } catch (error) {
        console.error(error)
    }
}

export default contractInstance; 


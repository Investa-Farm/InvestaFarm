import { 
  farmDaoAbi, 
  farmdaoContractAddress, 
  priceConsumerAbi, 
  priceConsumerV3Address } from "./constants";
import { ethers } from "ethers";

const getProviderOrSigner = async (needSigner = false) => {
  try {

    let farmDaoContract; 
    let priceConsumer; 
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const priceConsumerProvider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia")

    const signer = await provider.getSigner(); 

    if (needSigner) {
      farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, signer); 
    } else {
      farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, provider); 
      priceConsumer = new ethers.Contract(priceConsumerV3Address, priceConsumerAbi, priceConsumerProvider); 
    }

    return { farmDaoContract , priceConsumer }
  } catch (error) {
    console.error(error)
  }
}

export default getProviderOrSigner; 

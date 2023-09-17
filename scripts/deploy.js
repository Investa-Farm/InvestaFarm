const { ethers } = require("hardhat");
const hre = require("hardhat"); 

const main = async () => {
  // Get deployer address and log it 
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contract with the account: ", deployer.address);
  
  // Get contract factory and deploy the contract
  const contractFactory = await ethers.getContractFactory("FarmDAO"); 
  const farmDAO = await contractFactory.deploy("Farm DAO"); 
  await farmDAO.deployed(); 

  console.log("Farm DAO contract address: ", farmDAO.address); 

  // Save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(farmDAO); 

}

const saveFrontendFiles = (farmDAO) => {
  const fs = require("fs"); 
  const contractsDir = __dirname + "/../frontend/src/contracts"; 

  if(!fs.existsSync(contractsDir)){
    fs.mkdirSync(contractsDir)
  }

  fs.writeFileSync(
    contractsDir + '/contracts-address.json', 
    JSON.stringify({ farmDAO: farmDAO.address }, undefined, 2)
  ); 

  const FarmDAOArtifact = hre.artifacts.readArtifactSync("FarmDAO"); 

  fs.writeFileSync(
    contractsDir + '/farmDAO.json', 
    JSON.stringify(FarmDAOArtifact, null, 2)
  ); 

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
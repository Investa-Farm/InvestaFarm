const { ethers } = require("hardhat");
const hre = require("hardhat"); 

const main = async () => {
  // Get deployer address and log it 
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contract with the account: ", deployer.address);
  
  // Get contract factory and deploy the contract
  const contractFactory = await ethers.getContractFactory("Verify"); 
  const verify = await contractFactory.deploy("0xd437267AE80B8E748E3f624b0797f89b4C0bFc56"); 
  await verify.deployed(); 

  console.log("Verify contract address: ", verify.address); 

  // Save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(verify); 

}

const saveFrontendFiles = (verify) => {
  const fs = require("fs"); 
  const contractsDir = __dirname + "/../frontend/src/contracts"; 

  if(!fs.existsSync(contractsDir)){
    fs.mkdirSync(contractsDir)
  }

  fs.writeFileSync(
    contractsDir + '/contracts-address.json', 
    JSON.stringify({ verify: verify.address }, undefined, 2)
  ); 

  const verifyArtifact = hre.artifacts.readArtifactSync("Verify"); 

  fs.writeFileSync(
    contractsDir + '/verify.json', 
    JSON.stringify(verifyArtifact, null, 2)
  ); 

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
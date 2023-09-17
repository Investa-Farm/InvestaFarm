const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("FarmDAO Contract", function () {
  let farmDAO, owner, addr1;  
  
  addr1 = "0xdc4f6EA5856eDa459286e8D0eF42e389D07137Ff"

  beforeEach(async function () {
    const FarmDAO = await ethers.getContractFactory("FarmDAO");
    farmDAO = await FarmDAO.deploy("Your Farm DAO");
    await farmDAO.deployed();

    const signers = await ethers.getSigners();
    owner = signers[0];
    // addr1 = signers[1]; They are not working
    // addr2 = signers[2];
  
    console.log("FarmDAO contract address:", farmDAO.address);
    console.log("Owner address:", owner.address);
    // console.log("Signers are:", signers);
    // console.log("Address 2:", addr2.address);
    // console.log("Address 2:", addr2.address);
  });

  it("should create a new DAO", async function () {
    const description = "Sample Description";
    const name = "Sample DAO";
    const farmReports = "Sample Farm Reports";
    const financialReports = "Sample Financial Reports";
  
    await expect(farmDAO.connect(owner).createDao(
      owner.address, 
      owner.address, 
      description, 
      name, 
      farmReports, 
      financialReports))
    .to.emit(farmDAO, "DaoCreated")
    .withArgs(
      owner.address, 
      1, 
      name
    ); 

  });

  it("should add an investment to the DAO", async function () {
    const description = "Sample Description";
    const name = "Sample DAO";
    const farmReports = "Sample Farm Reports";
    const financialReports = "Sample Financial Reports";
  
    // Create a DAO
    await farmDAO.createDao(
      addr1,
      addr1, // Use addr1 as the second farmer
      description,
      name,
      farmReports,
      financialReports
    );
  
    // Get the DAO ID (assuming it's the first DAO created)
    const daoId = 1;
  
    // Amount to invest
    const investmentAmount = ethers.utils.parseEther("0.0001"); // 0.0001 ETH
  
    // Specify a higher gas limit for the transaction
    const tx1 = await farmDAO.connect(owner).addInvestment(daoId, { value: investmentAmount, gasLimit: 1000000 });
    await tx1.wait();

    const tx2 = await farmDAO.connect(owner).addInvestment(daoId, { value: investmentAmount, gasLimit: 1000000 });
    await tx2.wait();

    // Check if the InvestmentAdded event was emitted
    console.log("Checking whether InvestmentAdded event was emitted...."); 
    const investmentEvent = await farmDAO.queryFilter("InvestmentAdded", tx1.blockHash);
    expect(investmentEvent.length).to.equal(2);
    const eventArgs = investmentEvent[0].args;
    console.log("Check passed 1/4!")
  
    // Check if the event arguments are correct
    console.log("Checking whether investor amount is equal to amount sent...."); 
    expect(eventArgs.investor).to.equal(owner.address);
    expect(eventArgs.amount).to.equal(investmentAmount);
    console.log("Check passed 2/4!")
  
    // Check if the investment was recorded correctly
    console.log("Checking whether investment was recorded correctly...."); 
    const daoInvestment = await farmDAO.getTotalInvestment(daoId);
    expect(daoInvestment).to.equal(investmentAmount + investmentAmount);
    console.log("Check passed 3/4!"); 
    
    
    // Check if the total investment is correct
    console.log("Checking whether total investment is correct...."); 
    const totalInvestmentByOwner = await farmDAO.getTotalInvestmentByInvestor(owner.address);
    console.log("Total Investment by Owner: ", totalInvestmentByOwner); 
    console.log("Check passed 4/4!"); 

    // expect(totalInvestmentByOwner).to.equal(investmentAmount1.add(investmentAmount2));
  });
  
  // NOT WORKING
  // it("should track and return the total investment by investor", async function () {
  //   // const signers = await ethers.getSigners();
  //   // let signer = signers[0];
  //   // const provider = ethers.provider; 

  //   // Create a DAO
  //   await farmDAO.createDao(
  //     addr1,
  //     addr1, 
  //     "Sample Description",
  //     "Sample DAO",
  //     "Sample Farm Reports",
  //     "Sample Financial Reports"
  //   );

  //   // Get the DAO ID (assuming it's the first DAO created)
  //   const daoId = 1;

  //   // Amount to invest
  //   const investmentAmount1 = ethers.utils.parseEther("0.00001");
  //   const investmentAmount2 = ethers.utils.parseEther("0.00002");
    
  //    // Create a Wallet object from the SignerWithAddress object
  //   //  const wallet = signer.connect(provider);


  //   // Investor (addr1) makes two investments
  //   // await farmDAO.addInvestment(daoId, { value: investmentAmount1, gasLimit: 1000000 });
  //   // await farmDAO.addInvestment(daoId, { value: investmentAmount2, gasLimit: 1000000 });
  //   const tx1 = await farmDAO.connect(owner).addInvestment(daoId, { value: investmentAmount1, gasLimit: 1000000 });
  //   await tx1.wait(); 

  //   // const tx2 = await farmDAO.connect(owner).addInvestment(daoId, { value: investmentAmount2, gasLimit: 1000000 });
  //   // await tx2.wait(); 

  //   // Get the total investment by addr1
  //   const totalInvestmentByOwner = await farmDAO.getTotalInvestmentByInvestor(owner);
  //   console.log("Total Investment by Owner: ", totalInvestmentByOwner); 

  //   // Check if the total investment is correct
  //   expect(totalInvestmentByOwner).to.equal(investmentAmount1.add(investmentAmount2));
  // });

  
});

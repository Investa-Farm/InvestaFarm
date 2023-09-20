// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface FarmersDAO {
    function addInvestment(uint daoId) external payable;
}

contract Marketplace {

    address public farmer;
    uint256 public fundingGoal;
    uint256 public currentFunding;
    uint256 public numInvestors;
    mapping(address => uint256) public investments;

    FarmersDAO public farmersDAO;

    constructor(address _farmersDAO) {
        farmersDAO = FarmersDAO(_farmersDAO);
    }

    function invest(uint256 daoID) public payable {
        require(msg.sender != farmer, "Farmer cannot invest in their own DAO");
        require(msg.value > 0, "Investment must be greater than 0");
        require(currentFunding + msg.value <= fundingGoal, "Investment exceeds funding goal");

        farmersDAO.addInvestment{value: msg.value}(daoID);

        if (investments[msg.sender] == 0) {
            numInvestors++;
        }

        investments[msg.sender] += msg.value;
        currentFunding += msg.value;
    }

    function withdrawFunds() public {
        require(msg.sender == farmer, "Only the farmer can withdraw funds");

        payable(farmer).transfer(currentFunding);
        currentFunding = 0;
    }

    function getInvestmentAmount(address investor) public view returns (uint256) {
        return investments[investor];
    }

    function getInvestorCount() public view returns (uint256) {
        return numInvestors;
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FarmDAO2 {
    
    address public farmer;
    uint256 public fundingGoal;
    uint256 public currentFunding;
    uint256 public numInvestors;
    mapping(address => uint256) public investments;
    IERC20 public token;
    address public oneInch = 0x11111112542D85B3EF69AE05771c2dCCff4fAa26;
    
    constructor(address _farmer, uint256 _fundingGoal, address _token) {
        farmer = _farmer;
        fundingGoal = _fundingGoal;
        token = IERC20(_token);
    }
    
    function invest() public payable {
        require(msg.sender != farmer, "Farmer cannot invest in their own DAO");
        require(msg.value > 0, "Investment must be greater than 0");
        require(currentFunding + msg.value <= fundingGoal, "Investment exceeds funding goal");
        
        if (investments[msg.sender] == 0) {
            numInvestors++;
        }
        
        investments[msg.sender] += msg.value;
        currentFunding += msg.value;
    }
    
    function withdrawFunds() public {
        require(msg.sender == farmer, "Only the farmer can withdraw funds");
        require(currentFunding >= fundingGoal, "Funding goal has not been reached");
        
        // execute the swap on the required decentralized exchange
        (bool success, ) = oneInch.call(abi.encodeWithSignature("swap(address,address,uint256,uint256,uint256,address,address[],bytes)", 
            token,     // source token
            address(0),    // destination token (ETH)
            currentFunding,   // amount to swap
            0,          // min return amount
            0,          // flags
            address(0),    // referrer
            new address[](0),   // path
            ""          // data
        ));
        
        require(success, "Swap failed");
        
        currentFunding = 0;
    }
    
    function getInvestmentAmount(address investor) public view returns (uint256) {
        return investments[investor];
    }
    
    function getInvestorCount() public view returns (uint256) {
        return numInvestors;
    }
    
    function getFundingGoal() public view returns (uint256) {
        return fundingGoal;
    }
    
    function getCurrentFunding() public view returns (uint256) {
        return currentFunding;
    }
    
    function getTokenAddress() public view returns (address) {
        return address(token);
    }
    
    function getOneInchAddress() public view returns (address) {
        return oneInch;
    }
}

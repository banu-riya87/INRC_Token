// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

pragma solidity ^0.8.0;

contract INRC is ERC20 ,Ownable {
     using SafeMath for uint;
    // USDT token
    IERC20 USDCTokenAddress;
       // !% fee for every PEG token mint and burn

    
    constructor(address _USDCTokenAddress) public ERC20('INRC', 'INRC')
    {
        USDCTokenAddress = IERC20(_USDCTokenAddress);
    
    }
       
    function mintToken(uint256 amount) public {
        // Transfer amount USDC tokens from msg.sender to contract
        USDCTokenAddress.transferFrom(msg.sender, address(this), amount);
       
        uint PEGToken = amount.mul(10);

        // Mint tokens to msg.sender
        _mint(msg.sender,PEGToken);
        
        
    }

    
    function RedeemToken (uint256 amount) public {
       
        // Transfer amount USDC tokens from msg.sender to contract

        //Calculate the Proportional amount of USDC        
        uint tempAmount = (amount.mul(10**18)).div(10);
        
        //Calculate Fee
        uint fee = (tempAmount.div(10**2)).div(2);

        //Deduct fee from USDC 
        uint Originaltoken = (tempAmount.sub(fee)).div(10**18);
        
        // Send USDC amount tokens to msg.sender
        USDCTokenAddress.transfer(msg.sender, Originaltoken);
        
        
        // Burn INRC tokens of msg.sender
        _burn(msg.sender,amount);
    }

    function withdrawBalance(uint256 amount) 
    public 
    onlyOwner 
    {
        uint256 _contractBalance = uint256(address(this).balance);
        require (_contractBalance >= amount);
        address payable owner = payable(msg.sender);
        owner.transfer(amount);
       
    }

}

     
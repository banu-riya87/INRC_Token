// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract INRC is ERC20 ,Ownable {

     using SafeMath for uint;

    // USDT token
    IERC20 USDCTokenAddress;
       // !% fee for every PEG token mint and burn

    
    constructor(address _USDCTokenAddress) public ERC20('INRC', 'INRC')
    {
        USDCTokenAddress = IERC20(_USDCTokenAddress);
    
    }
       
    function mintToken(uint256 USDCAmount) public {
        // Transfer amount USDC tokens from msg.sender to contract
        USDCTokenAddress.transferFrom(msg.sender, address(this), USDCAmount);
       
        uint PEGToken = USDCAmount.mul(10);

        // Mint tokens to msg.sender
        _mint(msg.sender,PEGToken);
        
        
    }

    
    function RedeemToken (uint256 INRCamount) public {
       
        // Transfer amount USDC tokens from msg.sender to contract

        //Calculate the Proportional amount of USDC        
        uint tempAmount = (INRCamount.mul(10**18)).div(10);
        
        //Calculate Fee
        uint fee = (tempAmount.div(10**2)).div(2);

        //Deduct fee from USDC 
        uint USDCtoken = (tempAmount.sub(fee)).div(10**18);
        
        // Send USDC amount tokens to msg.sender
        USDCTokenAddress.transfer(msg.sender, USDCtoken);
        
        
        // Burn INRC tokens of msg.sender
        _burn(msg.sender,INRCamount);
    }

    function withdrawBalance(uint256 withdrawAmount) 
    public 
    onlyOwner 
    {
        //Get the balance of USDC of this contract
        uint256 _contractBalance = USDCTokenAddress.balanceOf(address(this));

        require (_contractBalance >= withdrawAmount);
        
        //Transfer the USDC to msg.sender 
        USDCTokenAddress.transfer(msg.sender, withdrawAmount);
       
    }

}

     

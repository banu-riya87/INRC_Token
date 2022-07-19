// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity ^0.8.0;


contract USDCToken is ERC20  {
    constructor() public ERC20('USDC', 'USDC'){
    _mint(msg.sender,100000000000);
    }
    
    
}

INTRCToken.sol smart contract allows user to mint INRC ERC20 Token by paying USDC ERC20 Token.

mintToken(uint256 USDCamount) - to mint INRC Token based on USDC amount passed, before calling this fucntion give approval for the INRCToken contract address
redeemToke(uint256 INRCamount) - to redeem USDC Token based on INRC amount passed and burn the INRC tokens
withdrawBalance(uint256 withdrawAmount) - Allows owner of INRC token contract to withdraw USDC to the owner address

// Version of Solidity compiler this program was written for
pragma solidity ^0.4.19;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';


// A faucet for ERC20 token MET
contract METFaucet {

	StandardToken public METoken;
	address public METOwner;

	// METFaucet constructor, provide the address of METoken contract and
	// the owner address we will be approved to transferFrom
	function METFaucet(address _METoken, address _METOwner) public {

		// Initialize the METoken from the address provided
		METoken = StandardToken(_METoken);
		METOwner = _METOwner;
	}

	function withdraw(uint withdraw_amount) public {

    	// Limit withdrawal amount to 10 MET
    	require(withdraw_amount <= 1000);

		// Use the transferFrom function of METoken
		METoken.transferFrom(METOwner, msg.sender, withdraw_amount);
    }

	// REJECT any incoming ether
	function () external payable { revert(); }

}

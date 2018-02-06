pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract METoken is StandardToken {
	string public name = 'Mastering Ethereum Token';
	string public symbol = 'MET';
	uint8 public decimals = 2;
	uint public INITIAL_SUPPLY = 21000000;

	function METoken() public {
		totalSupply_ = INITIAL_SUPPLY;
		balances[msg.sender] = INITIAL_SUPPLY;
	}
}

pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract METoken is StandardToken {
	string public name = 'Mastering Ethereum Token';
	string public symbol = 'MET';
	uint8 public decimals = 2;
	uint _initial_supply = 2100000000;

	function METoken() public {
		totalSupply_ = _initial_supply;
		balances[msg.sender] = _initial_supply;
	}
}

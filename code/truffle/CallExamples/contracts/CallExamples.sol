pragma solidity ^0.4.22;

contract calledContract {
	event callEvent(address sender, address origin, address from);
	function calledFunction() public {
		emit callEvent(msg.sender, tx.origin, this);
	}
}

library calledLibrary {
	event callEvent(address sender, address origin,  address from);
	function calledFunction() public {
		emit callEvent(msg.sender, tx.origin, this);
	}
}

contract caller {

	function make_calls(calledContract _calledContract) public {

		// Calling the calledContract and calledLibrary directly
		_calledContract.calledFunction();
		calledLibrary.calledFunction();

		// Low level calls using the address object for calledContract
		require(address(_calledContract).call(bytes4(keccak256("calledFunction()"))));
		require(address(_calledContract).delegatecall(bytes4(keccak256("calledFunction()"))));



	}
}

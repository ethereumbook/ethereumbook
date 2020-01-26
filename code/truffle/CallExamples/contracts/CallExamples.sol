pragma solidity ^0.4.22;

library CalledLibrary {
    event CallEvent(address sender, address origin,  address from);
    
    function calledFunction() public {
        emit CallEvent(msg.sender, tx.origin, this);
    }
}


contract CalledContract {
    event CallEvent(address sender, address origin, address from);
    
    function calledFunction() public {
        emit CallEvent(msg.sender, tx.origin, this);
    }
}


contract Caller {
    function make_calls(CalledContract _calledContract) public {
        // Calling calledContract and calledLibrary directly
        _calledContract.calledFunction();

        CalledLibrary.calledFunction();

        // Low-level calls using the address object for calledContract
        require(
            address(_calledContract).call(bytes4(keccak256("calledFunction()")))
        );

        require(
            address(_calledContract).delegatecall(bytes4(keccak256("calledFunction()")))
        );
    }
}

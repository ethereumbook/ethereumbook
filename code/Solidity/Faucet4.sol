// Version of Solidity compiler this program was written for
pragma solidity 0.6.2;

// Our first contract is a faucet!
contract Faucet {
    address owner;

    // Contract constructor: set owner
    constructor() public {
        owner = msg.sender;
    }

    // Access control modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // Accept any incoming amount
    receive() external payable {}

    // Contract destructor
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    // Give out ether to anyone who asks
    function withdraw(uint withdraw_amount) public {
        // Limit withdrawal amount
        require(withdraw_amount <= 0.1 ether);

        // Send the amount to the address that requested it
        msg.sender.transfer(withdraw_amount);
    }
}

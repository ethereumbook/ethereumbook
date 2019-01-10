// Version of Solidity compiler this program was written for
pragma solidity ^0.4.24;

// Our first contract is a faucet!
contract Faucet {
    address owner;

    // Contract constructor: set owner
    constructor() {
        owner = msg.sender;
    }

    // Contract destructor
    function destroy() public {
        require(msg.sender == owner, "Only the contract owner can call this function");
        selfdestruct(owner);
    }

    // Give out ether to anyone who asks
    function withdraw(uint withdraw_amount) public {
        // Limit withdrawal amount
        require(withdraw_amount <= 0.1 ether, "Withdrawal amount too high");
        // Send the amount to the address that requested it
        msg.sender.transfer(withdraw_amount);
    }

    // Accept any incoming amount
    function () public payable {}
}

// Tell the compiler what minimum version of Solidity is required
pragma solidity ^0.4.19;

// Our first contract is a faucet!
contract Faucet {

    // Set a maximum withdrawal amount
    uint _faucet_withdraw_max_amount = 100 finney;

    // Initialization function
    function Faucet() public payable {}

    // Get our total balance
    function getBalance() public view returns (uint) {
      return this.balance;
    }

    // Give out ether to anyone who asks
    function withdraw(uint withdraw_amount) public {

      // Limit withdrawals to a max of _faucet_withdraw_max_amount
      require(withdraw_amount <= _faucet_withdraw_max_amount);

      // Make sure we have enough to do the transfer
      require(this.balance >= _faucet_withdraw_max_amount);

      // Send the amount to the address that requested it
      msg.sender.transfer(withdraw_amount);
    }

    // Default function - just accept any amount sent
    function() public payable {}
}

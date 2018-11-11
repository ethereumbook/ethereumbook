pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

contract METoken is ERC20, ERC20Detailed {
    uint256 public constant INITIAL_SUPPLY = 2100000000;

    constructor() public ERC20Detailed("Mastering Ethereum Token", "MET", 2) {
        _mint(msg.sender, INITIAL_SUPPLY);
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}
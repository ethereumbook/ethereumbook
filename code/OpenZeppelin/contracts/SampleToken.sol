pragma solidity 0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract SampleToken is MintableToken {
  string public name = "SAMPLE TOKEN";
  string public symbol = "SAM";
  uint8 public decimals = 18;
}

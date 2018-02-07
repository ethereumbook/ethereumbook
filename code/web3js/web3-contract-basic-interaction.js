var Web3 = require('web3');
var fs = require('fs')

// Load a file from which to load your Infura token
var infura_token = fs.readFileSync('/path/to/your/infura-token', 'utf8');
// Show your Infura token
console.log(infura_token);

// Prepare your Infura host url
var infura_host = "https://kovan.infura.io/" + infura_token
// Show your Infura host url for you web3 connection
console.log(infura_host);

// Instantiate web3 provider
var web3 = new Web3(infura_host);

// Show the web3 version
web3.version

// Let's do some basic interactions at web3 level
// Let's see the Protocol Version
web3.eth.getProtocolVersion().then(console.log);
// Now I'm curious about the current gas price
web3.eth.getGasPrice().then(console.log);
// And, Whats the last mined block in my chain?
web3.eth.getBlockNumber().then(console.log);

// Now let's dive into some basics actions with a contract
// We will use the contract at;
// https://kovan.etherscan.io/address/0xd0a1e359811322d97991e03f863a0c30c2cf029c#code

// First things first, let's initialize our contract address
var our_contract_address = "0xd0A1E359811322d97991E03f863a0C30C2cF029C";

// Let's see its balance
web3.eth.getBalance(our_contract_address).then(console.log);
// Now let's see its byte code
web3.eth.getCode(our_contract_address).then(console.log);

// Let's initialize our external programmatic description of contract's interface or abi
var our_contract_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]

// Let's take our contract JavaScript object representation
var our_contract = new web3.eth.Contract(our_contract_abi, our_contract_address);

// Let's see our contract address
our_contract._address
// or in this way
our_contract.options.address
// Now our contract abi
our_contract.options.jsonInterface

// This is turning more interesting, let's see what's going with our contract methods

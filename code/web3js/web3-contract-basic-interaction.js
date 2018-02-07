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

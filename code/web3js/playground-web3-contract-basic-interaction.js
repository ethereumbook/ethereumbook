#!/usr/bin/env node

/**
 * @author Francisco Javier Rojas García <fjrojasgarcia@gmail.com>
 */

// Take a closer look at the web3 1.0 documentation for calling methods (it's very different from the 0.2x API).
// https://stackoverflow.com/questions/48547268/smart-contract-method-is-not-a-function-in-web3

console.log('Mastering Ethereum - web3.js basic interactions')
console.log('Author: Francisco Javier Rojas García - fjrojasgarcia@gmail.com')

const optionDefinitions = [
  { name: 'localRPC', alias: 'l', type: Boolean },
  { name: 'infuraFileToken', type: String, defaultOption: true }
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

var Web3 = require('web3');
var fs = require('fs')

if (options.infuraFileToken && !options.localRPC) {
  console.log(options.infuraFileToken);

  // Loading an Infura Token from a file
  var infura_token = fs.readFileSync(options.infuraFileToken, 'utf8');

  // Show your Infura token
  console.log(infura_token);

  // Prepare your Infura host url
  var infura_host = "https://kovan.infura.io/" + infura_token

} else {
  console.log('Not argument found for infura token');

  // Prepare your Infura host url
  var infura_host = "https://kovan.infura.io"

}

// Show your Infura host url for your web3 connection
console.log(infura_host);

var our_contract_address = "0xd0A1E359811322d97991E03f863a0C30C2cF029C";
var etherescan_url = "http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address
console.log(etherescan_url);

var client = require('node-rest-client-promise').Client();

client.getPromise("http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address)
.catch(
  console.log('catch')
).then((client_promise) => {
  // Get the value from the contract to prove it worked.
  // return this.state.simpleStorageInstance.get.call(accounts[0])
  // console.log('Our contract json ABI: --------> \n' + JSON.stringify(result.data));
  console.log('Client promise status: --------> ' + client_promise.data.status);
  console.log('Client promise message: --------> ' + client_promise.data.message);
  console.log('Client promise result: --------> \n' + client_promise.data.result);

  const util = require('util')
  console.log(util.inspect(client_promise, false, null))

});

// client.get("http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address, function (data, response) {
//     console.log('Our contract ABI: --------> \n' + data.result);
//     return data.result;
// }
// );

// process.exit()

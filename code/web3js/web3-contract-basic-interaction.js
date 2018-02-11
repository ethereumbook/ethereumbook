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
  var infura_host = `https://kovan.infura.io/${infura_token}`

} else {
  console.log('Not argument found for infura token');

  // Prepare your Infura host url
  var infura_host = "https://kovan.infura.io"

}

// Show your Infura host url for your web3 connection
console.log(infura_host);

// Instantiate web3 provider
var web3 = new Web3(infura_host);

// Let's do some basic interactions at web3 level
// Let's see the Protocol Version
web3.eth.getProtocolVersion().then(function(protocolVersion) {
      console.log(`Protocol Version: ${protocolVersion}`);
  })

// Now I'm curious about the current gas price
web3.eth.getGasPrice().then(function(gasPrice) {
      console.log(`Gas Price: ${gasPrice}`);
  })

// And, Whats the last mined block in my chain?
web3.eth.getBlockNumber().then(function(blockNumber) {
      console.log(`Block Number: ${blockNumber}`);
  })

// Now let's dive into some basics actions with a contract
// We will use the contract at;
// https://kovan.etherscan.io/address/0xd0a1e359811322d97991e03f863a0c30c2cf029c#code

// First things first, let's initialize our contract address
var our_contract_address = "0xd0A1E359811322d97991E03f863a0C30C2cF029C";

// Let's see its balance
web3.eth.getBalance(our_contract_address).then(function(balance) {
      console.log(`Balance of ${our_contract_address}: ${balance}`);
})

// Now let's see its byte code
web3.eth.getCode(our_contract_address).then(function(code) {
      console.log("Contract code: ----------------------------------------------\n");
      console.log(code);
      console.log("-------------------------------------------------------------\n");
})

// Let's initialize our contract usl in Etherescan for Kovan chain
var etherescan_url = `http://kovan.etherscan.io/api?module=contract&action=getabi&address=${our_contract_address}`
console.log(etherescan_url);

var client = require('node-rest-client-promise').Client();

// Now we are going to deal with the contract from web3.js in a non-block fashion (async mode)
// client.getPromise("http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address)
client.getPromise(etherescan_url)
.then((client_promise) => {
  // Leave this two lines for fure object analisys
  //const util = require('util')
  //console.log(util.inspect(client_promise, false, null))

  // We get here our contract ABI
  our_contract_abi = JSON.parse(client_promise.data.result);

  // And now we create a promise to consume later
  return new Promise((resolve, reject) => {
      var our_contract = new web3.eth.Contract(our_contract_abi, our_contract_address);
      try {
        // If all goes well
        resolve(our_contract);
      } catch (ex) {
        // If something goes wrong
        reject(ex);
      }
    });

})
.then((our_contract) => {
  // Let's see our contract address
  console.log(`Our Contract address:  ${our_contract._address}`);

  // or in this other way
  console.log(`Our Contract address in other way:  ${our_contract.options.address}`);

  // Now our contract abi
  console.log("Our contract abi: " + JSON.stringify(our_contract.options.jsonInterface));

  // This is turning more interesting, let's see what's going with our contract methods
  // Now let's see our contract total supply in a callback fashion
  our_contract.methods.totalSupply().call(function(err, totalSupply) {
      if (!err) {
          console.log(`Total Supply with a callback:  ${totalSupply}`);
      } else {
          console.log(err);
      }
  });

  // Or you can use the returned Promise instead of passing in the callback:
  our_contract.methods.totalSupply().call().then(function(totalSupply){
      console.log(`Total Supply with a promise:  ${totalSupply}`);
  }).catch(function(err) {
      console.log(err);
  });

})

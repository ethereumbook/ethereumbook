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

// Instantiate web3 provider
var web3 = new Web3(infura_host);

var our_contract_address = "0xd0A1E359811322d97991E03f863a0C30C2cF029C";
var etherescan_url = "http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address
console.log(etherescan_url);

var client = require('node-rest-client-promise').Client();

// client.getPromise("http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address)
// .then(client_promise) => clientPromise(client_promise)


// .then(function(client_promise) {
//   // Get the value from the contract to prove it worked.
//   // return this.state.simpleStorageInstance.get.call(accounts[0])
//   // console.log('Our contract json ABI: --------> \n' + JSON.stringify(result.data));
//   console.log('Client promise status: --------> ' + client_promise.data.status);
//   console.log('Client promise message: --------> ' + client_promise.data.message);
//   console.log('Client promise result: --------> \n' + client_promise.data.result);
//   return client_promise.data.result;
//   //const util = require('util')
//   //console.log(util.inspect(client_promise, false, null))
//   })

  // .then(our_contract_abi) => {
  //      // console.log('ABI json (our_contract_abi): --------> \n' + our_contract_abi);
  //    };



client.getPromise("http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address)
.then((client_promise) => {
  // Get the value from the contract to prove it worked.
  // return this.state.simpleStorageInstance.get.call(accounts[0])
  // console.log('Our contract json ABI: --------> \n' + JSON.stringify(result.data));

  // console.log('Client promise status: --------> ' + client_promise.data.status);
  // console.log('Client promise message: --------> ' + client_promise.data.message);

  our_contract_abi = JSON.parse(client_promise.data.result);
  // console.log('our_contract_abi: --------> \n' + our_contract_abi);
  // console.log(typeof our_contract_abi);



  // // or in this way
  // console.log("Our Contract address in other way: " + our_contract.options.address);
  //
  // // Now our contract abi
  // console.log("Our contract abi: " + JSON.stringify(our_contract.options.jsonInterface));
  //
  // // This is turning more interesting, let's see what's going with our contract methods
  // our_contract.methods.totalSupply().call(function(err, totalSupply) {
  //     if (!err) {
  //         console.log("Total Supply with a callback: " + totalSupply);
  //     } else {
  //         console.log(err);
  //     }
  // });
  //
  // // Or you can use the returned Promise instead of passing in the callback:
  // our_contract.methods.totalSupply().call().then(function(totalSupply){
  //     console.log("Total Supply with a promise: " + totalSupply);
  // }).catch(function(err) {
  //     console.log(err);
  // });

  return new Promise((resolve, reject) => {
      var our_contract = new web3.eth.Contract(our_contract_abi, our_contract_address);
      try {
        resolve(our_contract);
      } catch (ex) {
        reject(ex);
      }
    });

  //const util = require('util')
  //console.log(util.inspect(client_promise, false, null))
})
.then((our_contract) => {
  // or in this way
  console.log("Our Contract address in other way: " + our_contract.options.address);

  // Now our contract abi
  console.log("Our contract abi: " + JSON.stringify(our_contract.options.jsonInterface));
  console.log("Our Contract address in other way: " + our_contract.options.address);
  })

  // .then(our_contract_abi) => {
  //      // console.log('ABI json (our_contract_abi): --------> \n' + our_contract_abi);
  //    };

// client.get("http://kovan.etherscan.io/api?module=contract&action=getabi&address=" + our_contract_address, function (data, response) {
//     console.log('Our contract ABI: --------> \n' + data.result);
//     return data.result;
// }
// );

// process.exit()
